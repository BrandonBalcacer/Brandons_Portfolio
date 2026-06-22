import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brandonbalcacer.dev"),
  title: "Brandon Balcacer — Cloud, Data & AI",
  description:
    "Brandon Balcacer — Information Technology Management student building cloud infrastructure, data pipelines, dashboards, and AI-driven tools. MSP Lab Technician at Samsung SDS America.",
  keywords: [
    "Brandon Balcacer",
    "Cloud Engineer",
    "Data Analytics",
    "AWS",
    "AI",
    "Samsung SDS",
    "Portfolio",
  ],
  authors: [{ name: "Brandon Balcacer" }],
  openGraph: {
    title: "Brandon Balcacer — Cloud, Data & AI",
    description:
      "Building cloud infrastructure, data pipelines, dashboards, and AI-driven tools.",
    url: "https://brandonbalcacer.dev",
    siteName: "Brandon Balcacer",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0d10",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
