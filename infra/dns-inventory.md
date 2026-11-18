# DNS inventory: khanassoc.io

Read from live DNS on 2026-11-12 (Squarespace nameservers `nsd1-4.squarespacedns.com`). `dns.tf` recreates the kept records.

| Name | Type | Value | Action |
|---|---|---|---|
| `@` | MX | `1 smtp.google.com.` | Keep (Google Workspace mail) |
| `@` | TXT | `v=spf1 include:_spf.google.com ~all` | Keep |
| `google._domainkey` | TXT | `v=DKIM1; k=rsa; p=MIIBIjANBg…IDAQAB` (2048-bit, two strings) | Keep |
| `_dmarc` | TXT | none exists | Optional: set `dmarc_record`, e.g. `v=DMARC1; p=none; rua=mailto:info@khanassoc.io` |
| `@` | A | `198.49.23.144/145`, `198.185.159.144/145` | Retire: Squarespace site, replaced by CloudFront alias |
| `www` | CNAME | `ext-sq.squarespace.com` | Retire: replaced by CloudFront alias |

Before switching nameservers, check Squarespace's DNS panel once more for records live DNS can't list (for example other subdomains or verification TXT records) and add any you find to `dns.tf`.
