import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google"; // Importing the new font
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Configure the font
const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Brandon Balcacer",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}