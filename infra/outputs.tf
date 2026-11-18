output "nameservers" {
  description = "Enter these four in Squarespace: Domains > khanassoc.io > DNS > Domain Nameservers > Use custom nameservers."
  value       = aws_route53_zone.site.name_servers
}

output "zone_id" {
  description = "For the CRM stack's app. and portal. records."
  value       = aws_route53_zone.site.zone_id
}

output "bucket" {
  description = "GitHub repo variable SITE_BUCKET."
  value       = aws_s3_bucket.site.id
}

output "distribution_id" {
  description = "GitHub repo variable SITE_DISTRIBUTION_ID (CloudFront hosting only)."
  value       = one(aws_cloudfront_distribution.site[*].id)
}

output "amplify_app_id" {
  description = "GitHub repo variable AMPLIFY_APP_ID (Amplify hosting only)."
  value       = one(aws_amplify_app.site[*].id)
}

output "amplify_dns" {
  description = "Records Amplify asks for (Route 53 records are added in dns.tf)."
  value       = one(aws_amplify_domain_association.site[*].sub_domain)
}

output "deploy_role_arn" {
  description = "GitHub repo variable AWS_DEPLOY_ROLE_ARN."
  value       = aws_iam_role.site_deploy.arn
}

output "github_oidc_provider_arn" {
  description = "Reuse in the CRM stack with create_github_oidc_provider = false."
  value       = local.github_oidc_arn
}
