variable "region" {
  description = "Primary region (DECISIONS D9)."
  type        = string
  default     = "us-east-2"
}

variable "aws_profile" {
  description = "AWS CLI profile with browser sign-in."
  type        = string
  default     = "khanassoc"
}

variable "domain" {
  description = "Apex domain (DECISIONS D2)."
  type        = string
  default     = "khanassoc.io"
}

variable "github_oidc_subject_prefix" {
  description = "Start of the GitHub OIDC `sub` claim. This repo uses GitHub's immutable subject (owner and repo IDs), so a renamed or re-created repo cannot assume the role. Check with: gh api repos/OWNER/REPO/actions/oidc/customization/sub"
  type        = string
  default     = "repo:khanassoc@331349882/khanassoc.io@1452053521"
}

variable "create_github_oidc_provider" {
  description = "The GitHub OIDC provider is one per AWS account. Set false if another stack already created it."
  type        = bool
  default     = true
}

variable "hosting" {
  description = "Where the site is served from: amplify (while CloudFront is blocked for this account) or cloudfront."
  type        = string
  default     = "amplify"
  validation {
    condition     = contains(["amplify", "cloudfront"], var.hosting)
    error_message = "hosting must be amplify or cloudfront."
  }
}

variable "waf_rate_limit" {
  description = "Requests per 5 minutes per IP before WAF blocks."
  type        = number
  default     = 2000
}

variable "dmarc_record" {
  description = "DMARC TXT value. Empty means no record, matching Squarespace today."
  type        = string
  default     = ""
}
