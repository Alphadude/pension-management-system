import { Group, Modal, Tabs, Text } from "@mantine/core";
import ContributorsTable from "./contributors-table";

interface Props {
  opened: boolean;
  close: VoidFunction;
}

const ParishModal = ({ opened, close }: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Holy Cross Cathedral - Church Details"
      classNames={{
        title: "text-[#1F2937] font-semibold text-xl",
      }}
      size={"85%"}
    >
      <Tabs
        variant="pills"
        defaultValue="contributors"
        radius="xs"
        color="#fff"
        classNames={{
          root: "px-2 py-[6px]",
          tabLabel: "text-base text-normal text-[#6B7280] text-center",
          tab: "p-2 rounded-[8px] flex justify-center",
          list: "bg-[#f2f3f6] border border-[#6B72800D] rounded-[8px]",
        }}
      >
        <Group align="center" justify="space-between">
          <Text>Total Paid: ₦125,000.00</Text>
          <Tabs.List>
            <Tabs.Tab value="contributors">Contributors</Tabs.Tab>
            <Tabs.Tab value="messages">Pensioners</Tabs.Tab>
          </Tabs.List>
        </Group>
        <Tabs.Panel value="contributors" mt={20}>
          <ContributorsTable />
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};

export default ParishModal;
