import { Card, CardContent } from '@/core/components/ui/card';

const EmptyStateSection = () => {
  return (
    <div>
      <Card className="bg-[var(--background)]/50   ">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[var(--headline)]">No Results Yet</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyStateSection;
