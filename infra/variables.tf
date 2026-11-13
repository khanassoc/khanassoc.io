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

variable "github_repo" {
  description = "Repository allowed to deploy the site, as owner/name."
  type        = string
  default     = "khanassoc/khanassoc.io"
}

variable "create_github_oidc_provider" {
  description = "The GitHub OIDC provider is one per AWS account. Set false if another stack already created it."
  type        = bool
  default     = true
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
