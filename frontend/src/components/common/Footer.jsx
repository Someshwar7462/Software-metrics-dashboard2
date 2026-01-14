import React from "react";
import { useTheme } from "../../context/ThemeContext";

function Footer() {
  const { darkMode } = useTheme();

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
        color: darkMode ? "#cbd5e1" : "#475569",
        fontSize: "13px",
      }}
    >
      {/* LEFT */}
      <div>
        <strong style={{ color: darkMode ? "#f8fafc" : "#020617" }}>
          Software Metrics Dashboard
        </strong>
        <span style={{ marginLeft: "6px" }}>
          · Engineering quality at a glance
        </span>
      </div>

      {/* RIGHT */}
      <div>
        v1.0.0 · DEV · © {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;
