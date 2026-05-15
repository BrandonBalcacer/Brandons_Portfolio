import type { Metadata } from "next";
import { Source_Serif_4, Inter, JetBrains_Mono, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const display = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Brandon Balcacer — Need a Solution? I'm the answer.",
  description:
    "Brandon Balcacer — Data analyst and builder shipping ETL pipelines, BI dashboards, and AI-assisted automations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${display.variable}`}
    >
      <body className="font-sans antialiased bg-bg text-ink">
        {children}
        <Analytics
          mode={process.env.NODE_ENV === "production" ? "production" : "development"}
          debug={process.env.NODE_ENV !== "production"}
        />
      </body>
    </html>
  );
}
