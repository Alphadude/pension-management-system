import { toast } from "@/components/ui/toast";
import apis from "@/services/api-services";
import type {
  UpdateKycStatusPayload,
  UpdateParishFormValues,
  UpdateProfilePayload,
  UpdateStatusFormValues,
  UpdateUserProfileResponse,
} from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { Session } from "next-auth";
import { createMutation } from "react-query-kit";

type ProfileData = {
  profilePhoto?: {
    url: string;
  };
};

export const useUpdateProfile = (
  cb: (data?: ProfileData) => Promise<Session | null>,
) => {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateUserProfileResponse,
    AxiosError,
    Partial<UpdateProfilePayload> | FormData
  >({
    mutationFn: async (
      data: Partial<UpdateProfilePayload> | FormData,
    ): Promise<UpdateUserProfileResponse> => {
      const res = await apis.users.updateProfile(data);

      return res?.data;
    },
    onSuccess: async (data) => {
      await cb({
        profilePhoto: {
          url: data?.user?.profilePhoto?.url,
        },
      });
      await queryClient.invalidateQueries({
        queryKey: ["profile-overview"],
      });
      toast({
        message: "Profile updated successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Profile failed to update",
        variant: "error",
      });
    },
  });
};

// export const useUpdateUserStatus = (id: string) => {
//   const queryClient = useQueryClient();
//   const updateUserStatusMutation = createMutation({
//     mutationFn: async (data: UpdateStatusFormValues) => {
//       const res = await apis.users.updateUserStatus(data, id);
//       return res.data;
//     },
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: ["get-all-users", "get-user"] });
//       toast({
//         message: "User Status updated successfully",
//         variant: "success",
//       });
//     },
//     onError: () => {
//       toast({
//         message: "Failed to create User Status",
//         variant: "error",
//       });
//     },
//   });

//   return updateUserStatusMutation();
// };

export const useUpdateUserKycStatus = (id: string) => {
  const queryClient = useQueryClient();
  const updateUserKycStatusMutation = createMutation({
    mutationFn: async (data: UpdateKycStatusPayload) => {
      const res = await apis.users.updateKycStatus(id, data);
      return res.data as object;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-users", "get-user"],
      });
      toast({
        message: "User Kyc Status updated successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Failed to update User Kyc Status",
        variant: "error",
      });
    },
  });

  return updateUserKycStatusMutation();
};

export const useUpdateUserStatus = (id: string) => {
  const queryClient = useQueryClient();
  const updateUserStatusMutation = createMutation({
    mutationFn: async (data: UpdateStatusFormValues) => {
      const res = await apis.users.updateUserStatus(data, id);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-users", "get-user"],
      });
      toast({
        message: "User Status updated successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Failed to create User Status",
        variant: "error",
      });
    },
  });

  return updateUserStatusMutation();
};

export const useUpdateUserParish = (id: string) => {
  const queryClient = useQueryClient();
  const updateUserParishMutation = createMutation({
    mutationFn: async (data: UpdateParishFormValues) => {
      const res = await apis.users.updateUserParish(data, id);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-all-users", "get-user"],
      });
      toast({
        message: "User Parish updated successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        message: "Failed to update User Parish",
        variant: "error",
      });
    },
  });

  return updateUserParishMutation();
};
