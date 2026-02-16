import { dynamicQueryEndpoint } from "@/lib/utils";
import apis from "@/services/api-services";
import type { QueryParams } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useGetAllReports = () => {
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
    queryKey: ["get-all-reports", query],
    queryFn: async () => {
      const res = await apis.report.getAllReports(
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
