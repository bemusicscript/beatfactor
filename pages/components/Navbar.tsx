import React from "react";
import Link from "next/link";

const Capitalize = (str: string) => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

export function Navbar({ pages }: { pages: string[] }) {
  return (
    <nav>
      {pages.map((page, index) => (
        <div key={index} className={`navbox ${page}`} style={{ borderLeft: index ? "1px solid var(--color-text-secondary)" : "none" }}>
          <Link href={page === "home" ? "/" : `/${page}`}>
            {Capitalize(page)}
          </Link>
        </div>
      ))}
    </nav>
  );
}