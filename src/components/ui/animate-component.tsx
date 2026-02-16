import { Box, Transition, type TransitionProps } from "@mantine/core";
import { type ReactNode } from "react";

interface AnimateComponentProps extends Omit<TransitionProps, "children"> {
  children: ReactNode;
}

const AnimateComponent = ({ children, ...props }: AnimateComponentProps) => (
  <Transition {...props}>
    {(styles) => <Box style={styles}>{children}</Box>}
  </Transition>
);

export default AnimateComponent;
