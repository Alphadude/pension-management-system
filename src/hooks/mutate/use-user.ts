import { toast } from "@/components/ui/toast";
import apis from "@/services/api-services";
import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "react-query-kit";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const deleteUserMutation = createMutation({
    mutationFn: async (id: string) => {
      const res = await apis.users.deleteUser(id);
      return res.data as unknown;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-users"],
      });
      toast({
        message: "User deleted successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Failed to delete user",
        variant: "error",
      });
    },
  });

  return deleteUserMutation();
};
