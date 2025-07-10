import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="Go to history - SaaS Analyzer"
      className="inline-block cursor-pointer select-none group text-[var(--color-headline)] hover:text-[var(--color-accent)] transition-colors duration-300"
      tabIndex={0}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 ease-in-out group-hover:scale-110 group-focus:scale-110"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
        />
        <rect
          x="38"
          y="65"
          width="6"
          height="15"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          rx={1}
          ry={1}
        />
        <rect
          x="50"
          y="55"
          width="6"
          height="25"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          rx={1}
          ry={1}
        />
        <rect
          x="62"
          y="45"
          width="6"
          height="35"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          rx={1}
          ry={1}
        />
        <rect
          x="75"
          y="75"
          width="12"
          height="30"
          rx={6}
          ry={6}
          fill="currentColor"
          transform="rotate(-45 75 75)"
        />
        <text
          x="60"
          y="110"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill="currentColor"
          textAnchor="middle"
        >
          SaaS Analyzer
        </text>
      </svg>
    </Link>
  );
}
