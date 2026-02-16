import { toast } from "@/components/ui/toast";
import apis from "@/services/api-services";
import type { InvoicesFormData } from "@/types/common";
import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";
import { useGetInvoiceOverview } from "../query/use-get-invoice";

export const useCreateInvoice = (cb?: () => void) => {
  const queryClient = useQueryClient();

  const createInvoiceMutation = createMutation({
    mutationFn: async (data: InvoicesFormData) => {
      const res = await apis.invoice.createInvoice(data);
      return res.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["get-invoice"],
        }),
        queryClient.invalidateQueries({
          queryKey: useGetInvoiceOverview.getKey(),
        }),
      ]);
      toast({
        message: "Invoice created successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Failed to create invoice",
        variant: "error",
      });
    },
    onSettled: () => {
      cb?.();
    },
  });

  return createInvoiceMutation();
};
