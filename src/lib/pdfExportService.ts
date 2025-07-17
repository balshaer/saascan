// @ts-ignore - html2pdf.js doesn't have proper TypeScript definitions
import html2pdf from 'html2pdf.js';
import { HorizontalAnalysisResult } from './uxAnalyzer';

// Interface for PDF export service following Single Responsibility Principle
export interface IPdfExportService {
  exportSingleResult(result: HorizontalAnalysisResult): Promise<void>;
}

// PDF export configuration interface
export interface PdfExportConfig {
  margin: number;
  filename: string;
  image: { type: string; quality: number };
  html2canvas: { scale: number; useCORS: boolean };
  jsPDF: { unit: string; format: string; orientation: string };
}

// Default PDF configuration
const DEFAULT_PDF_CONFIG: PdfExportConfig = {
  margin: 1,
  filename: 'saascan-analysis-results.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true },
  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
};

// PDF export service implementation for horizontal table (English LTR)
export class HorizontalPdfExportService implements IPdfExportService {
  private config: PdfExportConfig;

  constructor(config: Partial<PdfExportConfig> = {}) {
    this.config = { ...DEFAULT_PDF_CONFIG, ...config };
  }

  async exportSingleResult(result: HorizontalAnalysisResult): Promise<void> {
    // Progressive delays for robust PDF generation
    await new Promise((resolve) => setTimeout(resolve, 100));

    const htmlContent = this.generateHtmlContent(result);
    const element = this.createTemporaryElement(htmlContent);

    try {
      // Wait for element to be fully rendered with additional buffer
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Additional buffer before PDF generation
      await new Promise((resolve) => setTimeout(resolve, 200));

      await this.generatePdf(element, {
        ...this.config,
        filename: `saascan-analysis-${new Date().toISOString().split('T')[0]}.pdf`,
      });
    } finally {
      this.removeTemporaryElement(element);
    }
  }

