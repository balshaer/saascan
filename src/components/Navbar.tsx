'use client';

import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';
import { ThemeToggleButton } from '@/themes/theme-toggle-button';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Download, Menu, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

interface NavbarProps {
  onExport?: () => void;
  onClear?: () => void;
  resultsLength?: number;
}

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const Navbar = ({ onExport, onClear, resultsLength }: NavbarProps) => {
  const location = useLocation();
  const isHistoryPage = location.pathname === '/history';
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  if (isHistoryPage) {
    return (
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between bg-[var(--background)]/70 backdrop-blur-sm rounded-none border-b border-[var(--border)] px-4 py-4 gap-3">
        <Logo />
        <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto justify-center sm:justify-end">
          <Button
            variant="secondary"
            onClick={onExport}
            className="flex items-center gap-2 whitespace-nowrap"
            disabled={(resultsLength ?? 0) === 0}
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            variant="destructive"
            onClick={onClear}
            className="flex items-center gap-2 whitespace-nowrap"
            disabled={(resultsLength ?? 0) === 0}
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        </div>
      </CardHeader>
    );
  }

  return (
    <nav
      dir="ltr"
      className="border-b border-[var(--border)] bg-[var(--navbar)] relative z-50"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-md text-[var(--paragraph)]">
          <Link
            className="flex items-center hover:text-[var(--headline)] whitespace-nowrap"
            to="/history"
          >
            History
          </Link>
          <Link
            className="flex items-center hover:text-[var(--headline)] whitespace-nowrap"
            to="https://github.com/balshaer/saascan"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
            <ArrowUpRight className="ml-1 w-5 h-5 maxmd" />
          </Link>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <ThemeToggleButton
            showLabel
            variant="circle-blur"
            start="top-right"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[var(--card)] border border-[var(--card-border)] text-[var(--card-headline)] hover:text-[var(--headline)] p-2"
          />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[var(--card-headline)] hover:text-[var(--headline)]"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Fullscreen animated menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="fullscreen-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 z-50 bg-[var(--background)] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-[var(--card-headline)] hover:text-[var(--headline)]"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>

            <div className="flex flex-col items-center gap-8 text-3xl text-[var(--headline)]">
              {['History', 'Github'].map((text, index) => (
                <motion.div
                  key={text}
                  className="flex"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.04 } },
                  }}
                >
                  {text.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                  {text === 'Github' && <ArrowUpRight className="ml-2 w-6 h-6 max-md:hidden" />}
                </motion.div>
              ))}

              {/* Links behind animation (real navigation) */}
              <div className="hidden">
                <Link to="/history" />
                <a
                  href="https://github.com/balshaer/saascan"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
