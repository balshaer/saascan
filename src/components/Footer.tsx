import React from "react";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="border-t px-6 py-12 container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--background)",
      }}
    >
      <p className="text-sm md:text-base" style={{ color: "var(--paragraph)" }}>
        SaaS Idea Scanner — Built by{" "}
        <a
          href="https://github.com/balshaer"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
          style={{ color: "var(--highlight)" }}
        >
          Baraa Alshaer
        </a>
      </p>

      <nav className="flex items-center space-x-8">
        <a
          href="https://github.com/balshaer/saascan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          className="flex items-center hover:opacity-80 transition-opacity"
          style={{ color: "var(--paragraph)" }}
        >
          <Github className="w-6 h-6" />
          <span className="sr-only">GitHub</span>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
