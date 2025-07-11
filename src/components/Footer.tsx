import React from "react";
import { Github } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer = () => {
  return (
    <footer
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--background)",
      }}
      className="w-full border-t-2 bg-[var(--card)] border-[var(--border)]"
    >
      <div
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
        }}
        className="container  px-6 py-12 w-full mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        <p
          className="text-sm md:text-base"
          style={{ color: "var(--paragraph)" }}
        >
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="icon">
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
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Contribute on GitHub </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
