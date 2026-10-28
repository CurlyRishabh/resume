import { ImageResponse } from "next/og";
import { resume } from "./data/resume";

export const alt = `${resume.name.full}, Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const metrics = resume.experience[0].highlights.slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f5f6f8",
          color: "#14161b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#5b616e" }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#1d7f54" }} />
            {resume.headline}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {resume.name.full}
          </div>
        </div>
        <div style={{ display: "flex", gap: 64, borderTop: "2px solid #dde0e6", paddingTop: 32 }}>
          {metrics.map((m) => (
            <div key={m.metric} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 300 }}>
              <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em" }}>{m.metric}</div>
              <div style={{ fontSize: 22, color: "#5b616e" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
