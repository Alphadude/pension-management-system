"use client";
import AnimateComponent from "@/components/ui/animate-component";
import type { SupportFormValues } from "@/types/common";
import {
  Accordion,
  Box,
  Button,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useDisclosure, useMounted } from "@mantine/hooks";
import { object, string } from "yup";
import ContactSupportModal from "./contact-support-modal";
import { faqs } from "./faq";

const initialValues: SupportFormValues = {
  subject: "",
  message: "",
};

const supportSchema = object({
  subject: string().required("Subject is required"),
  message: string().required("Message is required"),
});

const SupportPageClient = () => {
  const mounted = useMounted();

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues,
    validate: yupResolver(supportSchema),
  });

  const handleSubmitForm = async () => {
    open();
  };

  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Box className="flex flex-col gap-4 md:mr-[230px] md:mb-[46px] lg:gap-6">
        <Text className="text-base leading-[17px] font-semibold text-[#1E1E1E] lg:text-[28px] lg:leading-12 lg:font-bold">
          Help & Support
        </Text>
        <Box className="flex w-full flex-col gap-2.5 rounded-[12px] bg-[#fff] p-5 md:rounded-none lg:gap-4 lg:pt-6 lg:pb-10">
          <Text className="text-base leading-[17px] font-semibold text-[#1F2937] lg:text-xl lg:leading-12 lg:font-bold">
            Frequently Asked Question
          </Text>
          <Accordion variant="separated" radius="md">
            {faqs.map((faq) => (
              <Accordion.Item
                key={faq.value}
                value={faq.value}
                classNames={{
                  item: "border-[#E5E7EB] bg-[#fff] gap-[20px]",
                }}
              >
                <Accordion.Control
                  classNames={{
                    itemTitle:
                      "font-normal text-[14px] leading-[17px] text-[#1F2937]",
                  }}
                >
                  {faq.value}
                </Accordion.Control>
                <Accordion.Panel>{faq.description}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>
        <Box className="flex w-full flex-col gap-2.5 rounded-[12px] bg-[#fff] p-5 md:rounded-none lg:gap-4 lg:pt-6 lg:pb-10">
          <Text className="text-base leading-[17px] font-semibold text-[#1F2937] lg:text-xl lg:leading-12 lg:font-bold">
            Contact Support
          </Text>
          <form
            onSubmit={form.onSubmit(handleSubmitForm)}
            className="flex flex-col gap-6"
          >
            <TextInput
              label="Subject"
              placeholder="What can we help you with?"
              {...form.getInputProps("subject")}
            />
            <Textarea
              label="Message"
              placeholder="Describe your issue or question"
              {...form.getInputProps("message")}
            />
            <Box className="flex w-full justify-end">
              <Button className="w-[156px]" type="submit">
                Save Changes
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <ContactSupportModal close={close} opened={opened} />
    </AnimateComponent>
  );
};

export default SupportPageClient;
