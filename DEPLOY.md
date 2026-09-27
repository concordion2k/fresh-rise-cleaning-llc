# Deployment

This site deploys via **GitHub Actions** to AWS, using **remote Terraform state** and a
**GitHub OIDC** role (no long-lived AWS keys). Region: **us-east-1**.

```
push to main ──> Deploy (.github/workflows/deploy.yml)
                   verify: lint, format, typecheck, test, build, terraform validate
                   deploy: assume AWS role (OIDC) → terraform apply → sync to S3
                           → invalidate CloudFront (and wait) → prune old assets
pull request ──> CI (.github/workflows/ci.yml): same verify checks
```

## One-time setup

Do these once, in order. Step 1 needs **admin AWS credentials** on your machine
(`aws sso login` or exported keys).

### 1. Bootstrap AWS prerequisites

Creates the state bucket, lock table and the deploy IAM role (reusing the account's existing GitHub
OIDC provider, which the Zumba site already uses).

```bash
cd terraform/bootstrap
terraform init
terraform apply            # review, then approve
terraform output deploy_role_arn
```

> Check `github_repo` in [terraform/bootstrap/variables.tf](terraform/bootstrap/variables.tf)
> matches the GitHub repo (`owner/name`) first — only that repo may assume the role.
> In a brand-new AWS account with no GitHub OIDC provider: `terraform apply -var create_oidc_provider=true`.

### 2. Add the GitHub secret and environment

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Name                  | Value                                    |
| --------------------- | ---------------------------------------- |
| `AWS_DEPLOY_ROLE_ARN` | the `deploy_role_arn` output from step 1 |

The deploy job runs in a GitHub environment named `production` (created automatically on first
run; add protection rules there if you want manual approval).

### 3. Deploy

Push to `main` (or run **Actions → Deploy → Run workflow**). The first run takes ~5–15 min while
CloudFront provisions. The URL is printed in the job summary, or from `terraform/`:

```bash
terraform init -backend-config=backend.hcl && terraform output -raw site_url
```

## How a deploy keeps the site fresh

1. **Hashed assets** (`assets/*.js|css|png`) are uploaded with a one-year immutable cache — their
   filenames change whenever their content does.
2. **Everything else** (`index.html`, favicon, `robots.txt`) is uploaded `no-cache`, so browsers
   always revalidate it.
3. A **CloudFront invalidation** of `/*` drops the edge copies; the job waits for it to complete,
   so a green deploy means the new version is live.
4. Assets from older builds are pruned last, after visitors have been switched to the new version.

**Rollback:** revert the commit and push — the pipeline redeploys the previous version.

## Adding a custom domain

1. Register the domain (or move DNS) into a **Route 53 hosted zone in this account**.
2. Set `hosted_zone_id` in [terraform/bootstrap/variables.tf](terraform/bootstrap/variables.tf) and
   re-run `terraform apply` in `terraform/bootstrap` (lets the deploy role write DNS records).
3. Set `domain_name` in [terraform/prod.auto.tfvars](terraform/prod.auto.tfvars) and push.

Terraform then issues an ACM certificate, validates it via DNS, attaches it to CloudFront for the
apex and `www`, and creates the alias records ([terraform/domain.tf](terraform/domain.tf)).

## Configuration reference

| What                       | Where                                                                            |
| -------------------------- | -------------------------------------------------------------------------------- |
| Region, env, custom domain | [terraform/prod.auto.tfvars](terraform/prod.auto.tfvars) (committed, non-secret) |
| Remote state location      | [terraform/backend.hcl](terraform/backend.hcl)                                   |
| Deploy role / state / OIDC | [terraform/bootstrap/](terraform/bootstrap/)                                     |

## Notes

- **Cost:** pennies a month at small-business traffic (S3 storage + CloudFront requests; the first
  1,000 invalidation paths a month are free, and `/*` counts as one).
- The deploy role is **least-privilege**: S3 access only to this app's buckets and the state
  backend, CloudFront (no resource-level IAM exists for it), ACM, and Route 53 limited to
  `hosted_zone_id` once set. It can't touch the Zumba site's resources.
- CloudFront adds AWS's managed **security headers** (HSTS, `X-Content-Type-Options`, etc.).
