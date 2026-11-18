import Link from "next/link";
import { PageTitle, Prose } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageTitle>Page not found</PageTitle>
      <Prose>
        <p>
          <Link href="/">Back to the home page →</Link>
        </p>
      </Prose>
    </>
  );
}
