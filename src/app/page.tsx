import Link from "next/link";
import { Entry, Prose, SectionLabel, StartLink, Timeline } from "@/components/ui";
import { firm, services, steps } from "@/lib/firm";

export default function Home() {
  return (
    <>
      <p className="enter mb-6 font-serif text-[22px] leading-8">{firm.mission}</p>
      <Prose className="enter enter-2">
        <p>
          Khan Associates prepares returns, plans ahead, and represents individuals and small
          businesses before the IRS. You work directly with {firm.principal}, who has served
          clients across Dallas–Fort Worth for over a decade.
        </p>
        <p>
          Returns are $200 per filing, agreed before any work starts.{" "}
          <Link href="/services/">See services →</Link>
        </p>
      </Prose>
      <div className="enter enter-3 mt-6">
        <StartLink />
      </div>

      <SectionLabel>How it works</SectionLabel>
      <Timeline>
        {steps.map((s, i) => (
          <Entry key={s.label} title={s.label} meta={s.when} boxed={i === 0}>
            {s.body}
          </Entry>
        ))}
      </Timeline>

      <SectionLabel>Services</SectionLabel>
      <Timeline>
        {services.map((s) => (
          <Entry key={s.slug} title={s.name} meta={s.price} boxed>
            {s.summary}
          </Entry>
        ))}
      </Timeline>
    </>
  );
}
