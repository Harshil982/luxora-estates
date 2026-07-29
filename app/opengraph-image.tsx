import { ImageResponse } from "next/og";

export const alt = "Luxora Estates — Where Extraordinary Living Begins";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card: gold diamond + wordmark on obsidian.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(120% 90% at 50% -10%, #1a1a20 0%, #08080a 60%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* gold hairline top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent, #c9a96a, transparent)",
          }}
        />
        {/* diamond glyph */}
        <div
          style={{
            display: "flex",
            width: 104,
            height: 104,
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(45deg)",
            borderRadius: 20,
            border: "2px solid rgba(201,169,106,0.55)",
            marginBottom: 56,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              background: "linear-gradient(135deg, #e6cf9a, #9c7f4a)",
            }}
          />
        </div>
        {/* wordmark */}
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: 18,
            color: "#f6f2ea",
            paddingLeft: 18,
          }}
        >
          LUXORA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: 22,
            color: "#c9a96a",
            marginTop: 8,
            paddingLeft: 22,
          }}
        >
          ESTATES
        </div>
        {/* tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#a7a29a",
            marginTop: 44,
            letterSpacing: 1,
          }}
        >
          Where Extraordinary Living Begins.
        </div>
      </div>
    ),
    { ...size }
  );
}
