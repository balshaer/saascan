import SaasAnalysisTable from '@/core/components/SaasAnalysisTable';
import { Button } from '@/core/components/ents/ui/button';
import jsPDF from 'jspdf';
import { Download, FileText } from 'lucide-react';

interface ResultsSectionProps {
  results: any[];
  language: string;
  handleExport: () => void;
  handleClear: () => void;
}

const ResultsSection = ({ results, language, handleExport, handleClear }: ResultsSectionProps) => {
  const latestResult = results.length ? results[0] : null;

  const handlePDFExport = () => {
    if (!latestResult) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Saascan Analysis Result', 20, 30);

    let yPosition = 50;

    doc.setFontSize(14);
    doc.text(`Analysis`, 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    const date = new Date(latestResult.timestamp || '').toLocaleDateString();
    doc.text(`Date: ${date}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Viability Score: ${latestResult.score || 0}/100`, 20, yPosition);
    yPosition += 10;

    doc.text('SaaS Concept:', 20, yPosition);
    yPosition += 5;
    const concept = latestResult.input || '';
    const lines = doc.splitTextToSize(concept.substring(0, 200) + '...', 170);
    doc.text(lines, 20, yPosition);
    yPosition += lines.length * 5 + 5;

    if (latestResult.issues && latestResult.issues.length > 0) {
      doc.text('Key Challenges:', 20, yPosition);
      yPosition += 5;
      latestResult.issues.slice(0, 3).forEach((issue: string) => {
        const issueLines = doc.splitTextToSize(`• ${issue}`, 170);
        doc.text(issueLines, 25, yPosition);
        yPosition += issueLines.length * 5;
      });
      yPosition += 5;
    }

    if (latestResult.recommendations && latestResult.recommendations.length > 0) {
      doc.text('Recommendations:', 20, yPosition);
      yPosition += 5;
      latestResult.recommendations.slice(0, 3).forEach((rec: string) => {
        const recLines = doc.splitTextToSize(`• ${rec}`, 170);
        doc.text(recLines, 25, yPosition);
        yPosition += recLines.length * 5;
      });
      yPosition += 10;
    }

    doc.save(`saascan-latest-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleLatestExport = () => {
    if (!latestResult) return;

    const dataStr = JSON.stringify([latestResult], null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `saascan-latest-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!latestResult) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={handlePDFExport}
          className="flex items-center gap-2 hover:bg-[hsl(var(--accent))] transition-colors"
        >
          <FileText className="w-4 h-4" />
          Export PDF
        </Button>
        <Button
          variant="outline"
          onClick={handleLatestExport}
          className="flex items-center gap-2 hover:bg-[hsl(var(--accent))] transition-colors"
        >
          <Download className="w-4 h-4" />
          Export JSON
        </Button>
      </div>
      <SaasAnalysisTable results={[latestResult]} language={language as 'en' | 'ar'} />
    </div>
  );
};

export default ResultsSection;
