import { createTheme, type MantineThemeOverride } from "@mantine/core";
import { poppins } from "./font";

export const theme: MantineThemeOverride = createTheme({
  fontFamily: poppins.style.fontFamily,
  white: "#ffffff",
  black: "#000000",
  headings: {
    fontFamily: poppins.style.fontFamily,
  },
  colors: {
    primary: [
      "#2E5AAC",
      "#2E5AAC",
      "#2E5AAC",
      "#2E5AAC",
      "#2E5AAC",
      "#2E5AAC",
      "#2E5AAC",
      "#2E5AAC",
      "#2E5AAC",
      "#2E5AAC",
    ],
  },
  primaryColor: "primary",
});
