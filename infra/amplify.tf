# Amplify Hosting: used while CloudFront is blocked for this account (AWS account verification pending).
# Switch back with hosting = "cloudfront". Static files are uploaded as a zip by the deploy workflow; no repo connection.
locals {
  use_amplify    = var.hosting == "amplify"
  use_cloudfront = var.hosting == "cloudfront"
}

resource "aws_amplify_app" "site" {
  count    = local.use_amplify ? 1 : 0
  name     = "khanassoc-site"
  platform = "WEB"

  # Same headers as the CloudFront response headers policy.
  custom_headers = jsonencode({ customHeaders = [{
    pattern = "**"
    headers = [
      { key = "Strict-Transport-Security", value = "max-age=63072000; includeSubDomains" },
      { key = "X-Content-Type-Options", value = "nosniff" },
      { key = "X-Frame-Options", value = "DENY" },
      { key = "Referrer-Policy", value = "strict-origin-when-cross-origin" },
      { key = "Content-Security-Policy", value = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
      { key = "Permissions-Policy", value = "camera=(), microphone=(), geolocation=()" },
    ]
  }] })

  # Rules run in order: www to the apex, then the 404 page for anything missing.
  custom_rule {
    source = "https://www.${var.domain}"
    target = "https://${var.domain}"
    status = "301"
  }
  custom_rule {
    source = "/<*>"
    target = "/404.html"
    status = "404-200"
  }

  # Amplify takes the headers as YAML (JSON is valid YAML) but stores a normalized form, which would
  # show as a change on every plan. To change a header, remove this, apply, then put it back.
  lifecycle {
    ignore_changes = [custom_headers]
  }
}

resource "aws_amplify_branch" "main" {
  count       = local.use_amplify ? 1 : 0
  app_id      = aws_amplify_app.site[0].id
  branch_name = "main"
  stage       = "PRODUCTION"
}

# Reuses the ACM certificate already issued for the apex and www.
resource "aws_amplify_domain_association" "site" {
  count                 = local.use_amplify ? 1 : 0
  app_id                = aws_amplify_app.site[0].id
  domain_name           = var.domain
  wait_for_verification = false

  certificate_settings {
    type                   = "CUSTOM"
    custom_certificate_arn = aws_acm_certificate_validation.site.certificate_arn
  }

  sub_domain {
    branch_name = aws_amplify_branch.main[0].branch_name
    prefix      = ""
  }
  sub_domain {
    branch_name = aws_amplify_branch.main[0].branch_name
    prefix      = "www"
  }
}

# Amplify also writes these records itself, a few minutes after the domain association is created; they were
# imported so Terraform owns them. Its dns_record reads "<prefix> CNAME <target>".
locals {
  amplify_target = local.use_amplify ? trimsuffix(trimspace(split("CNAME", tolist(aws_amplify_domain_association.site[0].sub_domain)[0].dns_record)[1]), ".") : ""
}

# The apex cannot be a CNAME; a Route 53 alias to the CloudFront name Amplify manages works instead.
resource "aws_route53_record" "amplify_apex" {
  for_each = local.use_amplify ? toset(["A", "AAAA"]) : toset([])
  zone_id  = aws_route53_zone.site.zone_id
  name     = var.domain
  type     = each.value
  alias {
    name                   = local.amplify_target
    zone_id                = "Z2FDTNDATAQYW2" # CloudFront's fixed hosted zone ID
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "amplify_www" {
  count   = local.use_amplify ? 1 : 0
  zone_id = aws_route53_zone.site.zone_id
  name    = "www.${var.domain}"
  type    = "CNAME"
  ttl     = 500 # what Amplify writes
  records = [local.amplify_target]
}
