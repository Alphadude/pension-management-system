import { Paper } from "@mantine/core";
import type { PropsWithChildren } from "react";

const AuthFormContainer = ({ children }: PropsWithChildren) => {
  return (
    <Paper className="relative z-10 mt-[51px] h-[calc(100vh-51px)] w-full rounded-tl-[40px] rounded-tr-[40px] bg-white px-5 pt-[40px] md:mt-0 md:h-fit md:w-[435px] md:pt-0">
      {children}
    </Paper>
  );
};

export default AuthFormContainer;
