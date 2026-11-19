import Link from "next/link";
import type { ReactNode } from "react";
import { firm } from "@/lib/firm";
import { NavLinks } from "./nav-links";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[720px] px-4 py-8 sm:px-12 sm:py-10">
      <header className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <Link href="/" className="font-serif text-[30px] leading-9 tracking-[-0.01em]">
          {firm.name}
        </Link>
        <NavLinks items={nav} />
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-divider pt-4 text-muted-foreground">
        <p>
          {firm.name} · {firm.address.join(", ")}
        </p>
        <p>
          <a className="link" href={`mailto:${firm.email}`}>
            {firm.email}
          </a>{" "}
          ·{" "}
          <a className="link" href={firm.phoneHref}>
            {firm.phone}
          </a>
        </p>
      </footer>
    </div>
  );
}

// No visible page titles: the nav already shows where you are. The h1 stays for screen readers and search.
export function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="sr-only">{children}</h1>;
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`space-y-4 [&_a]:link ${className}`}>{children}</div>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 mt-14 text-[12px] font-medium leading-4 text-muted-foreground uppercase tracking-[0.12em]">{children}</h2>;
}

export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="timeline space-y-3">{children}</ol>;
}

export function Entry({
  title,
  meta,
  boxed = false,
  children,
}: {
  title: ReactNode;
  meta?: ReactNode;
  boxed?: boolean;
  children: ReactNode;
}) {
  return (
    <li>
      <div className={`entry ${boxed ? "boxed" : ""}`}>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-semibold">{title}</h3>
          {meta && <span className="shrink-0 text-muted-foreground">{meta}</span>}
        </div>
        <div className="mt-1 text-muted-foreground">{children}</div>
      </div>
    </li>
  );
}

export function Row({ label, meta, children }: { label: ReactNode; meta?: ReactNode; children: ReactNode }) {
  return (
    <details className="row border-b border-divider">
      <summary className="flex items-center justify-between gap-4 py-[9px] hover:bg-background-hover">
        <span className="font-semibold">{label}</span>
        <span className="flex items-center gap-4 text-muted-foreground">
          {meta}
          <span className="sign w-3 text-center" aria-hidden="true" />
        </span>
      </summary>
      <div className="pb-4 pt-1">{children}</div>
    </details>
  );
}

// Services side by side: name and price on one line so they compare at a glance, summary underneath.
export function PriceList({
  items,
}: {
  items: { key: string; name: ReactNode; price: ReactNode; summary: ReactNode }[];
}) {
  return (
    <ul className="border-t border-divider">
      {items.map((i) => (
        <li key={i.key} className="border-b border-divider py-4">
          <div className="flex items-baseline justify-between gap-x-6">
            <h3 className="font-semibold">{i.name}</h3>
            <span className="text-right font-medium">{i.price}</span>
          </div>
          <p className="mt-1 text-muted-foreground">{i.summary}</p>
        </li>
      ))}
    </ul>
  );
}

// The one call to action. Label lives here; the destination switches to the portal once firm.accountUrl is set.
export function StartLink() {
  const label = "Request a client account →";
  if (firm.accountUrl)
    return (
      <a className="btn" href={firm.accountUrl}>
        {label}
      </a>
    );
  return (
    <Link className="btn" href="/account/">
      {label}
    </Link>
  );
}
