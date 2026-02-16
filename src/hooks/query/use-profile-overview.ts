import apis from "@/services/api-services";
import type { ProfileOverview } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

const useProfileOverview = () => {
  return useQuery<ProfileOverview>({
    queryKey: ["profile-overview"],
    queryFn: async () => {
      const res = await apis.users.profileOverview();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    },
  });
};

export default useProfileOverview;
