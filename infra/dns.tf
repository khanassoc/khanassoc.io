# Recreates the live Squarespace records listed in dns-inventory.md, minus the retired Squarespace site records.
resource "aws_route53_zone" "site" {
  name = var.domain
}

locals {
  dkim = "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl6o/er7ZusGmCMPQxchxSWoA27cbT3/VXRK5extp5Qxui/gTbGfzwb9m/mA5+Z/ARGjrfHFMkDPe0UFhGm+3+DD2xN9OdyBlIz4KakD+bw6mi+q3br6u87H6nrzDekDjPrcuqFUWt74WRtVNnKTFqVpxeE61AGM6LGSkjzTThspjqZcWKynLDrqtUbInVGOIGBeVUf8Y1sP6xyDRangGHzn3SLqwECONPMz+e0UMH60GCcn0U6yglBbeJ9UbVr6zVA/1Z1iQ6cMHuVXwJ0SbZcAutim4ZUWsOalHV0HwY2OTCHgjLqtsuYC+5lKhCTfWYK0oY7ekGPNqIM+cDIjM8QIDAQAB"
}

resource "aws_route53_record" "mx" {
  zone_id = aws_route53_zone.site.zone_id
  name    = var.domain
  type    = "MX"
  ttl     = 3600
  records = ["1 smtp.google.com."]
}

resource "aws_route53_record" "spf" {
  zone_id = aws_route53_zone.site.zone_id
  name    = var.domain
  type    = "TXT"
  ttl     = 3600
  records = ["v=spf1 include:_spf.google.com ~all"]
}

# A TXT string is capped at 255 characters; the provider sends `a""b` as two strings in one record.
resource "aws_route53_record" "dkim" {
  zone_id = aws_route53_zone.site.zone_id
  name    = "google._domainkey.${var.domain}"
  type    = "TXT"
  ttl     = 3600
  records = [join("\"\"", regexall(".{1,255}", local.dkim))]
}

resource "aws_route53_record" "dmarc" {
  count   = var.dmarc_record == "" ? 0 : 1
  zone_id = aws_route53_zone.site.zone_id
  name    = "_dmarc.${var.domain}"
  type    = "TXT"
  ttl     = 3600
  records = [var.dmarc_record]
}

resource "aws_route53_record" "site" {
  for_each = {
    for pair in setproduct([var.domain, "www.${var.domain}"], ["A", "AAAA"]) : "${pair[0]}-${pair[1]}" => { name = pair[0], type = pair[1] }
  }
  zone_id = aws_route53_zone.site.zone_id
  name    = each.value.name
  type    = each.value.type
  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
