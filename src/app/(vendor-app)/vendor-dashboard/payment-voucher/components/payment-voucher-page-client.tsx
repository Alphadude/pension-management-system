"use client";
import AnimateComponent from "@/components/ui/animate-component";
import { Card, Flex, Stack, Text, Title } from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import type { Session } from "next-auth";
import { paymentVoucherSteps } from "./extras";
import PaymentVoucherTable from "./payment-voucher-table";

interface Props {
  session: Session | null;
}

const PaymentVoucherPageClient = ({ session }: Props) => {
  const mounted = useMounted();
  return (
    <AnimateComponent mounted={mounted} transition="fade-left" duration={500}>
      <Stack gap={24}>
        <Stack className="font-poppins gap-y-2 sm:gap-y-0">
          <Title className="text-dark text-lg leading-[17px] font-semibold sm:text-[28px] sm:leading-12 sm:font-bold">
            Welcome, {session?.user?.firstName}
          </Title>
          <Text className="text-grey text-sm leading-[17px] font-normal sm:text-base sm:leading-[17px]">
            Download and manage your payment vouchers
          </Text>
        </Stack>
        <PaymentVoucherTable />
        <Card radius={12} className="sm:py-10 sm:pl-5">
          <Stack className="gap-y-4">
            <Text className="font-inter text-lg font-bold text-[#1F2937] sm:text-xl sm:leading-12">
              How to Complete a Payment Voucher
            </Text>
            {paymentVoucherSteps?.map((step, index) => (
              <Stack key={index} className="gap-y-2">
                <Flex className="gap-x-2">
                  <Flex className="font-poppins bg-primary h-[21px] w-[21px] items-center justify-center rounded-full text-[10px] leading-3 font-medium text-white sm:h-[29px] sm:w-[29px] sm:text-sm sm:leading-[17px]">
                    {index + 1}
                  </Flex>
                  <Stack gap={4} className="font-poppins flex-1">
                    <Text className="text-dark text-sm leading-[17px] font-medium sm:text-base sm:leading-[17px]">
                      {step.title}
                    </Text>
                    <Text className="text-xs leading-[17px] font-normal text-[#6B7280] sm:text-sm sm:leading-[17px]">
                      {step.description}
                    </Text>
                  </Stack>
                </Flex>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Stack>
    </AnimateComponent>
  );
};

export default PaymentVoucherPageClient;
