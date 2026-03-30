import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Haloo Connect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #0f172a 0%, #111827 48%, #1f2937 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "64px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(249,115,22,0.35), transparent 35%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            Haloo Connect
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              <span>AI-Powered Cloud</span>
              <span>Contact Center Software</span>
            </div>
            <div
              style={{
                fontSize: 28,
                color: "rgba(255,255,255,0.82)",
                maxWidth: 900,
                lineHeight: 1.35,
              }}
            >
              Omnichannel voice, WhatsApp, email, IVR, predictive dialer, and
              AI voice automation for enterprise customer support teams.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 22,
              color: "rgba(255,255,255,0.78)",
            }}
          >
            <div>Cloud Call Center</div>
            <div>AI Voice Bot</div>
            <div>WhatsApp Business API</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
