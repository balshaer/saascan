'use client';

import { ThemeToggleButton } from '@/themes/theme-toggle-button';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ArrowUpRight, Download, Menu, Trash2, X } from 'lucide-react';
import React, { memo, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import Logo from './Logo';

interface NavbarProps {
  onExport?: () => void;
  onClear?: () => void;
  resultsLength?: number;
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const menuItems = [
  { label: 'Home', to: '/', isExternal: false },
  { label: 'History', to: '/history', isExternal: false },
  { label: 'Github', to: 'https://github.com/balshaer/saascan', isExternal: true },
] as const;

const Navbar: React.FC<NavbarProps> = memo(({ onExport, onClear, resultsLength }) => {
  const location = useLocation();
  const isHistoryPage = location.pathname === '/history';
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isDisabled = (resultsLength ?? 0) === 0;

  return (
    <nav
      dir="ltr"
      aria-label="Main Navigation"
      className="border-b border-[var(--border)] bg-[var(--navbar)] relative z-50"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />

        <div className="hidden md:flex items-center gap-6 text-md text-[var(--paragraph)]">
          <Link
            to="/"
            className="flex items-center whitespace-nowrap hover:text-[var(--headline)]"
          >
            Home
          </Link>
          <Link
            to="/history"
            className="flex items-center whitespace-nowrap hover:text-[var(--headline)]"
          >
            History
          </Link>
          <a
            href="https://github.com/balshaer/saascan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center whitespace-nowrap hover:text-[var(--headline)]"
          >
            Github
            <ArrowUpRight className="ml-1 w-5 h-5 maxmd:hidden" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggleButton
            showLabel
            variant="circle-blur"
            start="top-right"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[var(--card)] border border-[var(--card-border)] text-[var(--card-headline)] hover:text-[var(--headline)] p-2"
          />
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[var(--card-headline)] hover:text-[var(--headline)]"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* For History page, show export & clear buttons below logo on mobile */}
      {isHistoryPage && (
        <div className="container mx-auto px-4 pb-4 md:hidden flex gap-2 justify-center">
          <Button
            variant="secondary"
            onClick={onExport}
            disabled={isDisabled}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            variant="destructive"
            onClick={onClear}
            disabled={isDisabled}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        </div>
      )}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="fullscreen-menu"
            className="fixed inset-0 z-50 bg-[var(--background)] flex flex-col items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-[var(--card-headline)] hover:text-[var(--headline)]"
            >
              <X className="w-7 h-7" />
            </button>

            <div className="flex flex-col items-center gap-8 text-3xl text-[var(--headline)]">
              {menuItems.map(({ label, isExternal }, index) => (
                <motion.div
                  key={label}
                  className="flex"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                >
                  {label.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                  {isExternal && <ArrowUpRight className="ml-2 w-6 h-6 max-md:hidden" />}
                </motion.div>
              ))}

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
});

export default Navbar;
