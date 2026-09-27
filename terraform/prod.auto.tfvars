# Non-secret production variables, auto-loaded by Terraform (incl. in CI). Nothing sensitive
# belongs here — this stack has no secrets at all.
aws_region  = "us-east-1"
environment = "prod"

# Custom domain (must have a Route 53 hosted zone in this account). www is added automatically.
# Leave empty to serve on the *.cloudfront.net URL. When you set this, also set hosted_zone_id in
# terraform/bootstrap and re-apply it so the deploy role may write the DNS records.
domain_name = ""
