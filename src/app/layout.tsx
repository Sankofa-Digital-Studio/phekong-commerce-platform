import type { Metadata } from "next";
import "./globals.css";
import { getRobotsMeta, getSiteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: "Phekong M1 Application Shell Vision",
  description:
    "Phekong Wellness Centre's public M1 commerce foundation for accessible, responsive customer journeys.",
  robots: getRobotsMeta(),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
