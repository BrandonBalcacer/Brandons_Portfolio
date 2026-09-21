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
  title: "Brandon Balcacer | Digital Data Analyst",
  description:
    "Brandon Balcacer is a Digital Data Analyst supporting CNBC at Versant Media, building analytics systems, data pipelines, decision tools, and AI-assisted products.",
  keywords: [
    "Brandon Balcacer",
    "Digital Data Analyst",
    "Data Engineer",
    "Data Analytics",
    "CNBC",
    "Versant Media",
    "PostgreSQL",
    "AI",
    "Portfolio",
  ],
  authors: [{ name: "Brandon Balcacer" }],
  openGraph: {
    title: "Brandon Balcacer | Digital Data Analyst",
    description:
      "Analytics systems, data pipelines, decision tools, and AI-assisted products.",
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
