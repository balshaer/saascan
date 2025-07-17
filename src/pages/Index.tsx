'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import useSingleAnalysis from '@/hooks/useSingleAnalysis';
import HeroSection from '@/components/layout/HeroSection';
import InputAnalysisSection from '@/components/layout/InputAnalysisSection';
import EmptyStateSection from '@/components/layout/EmptyStateSection';
import SkeletonLoader from '@/components/analysis/SkeletonLoader';
import ProgressIndicator from '@/components/analysis/ProgressIndicator';
import AnalysisResult from '@/components/analysis/AnalysisResult';
import { cssVars } from '../utils/cssVariables';

// Animation variants for smooth transitions
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Index = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // New single analysis hook
  const { input, setInput, isAnalyzing, currentResult, handleAnalyze, clearResult } =
    useSingleAnalysis();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const hasResult = currentResult !== null;

  return (
    <>
      {/* Background grid covering full viewport, behind everything */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: 'var(--background)',
          backgroundImage: `linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: '14px 24px',
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col min-h-screen relative ">
        <Navbar />

        <motion.main
          className="container mx-auto px-4 py-8 space-y-8 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <HeroSection />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <div className="space-y-6">
              <motion.div variants={fadeInUp}>
                <InputAnalysisSection
                  input={input}
                  setInput={setInput}
                  isAnalyzing={isAnalyzing}
                  handleAnalyze={handleAnalyze}
                />
              </motion.div>

              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div variants={fadeInUp} initial="initial" animate="animate" exit="exit">
                    <ProgressIndicator isAnalyzing={isAnalyzing} />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {hasResult && !isAnalyzing && currentResult && (
                  <motion.div
                    key="results"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <AnalysisResult result={currentResult} onClear={clearResult} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
