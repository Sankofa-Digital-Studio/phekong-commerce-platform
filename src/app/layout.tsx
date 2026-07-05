import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phekong M1 Application Shell Vision",
  description:
    "Phekong Wellness Centre's public M1 commerce foundation for accessible, responsive customer journeys.",
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
