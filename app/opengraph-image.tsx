import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/site";

export const alt = `${BRAND}: recovery tracking that doesn't stop when you leave the clinic`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 96px",
          background: "#fff",
          color: "#0F0F0F",
          borderLeft: "1px solid #E8E8E8",
          borderRight: "1px solid #E8E8E8",
          backgroundImage: "radial-gradient(#DADADA 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.03em" }}>{BRAND}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.04, maxWidth: 900 }}>
            Recovery doesn&apos;t happen in the clinic.
          </div>
          <div style={{ fontSize: 30, color: "#6B6B6B", marginTop: 28 }}>
            Recovery tracking for every leg injury. Join the waitlist.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
