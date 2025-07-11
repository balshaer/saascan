import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SaasAnalysisTable from "@/components/SaasAnalysisTable";
import { motion } from "framer-motion";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = React.useState<any[]>([]);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saascanResults") || "[]");
    if (Array.isArray(saved)) setResults(saved);
  }, []);

  const handleClear = () => {
    setResults([]);
    localStorage.removeItem("saascanResults");
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `saascan-history-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: "var(--background)",
          backgroundImage: `linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "14px 24px",
        }}
        aria-hidden="true"
      />
      <main className="container mx-auto px-4 py-8 space-y-8 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-[var(--background)]/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">Analysis History</h1>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={handleExport}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleClear}
                    className="flex items-center gap-2"
                
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <SaasAnalysisTable results={results} language="en" />
              ) : (
                <div className="text-center py-12">
                  <p className="text-[var(--paragraph)]">
                    No analysis history found
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

    </div>
  );
};

export default HistoryPage;
