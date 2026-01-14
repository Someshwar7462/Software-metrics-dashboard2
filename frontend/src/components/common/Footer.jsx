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
    borderTop: "1px solid #e5e7eb",
    fontSize: "14px",
    backgroundColor: darkMode ? "#020617" : "#ffffff",
    color: darkMode ? "#f8fafc" : "#020617",
  }}
>
  {/* LEFT */}
  <div>
    <strong>Software Metrics Dashboard</strong> · Software quality & engineering insights
  </div>

  {/* CENTER (FIXED for dark mode + GitHub added) */}
  <div style={{ opacity: 0.85 }}>
    Powered & Created by <strong>Someshwar Gupta</strong> ·{" "}
    <a
      href="https://github.com/someshwar7462"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: darkMode ? "#38bdf8" : "#2563eb",
        textDecoration: "none",
        fontWeight: 500,
      }}
    >
      GitHub
    </a>
  </div>

  {/* RIGHT */}
  <div style={{ opacity: 0.7 }}>
    Version 1.0.0 · DEV · © 2026
  </div>
</footer>


  );
}

export default Footer;
