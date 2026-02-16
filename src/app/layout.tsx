import Provider from "@/components/provider";
import { siteConfig } from "@/config/site";
import { inter, poppins, readexPro } from "@/lib/font";
import "@/styles/globals.css";
import "@mantine/charts/styles.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import { type Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} - %s`,
  },
  description: siteConfig.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${readexPro.variable}`}
      {...mantineHtmlProps}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>
          <Toaster position="top-center" />
          <NuqsAdapter>{children}</NuqsAdapter>
        </Provider>
      </body>
    </html>
  );
}
