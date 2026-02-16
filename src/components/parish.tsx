import { useGetParishById } from "@/hooks/query/use-parish";

export const Parish = ({ parishId }: { parishId: string }) => {
  const { data: parish } = useGetParishById(parishId);
  return <>{parish?.doc.name}</>;
};
