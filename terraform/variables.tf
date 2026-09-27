variable "project" {
  type        = string
  default     = "grasi-freshrise"
  description = "Project name, used as a prefix for resource names."
}

variable "environment" {
  type        = string
  default     = "prod"
  description = "Deployment environment (e.g. dev, prod)."
}

variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region. Keep us-east-1: CloudFront's ACM cert (for a custom domain) must live there."
}

variable "domain_name" {
  type        = string
  default     = ""
  description = <<-EOT
    Custom apex domain (e.g. "freshrisecleaning.com"). Empty = serve on the default *.cloudfront.net
    URL. When set, www.<domain> is included automatically. DNS must be in a Route 53 hosted zone
    in this account.
  EOT
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Extra tags applied to all resources."
}
