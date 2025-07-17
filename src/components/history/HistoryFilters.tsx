import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { Calendar, Filter, RotateCcw, Search, Star } from 'lucide-react';
import React from 'react';

interface HistoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    minScore: number;
    maxScore: number;
    innovationLevel: '' | 'منخفض' | 'متوسط' | 'عالي';
    dateRange: {
      start: string;
      end: string;
    };
  };
  onFiltersChange: (filters: any) => void;
  totalResults: number;
  className?: string;
}

const HistoryFilters: React.FC<HistoryFiltersProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  totalResults,
  className = '',
}) => {
  const handleScoreRangeChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      minScore: values[0],
      maxScore: values[1],
    });
  };

  const handleInnovationLevelChange = (value: string) => {
    onFiltersChange({
      ...filters,
      innovationLevel: value === 'all' ? '' : (value as 'منخفض' | 'متوسط' | 'عالي'),
    });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      minScore: 0,
      maxScore: 100,
      innovationLevel: '',
      dateRange: {
        start: '',
        end: '',
      },
    });
    onSearchChange('');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    filters.minScore !== 0 ||
    filters.maxScore !== 100 ||
    filters.innovationLevel !== '' ||
    filters.dateRange.start !== '' ||
    filters.dateRange.end !== '';

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card dir="rtl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold  flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              البحث والتصفية
            </CardTitle>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{totalResults} نتيجة</span>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  إعادة تعيين
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Search Input */}
          <div className="space-y-2">
            <Label
              htmlFor="search"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              البحث في النصوص
            </Label>
            <Input
              id="search"
              type="text"
              placeholder="ابحث في الأفكار أو الجمهور المستهدف أو المشاكل..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
              dir="rtl"
            />
          </div>

          {/* Score Range Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Star className="w-4 h-4" />
              نطاق التقييم: {filters.minScore} - {filters.maxScore}
            </Label>
            <div className="px-2">
              <Slider
                value={[filters.minScore, filters.maxScore]}
                onValueChange={handleScoreRangeChange}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Innovation Level Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">مستوى الابتكار</Label>
            <Select
              value={filters.innovationLevel || 'all'}
              onValueChange={handleInnovationLevelChange}
            >
              <SelectTrigger className="w-full" dir="rtl">
                <SelectValue placeholder="اختر مستوى الابتكار" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="عالي">عالي</SelectItem>
                <SelectItem value="متوسط">متوسط</SelectItem>
                <SelectItem value="منخفض">منخفض</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              نطاق التاريخ
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="start-date" className="text-xs text-gray-600">
                  من تاريخ
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="end-date" className="text-xs text-gray-600">
                  إلى تاريخ
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-lg p-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-sm font-medium text-blue-900 mb-2">المرشحات النشطة:</h4>
              <div className="space-y-1 text-xs text-blue-800">
                {searchQuery.trim() && <div>• البحث: "{searchQuery}"</div>}
                {(filters.minScore !== 0 || filters.maxScore !== 100) && (
                  <div>
                    • التقييم: {filters.minScore} - {filters.maxScore}
                  </div>
                )}
                {filters.innovationLevel && <div>• مستوى الابتكار: {filters.innovationLevel}</div>}
                {(filters.dateRange.start || filters.dateRange.end) && (
                  <div>
                    • التاريخ: {filters.dateRange.start || 'غير محدد'} إلى{' '}
                    {filters.dateRange.end || 'غير محدد'}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HistoryFilters;
