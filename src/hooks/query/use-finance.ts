import apis from "@/services/api-services";
import { createQuery } from "react-query-kit";

export const useGetFinanceDashboardOverview = createQuery({
  queryKey: ["get-finance-dashboard-overview"],
  fetcher: async () => {
    const res = await apis.finance.getDashboardOverview();
    return res.data;
  },
});

export const useGetFinancePensionDisbursment = createQuery({
  queryKey: ["get-finance-pension-disbursment-overview"],
  fetcher: async () => {
    const res = await apis.finance.getFinancePensionDisbursementOverview();
    return res.data;
  },
});

export const useGetFinancePensionManagementOverview = createQuery({
  queryKey: ["get-finance-pension-management-overview"],
  fetcher: async () => {
    const res = await apis.finance.getFinancePensionManagementOverview();
    return res.data;
  },
});
