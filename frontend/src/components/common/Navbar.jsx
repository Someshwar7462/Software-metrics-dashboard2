import React from "react";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      style={{
        height: "64px",
        backgroundColor: darkMode ? "#020617" : "#ffffff",
        color: darkMode ? "#f8fafc" : "#020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: darkMode
          ? "1px solid #1e293b"
          : "1px solid #e5e7eb",
      }}
    >
      {/* LEFT */}
      <div style={{ fontSize: "18px", fontWeight: "600" }}>
        Software Metrics Dashboard
      </div>

      {/* CENTER: Search */}
      <input
        type="text"
        placeholder="Search metrics..."
        style={{
          width: "220px",
          padding: "6px 10px",
          borderRadius: "6px",
          border: darkMode ? "1px solid #334155" : "1px solid #cbd5e1",
          backgroundColor: darkMode ? "#020617" : "#ffffff",
          color: darkMode ? "#f8fafc" : "#020617",
        }}
      />

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "13px" }}>
          📦 Repo: <strong>Not Selected</strong>
        </span>

        <span style={{ position: "relative", cursor: "pointer" }}>
          🔔
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-8px",
              backgroundColor: "#ef4444",
              color: "white",
              fontSize: "10px",
              padding: "2px 6px",
              borderRadius: "999px",
            }}
          >
            3
          </span>
        </span>

        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: darkMode ? "1px solid #334155" : "1px solid #cbd5e1",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer",
            color: darkMode ? "#f8fafc" : "#020617",
          }}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <button
          style={{
            background: "transparent",
            border: "1px solid #ef4444",
            color: "#ef4444",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
