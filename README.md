# khanassoc.io

Public marketing site for Khan Associates: a static Next.js export. It is served by AWS Amplify Hosting while CloudFront is blocked for this AWS account (account verification pending); the S3 + CloudFront setup stays in `infra/` behind `hosting = "cloudfront"`. The CRM and client portal live in the private `khanassoc/CRM` repo.

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

The certificate validates only after Squarespace points at Route 53, so the first apply waits there. Then set the repository variables from `terraform output`: `AWS_DEPLOY_ROLE_ARN`, plus `AMPLIFY_APP_ID` (Amplify hosting) or `SITE_BUCKET` and `SITE_DISTRIBUTION_ID` (CloudFront hosting). After that, every push to `main` builds and publishes the site.

To move to CloudFront once AWS verifies the account: `terraform apply -var hosting=cloudfront`, upload `out/` to the bucket, then swap the repository variables. Amplify's DNS records are removed and the CloudFront alias records are created in the same apply.
