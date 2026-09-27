# CloudFront distribution serving the SPA from the private S3 bucket.

# AWS-managed policies (referenced by name so we don't hardcode IDs).
data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}
data "aws_cloudfront_response_headers_policy" "security" {
  name = "Managed-SecurityHeadersPolicy"
}

resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "${local.name_prefix}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# SPA fallback: rewrite extension-less paths (/about, /services, …) to /index.html so deep links
# and refreshes load the app; Vue Router then renders the page (or its own 404).
resource "aws_cloudfront_function" "spa_rewrite" {
  name    = "${local.name_prefix}-spa-rewrite"
  runtime = "cloudfront-js-2.0"
  code    = <<-JS
    function handler(event) {
      var req = event.request;
      if (req.uri.indexOf('.') === -1) {
        req.uri = '/index.html';
      }
      return req;
    }
  JS
}

resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"
  comment             = "${local.name_prefix} site"
  aliases             = local.domain_aliases

  origin {
    origin_id                = "s3-frontend"
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
  }

  default_cache_behavior {
    target_origin_id           = "s3-frontend"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cached_methods             = ["GET", "HEAD"]
    cache_policy_id            = data.aws_cloudfront_cache_policy.optimized.id
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.security.id
    compress                   = true

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.spa_rewrite.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    # Default *.cloudfront.net cert until a custom domain is configured; then the validated ACM cert.
    cloudfront_default_certificate = local.domain_enabled ? null : true
    acm_certificate_arn            = one(aws_acm_certificate_validation.cf[*].certificate_arn)
    ssl_support_method             = local.domain_enabled ? "sni-only" : null
    minimum_protocol_version       = local.domain_enabled ? "TLSv1.2_2021" : "TLSv1"
  }
}
