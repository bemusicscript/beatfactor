import React from "react";
// import "./Navbar.scss";

export function Navbar({ pages }: { pages: string[] }) {
  return (
    <nav>
      {pages.map((page, index) => (
        <div key={index} className={`navbox ${page}`} style={{ borderLeft: index ? "1px solid var(--color-text-secondary)" : "none" }}>
          <a key={index} href={`#${page}`}>
            {page}
          </a>
        </div>
      ))}
    </nav>
  );
}