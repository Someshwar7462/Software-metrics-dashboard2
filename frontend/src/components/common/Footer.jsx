import React from "react";
import { useTheme } from "../../context/ThemeContext";

function Footer() {
  const { darkMode } = useTheme();

  const textPrimary = darkMode ? "#f8fafc" : "#020617";
  const textSecondary = darkMode ? "#94a3b8" : "#64748b";

  return (
    <footer
      style={{
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        marginTop: "32px",
        backgroundColor: darkMode ? "#020617" : "#ffffff",
        borderTop: darkMode
          ? "1px solid #1e293b"
          : "1px solid #e5e7eb",
        fontSize: "13px",
      }}
    >
      {/* LEFT */}
      <div style={{ color: textSecondary }}>
        <strong style={{ color: textPrimary }}>
          Software Metrics Dashboard
        </strong>
        <span style={{ marginLeft: "6px" }}>
          · Software quality & engineering insights
        </span>
      </div>

      {/* RIGHT */}
      <div style={{ color: textSecondary }}>
        Version 1.0.0 · DEV · © {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;
