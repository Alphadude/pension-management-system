import apis from "@/services/api-services";
import type { VerifyBankAccountRequestData } from "@/types/common";
import { createQuery } from "react-query-kit";

export const useGetBankList = createQuery({
  queryKey: ["get-bank-list"],
  fetcher: async () => {
    const res = await apis.paystack.getBankList();
    return res.data?.data;
  },
});

export const useVerifyBankAccount = createQuery({
  queryKey: ["verify-bank-account"],
  fetcher: async (data: VerifyBankAccountRequestData) => {
    const res = await apis.paystack.verifyBankAccount(data);
    return res.data;
  },
});
