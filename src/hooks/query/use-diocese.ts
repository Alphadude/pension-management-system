import { dynamicQueryEndpoint } from "@/lib/utils";
import apis from "@/services/api-services";
import type { QueryParams } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useGetAllDiocese = () => {
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
    queryKey: ["get-all-diocese", query],
    queryFn: async () => {
      const res = await apis.diocese.getAllDioceses(
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

export const useGetDioceseById = (dioceseId: string) => {
  return useQuery({
    queryKey: ["get-diocese-by-id", dioceseId],
    queryFn: async () => {
      const res = await apis.diocese.getDioceseById(dioceseId);
      return res.data;
    },
    enabled: !!dioceseId,
  });
};
