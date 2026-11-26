import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { EnergyField } from "@/components/energy-field";
import { BackgroundLightning } from "@/components/background-lightning";

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
  title: "Brandon Balcacer | Data Engineer & Founder",
  description:
    "Brandon Balcacer is a Digital Data Analyst supporting CNBC at Versant Media, building analytics systems, data pipelines, decision tools, and AI-assisted products.",
  keywords: [
    "Brandon Balcacer",
    "Digital Data Analyst",
    "Data Engineer",
    "Data Analytics",
    "CNBC",
    "Versant Media",
    "Simargi Systems",
    "PostgreSQL",
    "AI",
    "Portfolio",
  ],
  authors: [{ name: "Brandon Balcacer" }],
  twitter: { card: "summary_large_image", title: "Brandon Balcacer | Data Engineer & Founder", description: "Building, shipping, and working with data.", images: ["/opengraph-image"] },
  openGraph: {
    title: "Brandon Balcacer | Data Engineer & Founder",
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
        <a href="#main-content" className="skip-link">Skip to content</a>
        <EnergyField />
        <BackgroundLightning />
        <div id="main-content">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
