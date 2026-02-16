// src/components/BaseDashboardLayout.tsx
"use client";
import {
  ActionIcon,
  Box,
  Container,
  Drawer,
  em,
  Flex,
  Group,
  Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Menu } from "lucide-react";
import React, { type PropsWithChildren, type ReactNode } from "react";

export interface BaseDashboardLayoutProps {
  /** Top‐left title/brand text */
  title: string;
  /** Left‐sidebar navigation component */
  navigation: ReactNode;
  /** Right‐side user section (avatar, logout, etc.) */
  userSection: ReactNode;
  logout: ReactNode;
}

export function BaseDashboardLayout({
  title,
  navigation,
  userSection,
  logout,
  children,
}: PropsWithChildren<BaseDashboardLayoutProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  // auto‐close drawer on desktop
  React.useEffect(() => {
    if (!isMobile) close();
  }, [isMobile, close]);

  return (
    <>
      <Box className="h-full bg-[#F9FAFC]">
        <Flex className="flex-col md:flex-row">
          {/* mobile top bar */}
          <Group className="justify-between px-5 pt-3 pb-[15px] md:hidden">
            <Text className="text-primary text-sm leading-[17px] font-semibold">
              {title}
            </Text>
            <ActionIcon onClick={open} variant="transparent">
              <Menu color="#4B5563" />
            </ActionIcon>
          </Group>

          {/* desktop sidebar */}
          <Box className="sticky top-0 hidden h-screen w-[253px] border-r border-[#6B72801A] bg-[#F9FAFC] pt-10 md:block">
            <Box className="border-b border-[#6B72801A] px-5 pb-4">
              <Text className="font-inter text-primary text-xl font-bold">
                {title}
              </Text>
            </Box>
            <Flex className="h-[calc(100vh-95px)] flex-col px-5 pb-10">
              <Box className="flex-1">{navigation}</Box>
              {logout}
            </Flex>
          </Box>

          {/* main content area */}
          <Box className="flex-1">
            {/* desktop top bar (user info) */}
            <Flex className="sticky top-0 z-50 hidden h-[64px] items-center border-b border-[#6B72801A] bg-[#F9FAFC] md:block">
              <Container
                fluid
                className="flex h-full w-full items-center justify-end xl:pr-[135px]"
              >
                {userSection}
              </Container>
            </Flex>

            <Box className="min-h-[calc(100vh-55px)] px-5 md:pt-5 md:pl-10 xl:pr-[135px]">
              {children}
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* mobile drawer */}
      <Drawer opened={opened} onClose={close} size="xs">
        <Flex className="h-[calc(100vh-80px)] flex-col px-5 pt-5">
          <Text className="text-primary font-inter text-xl font-bold">
            {title}
          </Text>
          <Box className="mt-4 flex-1">{navigation}</Box>
          {userSection}
        </Flex>
      </Drawer>
    </>
  );
}

export default BaseDashboardLayout;
