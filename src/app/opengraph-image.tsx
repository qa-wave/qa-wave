import { ImageResponse } from "next/og";

export const alt = "qawave.ai — The Edge of QA Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#050505",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            color: "#ededed",
            marginBottom: 48,
          }}
        >
          qawave
          <span style={{ color: "#6366f1" }}>.ai</span>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            padding: "8px 20px",
            borderRadius: 9999,
            border: "1px solid rgba(99, 102, 241, 0.3)",
            background: "rgba(79, 70, 229, 0.1)",
            fontSize: 16,
            color: "#818cf8",
            marginBottom: 32,
          }}
        >
          QA Automation Consulting & Implementation
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            color: "#ededed",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 800,
          }}
        >
          The Edge of QA Automation
        </div>

        {/* Subheadline */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#a1a1aa",
            marginTop: 24,
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Agentic AI testing — from strategy through production.
        </div>

        {/* Decorative dots */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 180,
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          {[0, 1, 2].map((row) => (
            <div key={row} style={{ display: "flex", gap: 40 }}>
              {[0, 1, 2].map((col) => (
                <div
                  key={col}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background:
                      row + col < 3
                        ? "#6366f1"
                        : "rgba(99, 102, 241, 0.2)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
