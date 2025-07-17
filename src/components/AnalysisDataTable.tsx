import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Download, Trash2 } from 'lucide-react';
import { AnalysisResult } from '@/lib/uxAnalyzer';
import { useTheme } from '../themes';
import { TableHeader, TableRow } from './table';

interface AnalysisDataTableProps {
  results: AnalysisResult[];
  language: 'en' | 'ar';
  onExport?: () => void;
  onClear?: () => void;
}

const AnalysisDataTable = ({ results, language, onExport, onClear }: AnalysisDataTableProps) => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            </motion.div>
            <motion.h3
              className="text-lg font-semibold text-gray-600 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              No Analysis Results Yet
            </motion.h3>
            <motion.p
              className="text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Start by analyzing your first SaaS concept to see detailed results here.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with Actions */}
      <motion.div className="flex justify-between items-center" variants={tableVariants}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold" style={{ color: cssVars.textPrimary }}>
            Analysis Results
          </h2>
          <motion.p
            className="text-gray-600"
            style={{ color: cssVars.textSecondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {results.length} analysis{results.length !== 1 ? 'es' : ''} completed
          </motion.p>
        </motion.div>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {onExport && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={onExport} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </motion.div>
          )}
          {onClear && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={onClear} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Comprehensive Data Table */}
      <motion.div
        className="rounded-lg shadow-lg overflow-hidden theme-table"
        style={{ backgroundColor: cssVars.bgCard }}
        variants={tableVariants}
      >
        <div className="overflow-x-auto">
          <table
            className="min-w-full divide-y theme-table"
            style={{ borderColor: theme.colors.border.primary }}
          >
            <TableHeader language={language} />
            <tbody
              className="divide-y theme-table"
              style={{
                backgroundColor: theme.colors.table.row.bg,
                borderColor: theme.colors.border.primary,
              }}
            >
              {results.map((result, index) => (
                <TableRow
                  key={result.id}
                  result={result}
                  index={index}
                  totalResults={results.length}
                />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisDataTable;
