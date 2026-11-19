import type { Metadata } from "next";
import { PageTitle, Prose } from "@/components/ui";
import { firm } from "@/lib/firm";

export const metadata: Metadata = { title: "Request a client account" };

// Placeholder until portal sign-up is live; then firm.accountUrl points the button straight at the portal.
export default function Account() {
  return (
    <>
      <PageTitle>Request a client account</PageTitle>
      <Prose className="enter enter-2">
        <p>
          Online client accounts are opening soon. With an account you request to become a client,
          and once we approve it you can book a consultation time and upload documents securely.
        </p>
        <p>
          Until then, email us to request an account and we&apos;ll set up a time with you. Please
          don&apos;t send Social Security numbers or tax documents by email.
        </p>
      </Prose>
      <div className="enter enter-3 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a className="btn" href={`mailto:${firm.email}?subject=Client%20account%20request`}>
          Request an account by email →
        </a>
        <a className="link" href={firm.phoneHref}>
          or call {firm.phone}
        </a>
      </div>
    </>
  );
}
