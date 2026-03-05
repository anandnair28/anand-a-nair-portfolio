import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anand A Nair | Portfolio",
  description:
    "Portfolio of Anand A Nair, full-stack developer focused on data, analytics, and AI-enabled products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
