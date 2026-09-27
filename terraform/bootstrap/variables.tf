variable "project" {
  type    = string
  default = "grasi-freshrise"
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "state_bucket" {
  type        = string
  default     = "grasi-freshrise-tfstate"
  description = "S3 bucket for the main stack's remote Terraform state. Must be globally unique."
}

variable "lock_table" {
  type    = string
  default = "grasi-freshrise-tflock"
}

variable "github_repo" {
  type        = string
  default     = "concordion2k/grasi-freshrise-llc"
  description = "owner/repo allowed to assume the deploy role via GitHub OIDC."
}

variable "create_oidc_provider" {
  type        = bool
  default     = false
  description = <<-EOT
    Whether to create the account's GitHub Actions OIDC provider. Defaults to false because the
    Zumba by Grasiele stack in the same account already relies on an existing one (there can be
    only one per account). Set true only in a fresh account.
  EOT
}

variable "app_env" {
  type        = string
  default     = "prod"
  description = "Environment the deploy role is scoped to (resources are named <project>-<app_env>-*)."
}

variable "hosted_zone_id" {
  type        = string
  default     = ""
  description = <<-EOT
    Route 53 hosted zone the deploy role may change records in, for the custom domain. Empty = no
    Route 53 write access (fine while the site runs on its *.cloudfront.net URL).
  EOT
}
