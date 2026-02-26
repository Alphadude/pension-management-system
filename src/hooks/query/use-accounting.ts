import apis from "@/services/api-services";
import type {
  AccountingDashboardOverview,
  ChartOfAccount,
  CreateTransactionPayload,
  FixedAsset,
  GenerateReportPayload,
  LedgerEntry,
  Transaction,
} from "@/types/accounting";
import { useMutation, useQuery } from "@tanstack/react-query";

// Note: The generic 'any' typing in some query hooks is a placeholder
// assuming standard response envelopes like { doc: T } or similar,
// depending on exact backend implementation.

export const useGetAccountingDashboardOverview = () => {
  return useQuery({
    queryKey: ["accounting-dashboard-overview"],
    queryFn: async () => {
      const response = await apis.accounting.getDashboardOverview();
      return response.data as { doc: AccountingDashboardOverview };
    },
  });
};

export const useGetTransactions = (query = "") => {
  return useQuery({
    queryKey: ["accounting-transactions", query],
    queryFn: async () => {
      const response = await apis.accounting.getTransactions(query);
      return response.data as { docs: Transaction[]; totalPages: number };
    },
  });
};

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: async (data: CreateTransactionPayload) => {
      const response = await apis.accounting.createTransaction(data);
      return response.data;
    },
  });
};

export const useGetLedgerEntries = (accountId: string, query = "") => {
  return useQuery({
    queryKey: ["accounting-ledger", accountId, query],
    queryFn: async () => {
      const response = await apis.accounting.getLedger(accountId, query);
      return response.data as { docs: LedgerEntry[] };
    },
    enabled: !!accountId, // Only run if accountId is present
  });
};

export const useGetFixedAssets = (query = "") => {
  return useQuery({
    queryKey: ["accounting-assets", query],
    queryFn: async () => {
      const response = await apis.accounting.getAssets(query);
      return response.data as { docs: FixedAsset[] };
    },
  });
};

export const useCreateFixedAsset = () => {
  return useMutation({
    mutationFn: async (data: Partial<FixedAsset>) => {
      const response = await apis.accounting.createAsset(data);
      return response.data;
    },
  });
};

export const useRunDepreciation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apis.accounting.runDepreciation();
      return response.data;
    },
  });
};

export const useGenerateAccountingReport = () => {
  return useMutation({
    mutationFn: async (data: GenerateReportPayload) => {
      const response = await apis.accounting.generateReport(data);
      return response.data as { fileUrl: string };
    },
  });
};

export const useGetChartOfAccounts = () => {
  return useQuery({
    queryKey: ["chart-of-accounts"],
    queryFn: async () => {
      const response = await apis.accounting.getChartOfAccounts();
      return response.data as { docs: ChartOfAccount[] };
    },
  });
};

export const useCreateChartOfAccount = () => {
  return useMutation({
    mutationFn: async (data: Partial<ChartOfAccount>) => {
      const response = await apis.accounting.createAccount(data);
      return response.data;
    },
  });
};
