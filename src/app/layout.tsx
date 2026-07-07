import type { Metadata } from "next";
import "./globals.css";
import { getRobotsMeta, getSiteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: {
    default: "Phekong Wellness Centre",
    template: "%s | Phekong Wellness Centre",
  },
  description: "Approved public product catalogue and product detail pages for Phekong Wellness Centre.",
  robots: getRobotsMeta(),
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
