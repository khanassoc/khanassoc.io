# khanassoc.io

Public marketing site for Khan Associates: a static Next.js export served from a private S3 bucket through CloudFront. The CRM and client portal live in the private `khanassoc/CRM` repo.

## Develop

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # static files in out/
```

Firm details (contact, hours, pricing, intake link) live in `src/lib/firm.ts`.

## Hosting (`infra/`, Terraform)

Route 53 zone, private S3 bucket (SSE-KMS, versioned, CloudFront-only bucket policy, TLS-only), ACM certificate (us-east-1), CloudFront with Origin Access Control, security headers and WAF, and a GitHub OIDC role that can only sync this bucket and invalidate this distribution.

```bash
aws login --profile khanassoc          # browser sign-in, no access keys
cd infra
terraform init
terraform plan -out=tfplan             # review before applying
terraform apply tfplan
terraform output nameservers           # enter these four in Squarespace
```

The certificate validates only after Squarespace points at Route 53, so the first apply waits there. Then set the repository variables `AWS_DEPLOY_ROLE_ARN`, `SITE_BUCKET`, and `SITE_DISTRIBUTION_ID` from `terraform output`. After that, every push to `main` builds and publishes the site.
