import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      className="w-full border-t"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--background)',
      }}
    >
      <div
        className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-4"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--background)',
        }}
      >
        <span className="text-sm" style={{ color: 'var(--paragraph)' }}>
          © SaaS Idea Scanner
        </span>

        <a
          href="https://github.com/balshaer/saascan"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          aria-label="GitHub repository"
          style={{ color: 'var(--paragraph)' }}
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
