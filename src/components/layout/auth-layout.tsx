"use client";
import img from "@/public/images/Pension Management System Frame.svg";
import { Box } from "@mantine/core";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useState, type PropsWithChildren } from "react";
import AnimateComponent from "../ui/animate-component";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <Box className="relative md:py-[50px]">
      <Box className="grid-cols-2 items-center md:grid">
        <AnimateComponent
          mounted={isMounted}
          transition="fade-right"
          duration={500}
        >
          <Image
            src={img as StaticImageData}
            alt=""
            className="hidden h-[calc(100vh-100px)] md:block"
            priority
          />
        </AnimateComponent>
        <AnimateComponent
          mounted={isMounted}
          transition="fade-left"
          duration={500}
        >
          <Box className="border border-transparent">
            <Box
              className="absolute top-0 left-0 h-full w-full bg-cover bg-center bg-no-repeat md:hidden"
              style={{
                backgroundImage: "url('/images/login-bg.svg')",
              }}
            />
            {children}
          </Box>
        </AnimateComponent>
      </Box>
    </Box>
  );
};

export default AuthLayout;
