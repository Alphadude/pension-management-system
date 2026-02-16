"use client";
import { Tabs, Transition } from "@mantine/core";
import type { PropsWithChildren } from "react";
import type { DioceseSettingsTabType } from "./extras";

type Props = {
  value: DioceseSettingsTabType;
  isMounted: boolean;
};

const TransitionTab = ({
  children,
  value,
  isMounted,
}: PropsWithChildren<Props>) => {
  return (
    <Transition
      mounted={isMounted}
      transition="fade-left"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Tabs.Panel style={styles} value={value} className="">
          {children}
        </Tabs.Panel>
      )}
    </Transition>
  );
};

export default TransitionTab;
