import { dynamicQueryEndpoint } from "@/lib/utils";
import apis from "@/services/api-services";
import type { QueryParams } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createQuery } from "react-query-kit";

export const useGetParishDashboardOverview = createQuery({
  queryKey: ["get-parish-dashboard-overview"],
  fetcher: async () => {
    const res = await apis.parish.getDashboardOverview();
    return res.data;
  },
});

export const useGetAllParishes = () => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
  });

  const updateQuery = <K extends keyof QueryParams>(
    field: K,
    value: QueryParams[K],
  ) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [field]: value,
    }));
  };

  const { ...rest } = useQuery({
    queryKey: ["get-all-parishes", query],
    queryFn: async () => {
      const res = await apis.parish.getAllParishes(
        // @ts-expect-error typescript is not smart enough to infer the type of query
        dynamicQueryEndpoint(query),
      );
      return res.data;
    },
  });

  return {
    ...rest,
    updateQuery,
    query,
  };
};

export const useGetParishById = (parishId: string) => {
  return useQuery({
    queryKey: ["get-parish-by-id", parishId],
    queryFn: async () => {
      const res = await apis.parish.getParishById(parishId);
      return res.data;
    },
    enabled: !!parishId,
  });
};
