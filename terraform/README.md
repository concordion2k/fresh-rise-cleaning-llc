# Infrastructure (Terraform)

All AWS resources for the FreshRise Cleaning site, defined as code.

## What gets created

| Resource                     | Purpose                                                          |
| ---------------------------- | ---------------------------------------------------------------- |
| S3 (`*-site-*`)              | Private bucket holding the built Vue SPA                         |
| CloudFront distribution      | HTTPS, caching, compression, security headers; SPA route rewrite |
| ACM cert + Route 53 records  | Only when `domain_name` is set — apex + `www`                    |

## Working locally

Deploys run through GitHub Actions — see the runbook at [../DEPLOY.md](../DEPLOY.md). This stack
uses **remote state**, so a local `terraform init` must pass the backend config:

```bash
cd terraform
terraform init -backend-config=backend.hcl
terraform plan
```

Non-secret variables are in [prod.auto.tfvars](./prod.auto.tfvars) and load automatically.
There are no secrets in this stack.
