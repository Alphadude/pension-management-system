import {
  Box,
  Button,
  Collapse,
  Group,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Filter, Search } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

interface UserFiltersProps {
  children?: React.ReactNode; // For injecting page-specific filters (e.g., Role, Status, Parish, Diocese)
  showRoleFilter?: boolean;
}

const UserFilters = ({ children, showRoleFilter }: UserFiltersProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  // nuqs states
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    clearOnDefault: true,
  });
  const [contributorId, setContributorId] = useQueryState("contributorId", {
    defaultValue: "",
    clearOnDefault: true,
  });
  const [gender, setGender] = useQueryState("gender", {
    defaultValue: "",
    clearOnDefault: true,
  });
  const [yearOfBirth, setYearOfBirth] = useQueryState(
    "yearOfBirth",
    parseAsInteger.withDefault(0),
  );
  const [yearStarted, setYearStarted] = useQueryState(
    "yearStarted",
    parseAsInteger.withDefault(0),
  );
  const [basicSalary, setBasicSalary] = useQueryState(
    "basicSalary",
    parseAsInteger.withDefault(0),
  );
  const [totalContribution, setTotalContribution] = useQueryState(
    "totalContribution",
    parseAsInteger.withDefault(0),
  );

  return (
    <Box className="w-full">
      <Group
        gap={16}
        px={24}
        className="mt-2 mb-5 grid w-full grid-cols-1 md:grid-cols-[3fr_auto]"
      >
        <TextInput
          leftSection={<Search color="#9CA3AF" size={20} />}
          placeholder="Search by user names, emails..."
          value={search ?? ""}
          onChange={(e) => setSearch(e.currentTarget.value ?? null)}
          classNames={{
            input: "h-[32px] md:h-[42px] w-full",
          }}
        />
        <Button
          variant="light"
          color="gray"
          onClick={toggle}
          leftSection={<Filter size={16} />}
          className="h-[32px] md:h-[42px]"
        >
          Filters
        </Button>
      </Group>

      <Collapse in={opened}>
        <Box
          px={24}
          className="mb-5 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {children}

          <TextInput
            placeholder="Contributor ID"
            label="Contributor ID"
            value={contributorId ?? ""}
            onChange={(e) => setContributorId(e.currentTarget.value ?? null)}
            classNames={{
              input: "h-[42px] rounded-[8px]",
            }}
          />

          <Select
            placeholder="Gender"
            label="Gender"
            data={["Male", "Female"]}
            value={gender ?? null}
            onChange={(val) => setGender(val ?? null)}
            clearable
            classNames={{
              input: "h-[42px] rounded-[8px]",
            }}
          />

          <NumberInput
            placeholder="Year of Birth"
            label="Year of Birth"
            value={yearOfBirth || ""}
            onChange={(val) => setYearOfBirth(val === "" ? null : Number(val))}
            hideControls
            classNames={{
              input: "h-[42px] rounded-[8px]",
            }}
          />

          <NumberInput
            placeholder="Year Started"
            label="Year Started"
            value={yearStarted || ""}
            onChange={(val) => setYearStarted(val === "" ? null : Number(val))}
            hideControls
            classNames={{
              input: "h-[42px] rounded-[8px]",
            }}
          />

          <NumberInput
            placeholder="Basic Salary"
            label="Basic Salary"
            value={basicSalary || ""}
            onChange={(val) => setBasicSalary(val === "" ? null : Number(val))}
            hideControls
            thousandSeparator
            classNames={{
              input: "h-[42px] rounded-[8px]",
            }}
          />

          <NumberInput
            placeholder="Total Contribution"
            label="Total Contribution"
            value={totalContribution || ""}
            onChange={(val) =>
              setTotalContribution(val === "" ? null : Number(val))
            }
            hideControls
            thousandSeparator
            classNames={{
              input: "h-[42px] rounded-[8px]",
            }}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export default UserFilters;
