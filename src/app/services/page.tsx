import type { Metadata } from "next";
import { PageTitle, Prose, Row, StartLink } from "@/components/ui";
import { services } from "@/lib/firm";

export const metadata: Metadata = { title: "Services" };

export default function Services() {
  return (
    <>
      <PageTitle>Services</PageTitle>
      <Prose className="enter enter-2">
        <p>
          Returns are $200 per filing. Planning and representation are quoted after a short
          consultation, so you know the cost before any work starts.
        </p>
      </Prose>
      <div className="enter enter-3 mt-8 border-t border-divider">
        {services.map((s) => (
          <Row key={s.slug} label={s.name} meta={s.price}>
            <div className="space-y-2">
              <p>{s.summary}</p>
              <ul className="list-['–_'] pl-4 text-muted-foreground">
                {s.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </Row>
        ))}
      </div>
      <div className="mt-8">
        <StartLink />
      </div>
    </>
  );
}
