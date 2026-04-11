import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import JsonLd from "@/next/components/JsonLd";
import {
  buildMetadata,
  DEFAULT_DESCRIPTION,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "AI Contact Center Software",
    description: DEFAULT_DESCRIPTION,
    path: "",
  }),
  metadataBase: new URL("https://connect.haloocom.com"),
  manifest: "/manifest.webmanifest",
  title: {
    default: "Haloo Connect",
    template: "%s | Haloo Connect",
  },
  applicationName: "Haloo Connect",
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    google: "iBuWTyODzMsfLnrTeeDLLPJp6aiR9tOllO_m6FfHfOc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="degFOW2kXMlqVyyiaL4yig"
          async
        />
      </head>
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={softwareApplicationSchema} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
