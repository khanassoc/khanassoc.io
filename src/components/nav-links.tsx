"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string };

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const current = items.find((i) =>
    i.href === "/" ? pathname === "/" : pathname.startsWith(i.href.replace(/\/$/, "")),
  )?.href;
  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap gap-x-3 gap-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="link"
              aria-current={current === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
