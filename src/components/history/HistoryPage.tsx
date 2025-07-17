/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useAnalysisHistory from '@/hooks/useAnalysisHistory';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  CheckSquare,
  Download,
  FileText,
  History,
  RefreshCw,
  Square,
  Trash2,
} from 'lucide-react';
import React from 'react';
import HistoryCard from './HistoryCard';
import HistoryFilters from './HistoryFilters';

const HistoryPage: React.FC = () => {
  const {
    history,
    isLoading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    selectedItems,
    deleteAnalysis,
    deleteSelectedAnalyses,
    clearAllHistory,
    toggleItemSelection,
    selectAllItems,
    deselectAllItems,
    exportHistory,
    getStorageStats,
  } = useAnalysisHistory();

  const storageStats = getStorageStats();
  const hasSelectedItems = selectedItems.size > 0;
  const allItemsSelected = history.length > 0 && selectedItems.size === history.length;

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const handleSelectAll = () => {
    allItemsSelected ? deselectAllItems() : selectAllItems();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <RefreshCw className="w-8 h-8 text-[var(--highlight)]" />
        </motion.div>
        <span className="ml-3 text-lg text-[var(--paragraph)]">Loading history...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[var(--background)]">
      <motion.div
        className="max-w-7xl mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3 text-[var(--headline)]">
                <History className="w-8 h-8 text-[var(--highlight)]" />
                Analysis History
              </h1>
              <p className="text-[var(--paragraph)] mt-2">
                Manage and browse your SaaS idea analysis history.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportHistory}
                className="flex items-center gap-2 border-[var(--border)] text-[var(--headline)] hover:bg-[var(--button-hover)]"
              >
                <Download className="w-4 h-4" />
                Export History
              </Button>

              {history.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearAllHistory}
                  className="flex items-center gap-2 bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button-hover)]"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Storage Stats */}
        <motion.div variants={itemVariants}>
          <Alert className="bg-[var(--card)] border border-[var(--card-border)] text-[var(--card-paragraph)]">
            <FileText className="h-4 w-4 text-[var(--highlight)]" />
            <AlertDescription>
              Total analyses: {storageStats.totalAnalyses} | Storage size:{' '}
              {storageStats.storageSize}
              {storageStats.oldestAnalysis && (
                <>
                  {' '}
                  | Oldest analysis: {new Date(storageStats.oldestAnalysis).toLocaleDateString()}
                </>
              )}
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants}>
          <HistoryFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            totalResults={history.length}
          />
        </motion.div>

        {/* Bulk Actions */}
        {history.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card className="bg-[var(--card)] border border-[var(--card-border)]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAll}
                      className="flex items-center gap-2 border-[var(--border)] text-[var(--headline)]"
                    >
                      {allItemsSelected ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                      {allItemsSelected ? 'Deselect All' : 'Select All'}
                    </Button>

                    {hasSelectedItems && (
                      <span className="text-sm text-[var(--paragraph)]">
                        {selectedItems.size} item(s) selected
                      </span>
                    )}
                  </div>

                  {hasSelectedItems && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={deleteSelectedAnalyses}
                      className="flex items-center gap-2 bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button-hover)]"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Selected ({selectedItems.size})
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* History Items */}
        <motion.div variants={itemVariants}>
          <AnimatePresence>
            {history.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="w-full bg-[var(--card)] border border-[var(--card-border)]">
                  <CardContent className="p-12 text-center">
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
                      <AlertCircle className="w-16 h-16 mx-auto mb-4 text-[var(--secondary)]" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[var(--headline)] mb-2">
                      No analyses found
                    </h3>
                    <p className="text-[var(--paragraph)] mb-4">
                      Start analyzing SaaS ideas to see them here.
                    </p>
                    <Button
                      onClick={() => (window.location.href = '/')}
                      className="mt-4 bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button-hover)]"
                    >
                      Start Analysis
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {history.map((item) => (
                  <HistoryCard
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.has(item.id)}
                    onToggleSelection={toggleItemSelection}
                    onDelete={deleteAnalysis}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HistoryPage;
