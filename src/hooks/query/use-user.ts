import { dynamicQueryEndpoint } from "@/lib/utils";
import apis from "@/services/api-services";
import type {
  GetAllUserResponse,
  GetUserResponse,
  QueryParams,
} from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useGetAllUsers = () => {
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
    queryKey: ["get-all-users", query],
    queryFn: async () => {
      const res = await apis.users.getAllUsers(
        // @ts-expect-error typescript is not smart enough to infer the type of query
        dynamicQueryEndpoint(query),
      );
      return res.data as GetAllUserResponse;
    },
  });

  return {
    ...rest,
    updateQuery,
    query,
  };
};

export const useGetUser = (uuid: string) => {
  return useQuery({
    queryKey: ["get-user", uuid],
    queryFn: async () => {
      const res = await apis.users.getUser(uuid);
      return res.data as GetUserResponse;
    },
  });
};

export const useGetPendingUsers = () => {
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
    queryKey: ["get-all-users", query],
    queryFn: async () => {
      const res = await apis.users.getPendingUsers(
        // @ts-expect-error typescript is not smart enough to infer the type of query
        dynamicQueryEndpoint(query),
      );
      return res.data as GetAllUserResponse;
    },
  });

  return {
    ...rest,
    updateQuery,
    query,
  };
};

export const useGetUserNotifications = (userId: string) => {
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
    queryKey: ["get-user-notifications", query],
    queryFn: async () => {
      const res = await apis.users.getUserNotification(
        userId,
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
