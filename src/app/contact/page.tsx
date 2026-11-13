import type { Metadata } from "next";
import { PageTitle, Prose, StartLink } from "@/components/ui";
import { firm } from "@/lib/firm";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageTitle>Contact</PageTitle>
      <Prose className="enter enter-2">
        <p>
          New clients start with a short consultation. Please don&apos;t send Social Security
          numbers or tax documents by email. After the consultation you get a secure upload link.
        </p>
      </Prose>
      <dl className="enter enter-3 mt-8 grid grid-cols-[96px_1fr] gap-y-3 border-t border-divider pt-4">
        <dt className="text-muted-foreground">Email</dt>
        <dd>
          <a className="link" href={`mailto:${firm.email}`}>
            {firm.email}
          </a>
        </dd>
        <dt className="text-muted-foreground">Phone</dt>
        <dd>
          <a className="link" href={firm.phoneHref}>
            {firm.phone}
          </a>
        </dd>
        <dt className="text-muted-foreground">Office</dt>
        <dd>
          {firm.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </dd>
        <dt className="text-muted-foreground">Hours</dt>
        <dd>{firm.hours}</dd>
      </dl>
      <div className="mt-8">
        <StartLink />
      </div>
    </>
  );
}
