import { dynamicQueryEndpoint } from "@/lib/utils";
import apis from "@/services/api-services";
import type {
  ContributionResponse,
  ParishContributionResponse,
  QueryParams,
} from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useGetUserContributions = (uuid: string) => {
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
    queryKey: ["get-user-contributions", uuid, query],
    queryFn: async () => {
      const res = await apis.contributor.getUserContributions(
        // @ts-expect-error typescript is not smart enough to infer the type of query
        dynamicQueryEndpoint(query),
        uuid,
      );
      return res.data;
    },
    enabled: !!uuid,
  });

  return {
    ...rest,
    updateQuery,
    query,
  };
};

export const useGetAllContributions = () => {
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
    queryKey: ["get-all-contributions", query],
    queryFn: async () => {
      const res = await apis.contributions.getAllContributions(
        // @ts-expect-error typescript is not smart enough to infer the type of query
        dynamicQueryEndpoint(query),
      );
      return res.data as ContributionResponse;
    },
  });

  return {
    ...rest,
    updateQuery,
    query,
  };
};

export const useSearchContributions = (name: string) => {
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
    queryKey: ["search-contributions", name, query],
    queryFn: async () => {
      const res = await apis.contributions.searchContributions(
        name,
        // @ts-expect-error typescript is not smart enough to infer the type of query
        dynamicQueryEndpoint(query),
      );
      return res.data as ContributionResponse;
    },
    enabled: !!name,
  });

  return {
    ...rest,
    updateQuery,
    query,
  };
};

export const useGetMonthlyRemittance = () => {
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
    queryKey: ["get-monthly-remittance", query],
    queryFn: async () => {
      const res = await apis.contributions.getMonthlyRemittance(
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

export const useGetAllParishContributions = () => {
  return useQuery<ParishContributionResponse>({
    queryKey: ["get-all-parish-contributions"],
    queryFn: async () => {
      const res = await apis.contributions.getAllParishContributions();

      return res.data;
    },
  });
};
