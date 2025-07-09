import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  History, 
  Trash2, 
  Download, 
  RefreshCw, 
  CheckSquare, 
  Square,
  AlertCircle,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useAnalysisHistory from "@/hooks/useAnalysisHistory";
import HistoryCard from "./HistoryCard";
import HistoryFilters from "./HistoryFilters";

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
        ease: "easeOut",
      },
    },
  };

  const handleSelectAll = () => {
    if (allItemsSelected) {
      deselectAllItems();
    } else {
      selectAllItems();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </motion.div>
            <span className="mr-3 text-lg text-gray-600">جاري تحميل السجل...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6" dir="rtl">
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
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <History className="w-8 h-8 text-blue-600" />
                سجل التحليلات
              </h1>
              <p className="text-gray-600 mt-2">
                إدارة وتصفح سجل تحليلات أفكار البرمجيات كخدمة
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportHistory}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                تصدير السجل
              </Button>
              
              {history.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearAllHistory}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  مسح الكل
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Storage Stats */}
        <motion.div variants={itemVariants}>
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription className="text-right">
              إجمالي التحليلات: {storageStats.totalAnalyses} | 
              حجم البيانات: {storageStats.storageSize}
              {storageStats.oldestAnalysis && (
                <> | أقدم تحليل: {new Date(storageStats.oldestAnalysis).toLocaleDateString("ar-SA")}</>
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
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAll}
                      className="flex items-center gap-2"
                    >
                      {allItemsSelected ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                      {allItemsSelected ? "إلغاء تحديد الكل" : "تحديد الكل"}
                    </Button>
                    
                    {hasSelectedItems && (
                      <span className="text-sm text-gray-600">
                        تم تحديد {selectedItems.size} عنصر
                      </span>
                    )}
                  </div>
                  
                  {hasSelectedItems && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={deleteSelectedAnalyses}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      حذف المحدد ({selectedItems.size})
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
                <Card className="w-full">
                  <CardContent className="p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2
                      }}
                    >
                      <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      لا توجد تحليلات في السجل
                    </h3>
                    <p className="text-gray-500 mb-4">
                      ابدأ بتحليل أفكار البرمجيات كخدمة لرؤية السجل هنا
                    </p>
                    <Button
                      onClick={() => window.location.href = "/"}
                      className="mt-4"
                    >
                      ابدأ التحليل الآن
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {history.map((item, index) => (
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