  private generateHtmlContent(result: HorizontalAnalysisResult): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `
      <!DOCTYPE html>
      <html dir="ltr" lang="en">
        <head>
          <meta charset="utf-8">
          <title>SaasCan Analysis Results</title>
          <style>
            ${this.getPdfStyles()}
          </style>
        </head>
        <body>
          <div class="pdf-container">
            <header class="pdf-header">
              <div class="logo-section">
                <h1>🎯 SaasCan</h1>
                <p>Comprehensive SaaS Idea Analysis</p>
              </div>
              <div class="date-section">
                <p>Generated on ${currentDate}</p>
              </div>
            </header>

            <main class="pdf-content">
              ${this.generateResultHtml(result)}
            </main>

            <footer class="pdf-footer">
              <p>© 2024 SaasCan - Professional SaaS Analysis Platform</p>
              <p>This report contains confidential business analysis. Handle with care.</p>
            </footer>
          </div>
        </body>
      </html>
    `;
  }

  private generateResultHtml(result: HorizontalAnalysisResult): string {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    };

    const getInnovationColor = (level: string) => {
      switch (level) {
        case 'High':
          return '#10b981';
        case 'Medium':
          return '#f59e0b';
        case 'Low':
          return '#ef4444';
        default:
          return '#6b7280';
      }
    };

    const getRatingColor = (rating: number) => {
      if (rating >= 80) return '#10b981';
      if (rating >= 60) return '#f59e0b';
      return '#ef4444';
    };

    return `
      <div class="analysis-result">
        <div class="result-header">
          <h2>Idea Analysis</h2>
          <div class="result-meta">
            <span class="timestamp">📅 ${formatDate(result.timestamp)}</span>
            <span class="rating" style="color: ${getRatingColor(result.overallScore)}">
              🚀 ${result.overallScore}/100
            </span>
          </div>
        </div>

        <div class="idea-section">
          <h3>🎯 Original Idea</h3>
          <div class="idea-content">
            ${result.originalIdea}
          </div>
        </div>

        <div class="analysis-table">
          <table>
            <tbody>
              <tr>
                <td class="label">👤 Target Audience</td>
                <td class="value">${result.targetAudience}</td>
              </tr>
              <tr>
                <td class="label">🛠️ Problems Solved</td>
                <td class="value">${result.problemsSolved}</td>
              </tr>
              <tr>
                <td class="label">💡 Proposed Solution</td>
                <td class="value">${result.proposedSolution}</td>
              </tr>
              <tr>
                <td class="label">🔍 Competitors</td>
                <td class="value">${Array.isArray(result.competitors) ? result.competitors.join(', ') : result.competitors}</td>
              </tr>
              <tr>
                <td class="label">📈 Scalability</td>
                <td class="value">${result.scalability}</td>
              </tr>
              <tr>
                <td class="label">💰 Revenue Model</td>
                <td class="value">${result.revenueModel}</td>
              </tr>
              <tr>
                <td class="label">🧠 Innovation Level</td>
                <td class="value">
                  <span style="color: ${getInnovationColor(result.innovationLevel)}; font-weight: bold;">
                    ${result.innovationLevel}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">🚀 Overall Score</td>
                <td class="value">
                  <span style="color: ${getRatingColor(result.overallScore)}; font-weight: bold; font-size: 1.2em;">
                    ${result.overallScore}/100
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private getPdfStyles(): string {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Arial', 'Helvetica', sans-serif;
        line-height: 1.8;
        color: #374151;
        background: white;
        direction: ltr;
        text-align: left;
      }

      .pdf-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 40px;
        direction: ltr;
      }

      .pdf-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 3px solid #3b82f6;
        padding-bottom: 20px;
        margin-bottom: 40px;
        direction: ltr;
      }

      .logo-section h1 {
        font-size: 2.5em;
        color: #3b82f6;
        margin-bottom: 5px;
        font-weight: 700;
      }

      .logo-section p {
        color: #6b7280;
        font-size: 1.1em;
        font-weight: 600;
      }

      .date-section {
        text-align: right;
        color: #6b7280;
        font-weight: 600;
      }

      .analysis-result {
        margin-bottom: 40px;
      }

      .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e5e7eb;
        direction: rtl;
      }

      .result-header h2 {
        color: #1f2937;
        font-size: 1.8em;
        font-weight: 700;
      }

      .result-meta {
        display: flex;
        gap: 20px;
        font-size: 0.9em;
        font-weight: 600;
      }

      .idea-section {
        margin-bottom: 30px;
        padding: 20px;
        background-color: #f8fafc;
        border-radius: 8px;
        border-left: 4px solid #3b82f6;
      }

      .idea-section h3 {
        color: #1f2937;
        margin-bottom: 15px;
        font-size: 1.3em;
        font-weight: 700;
      }

      .idea-content {
        background-color: white;
        padding: 15px;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
        font-size: 1.1em;
        line-height: 1.8;
        color: #1f2937;
      }

      .analysis-table {
        margin-bottom: 30px;
      }

      .analysis-table table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        overflow: hidden;
        direction: ltr;
      }

      .analysis-table td {
        padding: 15px;
        border-bottom: 1px solid #e5e7eb;
        vertical-align: top;
      }

      .analysis-table .label {
        background-color: #f9fafb;
        font-weight: 700;
        width: 250px;
        color: #374151;
        text-align: left;
        border-right: 1px solid #e5e7eb;
      }

      .analysis-table .value {
        background-color: white;
        color: #1f2937;
        font-weight: 600;
        line-height: 1.8;
      }

      .pdf-footer {
        margin-top: 60px;
        padding-top: 20px;
        border-top: 2px solid #e5e7eb;
        text-align: center;
        color: #6b7280;
        font-size: 0.9em;
        font-weight: 600;
      }

      .pdf-footer p {
        margin-bottom: 5px;
      }
    `;
  }

  private createTemporaryElement(htmlContent: string): HTMLElement {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '-9999px';
    element.style.width = '800px';
    element.style.direction = 'ltr';
    document.body.appendChild(element);
    return element;
  }

  private removeTemporaryElement(element: HTMLElement): void {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  private async generatePdf(element: HTMLElement, config: PdfExportConfig): Promise<void> {
    // @ts-ignore - html2pdf.js doesn't have proper TypeScript definitions
    return html2pdf().set(config).from(element).save();
  }
}

// Factory function for creating PDF export service (following Factory Pattern)
export const createPdfExportService = (config?: Partial<PdfExportConfig>): IPdfExportService => {
  return new HorizontalPdfExportService(config);
};
