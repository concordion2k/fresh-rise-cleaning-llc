data "aws_caller_identity" "current" {}

# --- Remote state storage ---------------------------------------------------

resource "aws_s3_bucket" "state" {
  bucket = var.state_bucket
}

resource "aws_s3_bucket_versioning" "state" {
  bucket = aws_s3_bucket.state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state" {
  bucket = aws_s3_bucket.state.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "state" {
  bucket                  = aws_s3_bucket.state.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_dynamodb_table" "lock" {
  name         = var.lock_table
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}

# --- GitHub Actions OIDC + deploy role --------------------------------------

data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "github" {
  count           = var.create_oidc_provider ? 1 : 0
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github.certificates[0].sha1_fingerprint]
}

# Look up the existing provider if we're not creating one.
data "aws_iam_openid_connect_provider" "github" {
  count = var.create_oidc_provider ? 0 : 1
  url   = "https://token.actions.githubusercontent.com"
}

locals {
  oidc_provider_arn = var.create_oidc_provider ? aws_iam_openid_connect_provider.github[0].arn : data.aws_iam_openid_connect_provider.github[0].arn
}

data "aws_iam_policy_document" "deploy_assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [local.oidc_provider_arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    # Only this repo (any branch/tag) may assume the role.
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repo}:*"]
    }
  }
}

resource "aws_iam_role" "deploy" {
  name               = "${var.project}-gha-deploy"
  assume_role_policy = data.aws_iam_policy_document.deploy_assume.json
  description        = "Assumed by GitHub Actions to deploy the ${var.project} stack."
}

# Least-privilege permissions for the deploy pipeline. This is a static site, so the role only
# needs the state backend, the site bucket, CloudFront, and (for a custom domain) ACM + Route 53.
# Mutating S3 actions are scoped to this app's buckets ("<project>-<app_env>-*"); CloudFront has no
# resource-level IAM, and a few lookups (RequestCertificate, List*) must be "*".
locals {
  acct       = data.aws_caller_identity.current.account_id
  region     = var.aws_region
  app_prefix = "${var.project}-${var.app_env}" # e.g. grasi-freshrise-prod
}

data "aws_iam_policy_document" "deploy_perms" {
  # Remote state + lock (the only resources outside the app prefix the role may touch).
  statement {
    sid = "TerraformState"
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:ListBucket",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
    ]
    resources = [
      aws_s3_bucket.state.arn,
      "${aws_s3_bucket.state.arn}/*",
      aws_dynamodb_table.lock.arn,
    ]
  }

  # Site bucket: full management + content sync, but only our buckets.
  statement {
    sid       = "AppBuckets"
    actions   = ["s3:*"]
    resources = ["arn:aws:s3:::${local.app_prefix}-*", "arn:aws:s3:::${local.app_prefix}-*/*"]
  }

  # CloudFront has essentially no resource-level IAM (global service); limited to the CF namespace.
  # Covers the distribution, OAC, function, policy lookups, and cache invalidations.
  statement {
    sid       = "CloudFront"
    actions   = ["cloudfront:*"]
    resources = ["*"]
  }

  # ACM: RequestCertificate/List must be "*"; everything else scoped to certs in-account.
  statement {
    sid       = "AcmRequest"
    actions   = ["acm:RequestCertificate", "acm:ListCertificates"]
    resources = ["*"]
  }
  statement {
    sid = "AcmManage"
    actions = [
      "acm:DescribeCertificate",
      "acm:GetCertificate",
      "acm:DeleteCertificate",
      "acm:RenewCertificate",
      "acm:AddTagsToCertificate",
      "acm:RemoveTagsFromCertificate",
      "acm:ListTagsForCertificate",
    ]
    resources = ["arn:aws:acm:${local.region}:${local.acct}:certificate/*"]
  }

  # Route 53: record changes limited to our hosted zone (only once one is configured).
  dynamic "statement" {
    for_each = var.hosted_zone_id == "" ? [] : [var.hosted_zone_id]
    content {
      sid = "Route53Zone"
      actions = [
        "route53:ChangeResourceRecordSets",
        "route53:ListResourceRecordSets",
        "route53:GetHostedZone",
        "route53:ListTagsForResource",
      ]
      resources = ["arn:aws:route53:::hostedzone/${statement.value}"]
    }
  }
  statement {
    sid       = "Route53Lookups"
    actions   = ["route53:ListHostedZones", "route53:ListHostedZonesByName", "route53:GetChange"]
    resources = ["*"]
  }

  statement {
    sid       = "StsIdentity"
    actions   = ["sts:GetCallerIdentity"]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "deploy" {
  name   = "${var.project}-gha-deploy"
  role   = aws_iam_role.deploy.id
  policy = data.aws_iam_policy_document.deploy_perms.json
}
