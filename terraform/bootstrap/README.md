# Bootstrap (one-time)

Creates the prerequisites that must exist **before** the main stack can deploy via CI:

- S3 bucket for remote Terraform state (`grasi-freshrise-tfstate`)
- DynamoDB lock table (`grasi-freshrise-tflock`)
- A **deploy IAM role** that GitHub Actions assumes via the account's GitHub **OIDC provider**

Run this once, manually, with admin AWS credentials:

```bash
cd terraform/bootstrap
terraform init
terraform apply        # review, then yes
terraform output deploy_role_arn
```

…and add the ARN as a GitHub Actions secret named **`AWS_DEPLOY_ROLE_ARN`**.

Notes:

- This stack uses **local state** (`terraform.tfstate` here, git-ignored) — it can't store state in
  the bucket it's creating. Keep that file, or just re-run later (it's idempotent).
- The account's GitHub OIDC provider already exists (the Zumba site uses it), so this stack looks
  it up rather than creating it. In a fresh account, pass `-var create_oidc_provider=true`.
- The deploy role is scoped to `<project>-<app_env>-*` S3 buckets, the state backend, CloudFront,
  ACM, and — once `hosted_zone_id` is set — that one Route 53 zone.
