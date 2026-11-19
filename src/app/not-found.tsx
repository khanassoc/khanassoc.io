import Link from "next/link";
import { Prose } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Prose>
        <p>That page doesn&apos;t exist.</p>
        <p>
          <Link href="/">Back to the home page →</Link>
        </p>
      </Prose>
    </>
  );
}
