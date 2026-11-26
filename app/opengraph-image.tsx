import { ImageResponse } from "next/og";

export const alt = "Brandon Balcacer — Data Engineer and Founder of Simargi Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 72, background: "#0c0d10", color: "#e8eaed", border: "2px solid #20242c" }}>
      <div style={{ display: "flex", fontSize: 24, color: "#4ade80" }}>brandon@portfolio: ~</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -4 }}>Brandon Balcacer<span style={{ color: "#4ade80" }}>.</span></div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#a1a7b3" }}>Data Engineer · Founder, Simargi Systems</div>
      </div>
      <div style={{ display: "flex", fontSize: 25, color: "#4ade80" }}>Building, shipping, and working with data.</div>
    </div>, size,
  );
}
