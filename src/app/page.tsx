import Link from "next/link";
import { Entry, PriceList, SectionLabel, StartLink, Timeline } from "@/components/ui";
import { firm, services, steps } from "@/lib/firm";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Tax preparation and planning in Dallas–Fort Worth</h1>
      <p className="font-serif text-[22px] leading-8">{firm.mission}</p>
      <p className="mt-6 max-w-[56ch]">
        Returns are <strong className="font-semibold">$200 per filing</strong>, agreed before any
        work starts. You work directly with {firm.principal}, who has served individuals and small
        businesses across the area for over a decade. Planning and IRS representation are quoted
        after a short consultation.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <StartLink />
        <Link className="link" href="/services/">
          See services →
        </Link>
      </div>

      <SectionLabel>Services</SectionLabel>
      <PriceList
        items={services.map((s) => ({
          key: s.slug,
          name: s.name,
          price: s.price,
          summary: s.summary,
        }))}
      />

      <SectionLabel>How it works</SectionLabel>
      <Timeline>
        {steps.map((s, i) => (
          <Entry key={s.label} title={s.label} meta={s.when} boxed={i === 0}>
            {s.body}
          </Entry>
        ))}
      </Timeline>
    </>
  );
}
