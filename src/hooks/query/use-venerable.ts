import apis from "@/services/api-services";
import { createQuery } from "react-query-kit";

export const useGetVenerableDashboardOverview = createQuery({
  queryKey: ["get-venerable-dashboard-overview"],
  fetcher: async () => {
    const res = await apis.venerable.getDashboardOverview();
    return res.data;
  },
});
