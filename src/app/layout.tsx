import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phekong Wellness Centre",
  description: "Commerce, wellness services, bookings and business operations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
