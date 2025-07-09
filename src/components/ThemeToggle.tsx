import React from "react";
import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";
import { useTheme } from "../themes";
import { Button } from "./ui/button";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { themeMode, toggleTheme } = useTheme();
  const isDark = themeMode === "dark";

  return (
    <Button
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
      variant="icon"
      size="icon"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={className}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleTheme();
        }
      }}
    >
      <Expand toggled={isDark} duration={750} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
    </Button>
  );
};

export default ThemeToggle;
