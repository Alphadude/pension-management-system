"use client";
import AnimateComponent from "@/components/ui/animate-component";
import { useMounted } from "@mantine/hooks";
import ContributorsTable from "./contributors-table";
const SearchUserClientPage = () => {
  const mounted = useMounted();
  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <ContributorsTable />
    </AnimateComponent>
  );
};

export default SearchUserClientPage;
