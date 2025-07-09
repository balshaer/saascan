import { ArrowUpIcon, ArrowUpRight, Github, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const location = useLocation();
  const isActive = location.pathname === "/history";

  return (
    <nav
      dir="ltr"
      className="border-b border-[var(--border)] bg-[var(--background)]/90"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center ">
            <Link to="/history">
              <Button
                size="sm"
                variant={isActive ? "default" : "ghost"}
                className={`flex items-center gap-2 ${
                  isActive
                    ? "bg-[var(--highlight)] text-[var(--button-text)]"
                    : "text-[var(--headline)] hover:bg-[var(--secondary)]/20"
                }`}
              >
                History
              </Button>
            </Link>
            <Link to="/history">
              <Button
                size="sm"
                variant={isActive ? "default" : "ghost"}
                className={`flex items-center gap-1 ${
                  isActive
                    ? "bg-[var(--highlight)] text-[var(--button-text)]"
                    : "text-[var(--headline)] hover:bg-[var(--secondary)]/20"
                }`}
              >
                <ArrowUpRight />
                Github
              </Button>
            </Link>
          </div>

          <ThemeToggle />

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
