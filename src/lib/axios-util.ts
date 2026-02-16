import { env } from "@/env";
import axios from "axios";
import { getSession } from "next-auth/react";

export const server = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  responseType: "json",
  timeout: 240_000,
});

export const paystackServer = axios.create({
  baseURL: env.NEXT_PUBLIC_PAYSTACK_BASE_URL,
  responseType: "json",
  timeout: 240_000,
});

paystackServer.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`;
    return config;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error);
    }
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    );
  },
);

server.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      return config;
    }
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error);
    }
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    );
  },
);
