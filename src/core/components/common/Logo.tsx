import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="Go to history - SaaS Analyzer"
      className="inline-block cursor-pointer select-none text-[var(--color-headline)]"
      tabIndex={0}
    >
      <img src="/public/images/logo.png" alt="SaaS Analyzer Logo" className="h-12 w-auto" />
    </Link>
  );
}
