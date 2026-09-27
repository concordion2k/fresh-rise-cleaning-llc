# Remote state config for the main stack. Holds no secrets (just resource names), so it's committed.
# Created by terraform/bootstrap. Used via: terraform init -backend-config=backend.hcl
bucket         = "grasi-freshrise-tfstate"
key            = "infra/terraform.tfstate"
region         = "us-east-1"
dynamodb_table = "grasi-freshrise-tflock"
encrypt        = true
