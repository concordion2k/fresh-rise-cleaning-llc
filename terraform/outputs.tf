output "site_url" {
  description = "Public URL of the website (custom domain if configured, else CloudFront)."
  value       = local.domain_enabled ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.main.domain_name}"
}

output "cloudfront_url" {
  description = "The distribution's own *.cloudfront.net URL (works even before DNS propagates)."
  value       = "https://${aws_cloudfront_distribution.main.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "Used by CI to create cache invalidations after a frontend deploy."
  value       = aws_cloudfront_distribution.main.id
}

output "frontend_bucket" {
  description = "S3 bucket that CI syncs the built SPA into."
  value       = aws_s3_bucket.frontend.bucket
}
