import { ArrowUpIcon, ArrowUpRight, Github, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const isActive = location.pathname === "/history";

  return (
    <nav
      dir="ltr"
      className="border-b border-[var(--border)] bg-[var(--navbar)]"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />

        <div className="flex items-center gap-3 ">
          <div className="hidden md:flex gap-4 px-3 items-center justify-center text-md text-[var(--paragraph)]">
            <Link className="hover:text-[var(--headline)] " to="/history">
              History
            </Link>
            <Link
              className="flex items-center justify-center gap-0 hover:text-[var(--headline)]  "
              to="https://github.com/balshaer/saascan"
            >
              Github
              <ArrowUpRight className="h-max w-5" />
            </Link>
          </div>

          <ThemeToggle className="inline-flex items-center justify-center gap-2 whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[var(--card)] border border-[var(--card-border)] text-[var(--card-headline)] hover:text-[var(--headline)] hoverd p-2" />

          <div className="md:hidden">
            <select
              value={location.pathname}
              onChange={(e) => (window.location.href = e.target.value)}
              className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--headline)]"
            >
              <option value="/history">History</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
