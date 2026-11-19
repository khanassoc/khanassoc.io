import type { Metadata } from "next";
import { PageTitle, Prose } from "@/components/ui";
import { firm } from "@/lib/firm";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageTitle>About</PageTitle>
      <Prose className="enter enter-2">
        <p>
          {firm.principal} has prepared returns and advised clients across Dallas–Fort Worth for
          more than ten years, and holds a professional tax certification.
        </p>
        <p>
          Khan Associates is deliberately small. The person you speak with at the consultation is
          the person who prepares and reviews your return, and the one who answers if the IRS
          writes back.
        </p>
        <p className="font-serif text-[20px] leading-7">{firm.mission}</p>
      </Prose>
    </>
  );
}
