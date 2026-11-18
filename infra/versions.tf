terraform {
  required_version = ">= 1.9"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
  # Local state for the first apply. Move to an S3 backend with locking before a second person or CI runs this.
}

provider "aws" {
  region  = var.region
  profile = var.aws_profile
  default_tags {
    tags = { Project = "khanassoc", Stack = "site", ManagedBy = "terraform" }
  }
}

# CloudFront only accepts ACM certificates and WAF web ACLs from us-east-1.
provider "aws" {
  alias   = "us_east_1"
  region  = "us-east-1"
  profile = var.aws_profile
  default_tags {
    tags = { Project = "khanassoc", Stack = "site", ManagedBy = "terraform" }
  }
}

data "aws_caller_identity" "current" {}
