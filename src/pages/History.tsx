import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistoryPage from "@/components/history/HistoryPage";

const History: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HistoryPage />
      </main>
      <Footer />
    </div>
  );
};

export default History;
