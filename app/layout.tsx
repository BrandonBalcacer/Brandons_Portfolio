import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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
      <body className="font-mono antialiased">
        {children}
        <Analytics mode={process.env.NODE_ENV === "production" ? "production" : "development"} debug={process.env.NODE_ENV !== "production"} />
      </body>
    </html>
  );
}
