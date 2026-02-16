import { DocumentWrapperIcon } from "@/components/icons/document-wrapper-icon";
import { Box } from "@mantine/core";
import { useState } from "react";

// GenerateReportModal.jsx
// Single-file React component using Tailwind CSS for styling.
// Usage: import GenerateReportModal from './GenerateReportModal'; then <GenerateReportModal />

export default function GenerateReportModal() {
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState("Contributors Report");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState("PDF");

  function handleGenerateClick() {
    const payload = { reportType, startDate, endDate, format };
    setTimeout(() => setOpen(false), 600);
  }

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md bg-[#2E5AAC1A] px-3 py-2 text-sm font-medium text-[#2E5AAC] shadow-sm hover:bg-[#021e511a] focus:outline-none md:h-[80px] md:gap-4 md:px-6 md:py-4"
      >
        <Box component="span">
          <DocumentWrapperIcon />
        </Box>
        <span className="hidden sm:inline">Generate Report</span>
        <span className="sm:hidden">+</span>
      </button>

      {/* Modal overlay */}
      {open && (
        // high z-index so overlay + modal sit above any header
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Dark/blur background */}
          <div
            //   backdrop-blur-sm
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Modal content (higher than overlay) */}
          <div className="relative z-[10000] w-[min(560px,92%)] rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Generate Report
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Select the type of report and date range
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-slate-500 hover:bg-slate-100"
                aria-label="Close dialog"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Keep form so Enter works — prevent default then call the click handler */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGenerateClick();
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Report Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Contributors Report</option>
                  <option>Contributions Summary</option>
                  <option>Outstanding Balances</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option>PDF</option>
                  <option>CSV</option>
                  <option>XLSX</option>
                </select>
              </div>

              <div className="mt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
