import { toast } from "@/components/ui/toast";
import apis from "@/services/api-services";
import type { paymentVoucherForm } from "@/types/common";
import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

export const useUploadPaymentVoucher = () => {
  const queryClient = useQueryClient();
  const createUploadVoucherMutation = createMutation({
    mutationFn: async (data: FormData): Promise<paymentVoucherForm> => {
      const res = await apis.paymentVoucher.uploadPaymentVoucher(data);
      return res.data as paymentVoucherForm;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-invoices"] });
      toast({
        message: "Payment voucher uploaded successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Failed to upload payment voucher                          ",
        variant: "error",
      });
    },
  });

  return createUploadVoucherMutation();
};
