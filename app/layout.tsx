import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BayanLink — Sarili mong link, sarili mong negosyo",
  description:
    "A Philippines-first link-in-bio storefront for Filipino creators, merchants, stays, tours, and local businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
