export type AccountType =
  | "Asset"
  | "Liability"
  | "Income"
  | "Expense"
  | "Equity";

export interface ChartOfAccount {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
}

export type TransactionType = "Receipt" | "Payment" | "Transfer";

export interface Transaction {
  id: string;
  date: string; // ISO String
  type: TransactionType;
  amount: number;
  debitAccountId: string;
  creditAccountId: string;
  description: string;
  attachmentUrl?: string; // Optional
  createdAt: string;
  updatedAt: string;
}

export type AssetStatus = "Active" | "Disposed" | "Fully Depreciated";

export interface FixedAsset {
  id: string;
  uniqueAssetId: string;
  name: string;
  category: string;
  location: string;
  cost: number;
  depreciationRate: number; // Percentage
  accumulatedDepreciation: number;
  currentBookValue: number;
  status: AssetStatus;
  acquisitionDate: string;
}

// Responses & Payloads specific to Accounting
export interface CreateTransactionPayload {
  date: string;
  type: TransactionType;
  amount: number;
  debitAccountId: string;
  creditAccountId: string;
  description: string;
  attachmentUrl?: string;
}

export interface LedgerEntry {
  id: string;
  transactionId: string;
  accountId: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  runningBalance: number;
}

export interface GenerateReportPayload {
  type: "TrialBalance" | "IncomeExpenditure" | "BalanceSheet" | "Notes";
  startDate: string;
  endDate: string;
  format: "PDF" | "Excel";
}

export interface AccountingDashboardOverview {
  cashBalance: number;
  bankBalance: number;
  totalIncome: number;
  totalExpenses: number;
  budgetVariance: number;
}
