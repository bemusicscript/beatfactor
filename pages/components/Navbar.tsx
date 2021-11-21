import React from "react";
import Link from "next/link";

export function Navbar({ pages }: { pages: string[] }) {
  return (
    <nav>
      {pages.map((page, index) => (
        <div key={index} className={`navbox ${page}`} style={{ borderLeft: index ? "1px solid var(--color-text-secondary)" : "none" }}>
          <Link href={page === "home" ? "/" : `/${page}`}>
            {page}
          </Link>
        </div>
      ))}
    </nav>
  );
}