import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/style/globals.css";
import "../src/style/reset.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plann.er ",
  description: "Organize your trip easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
