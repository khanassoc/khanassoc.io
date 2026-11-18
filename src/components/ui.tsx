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
    <>
      <header className="band">
        <div className="mx-auto flex max-w-[760px] flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-4 pb-16 pt-8 sm:px-12 sm:pb-20 sm:pt-10">
          <Link href="/" className="display text-[34px] leading-10">
            {firm.name}
          </Link>
          <NavLinks items={nav} />
        </div>
      </header>
      <div className="mx-auto max-w-[760px] px-4 pb-10 sm:px-12">
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
    </>
  );
}

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="enter display mb-4 text-[40px] leading-[44px] text-navy">
      {children}
    </h1>
  );
}

export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`space-y-4 [&_a]:link ${className}`}>{children}</div>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="display mb-3 mt-12 text-[26px] leading-8 text-navy">
      {children}
    </h2>
  );
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
          <h3 className="font-normal">{title}</h3>
          {meta && (
            <span className="shrink-0 text-muted-foreground">{meta}</span>
          )}
        </div>
        <div className="mt-1 text-muted-foreground">{children}</div>
      </div>
    </li>
  );
}

export function Row({
  label,
  meta,
  children,
}: {
  label: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <details className="row border-b border-divider">
      <summary className="flex items-center justify-between gap-4 py-[9px] hover:bg-background-hover">
        <span className="font-normal">{label}</span>
        <span className="flex items-center gap-4 text-muted-foreground">
          {meta}
          <span className="sign w-3 text-center" aria-hidden="true" />
        </span>
      </summary>
      <div className="pb-4 pt-1">{children}</div>
    </details>
  );
}

export function StartLink() {
  if (firm.accountUrl)
    return (
      <a className="btn" href={firm.accountUrl}>
        Create your account →
      </a>
    );
  return (
    <Link className="btn" href="/account/">
      Create your account →
    </Link>
  );
}
