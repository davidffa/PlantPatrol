import type { Metadata } from "next";
import "./globals.css";
import { Inter, Roboto_Flex } from "next/font/google";

export const metadata: Metadata = {
  title: "PlantPatrol",
  description: "A Greenhouse management system",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
