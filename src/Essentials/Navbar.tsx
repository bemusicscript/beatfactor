import React from "react";
import { Link } from "react-router-dom";

export function Navbar({ pages }: { pages: string[] }) {
  return (
    <nav>
      {pages.map((page, index) => (
        <div key={index} className={`navbox ${page}`} style={{ borderLeft: index ? "1px solid var(--color-text-secondary)" : "none" }}>
          <Link to={`${page === "Home" ? "/" : page}`}>
            {page}
          </Link>
        </div>
      ))}
    </nav>
  );
}