import React, { useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3); // dummy count

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
        transition: "all 0.3s ease",
      }}
    >
      {/* LEFT: App Name */}
      <div style={{ fontSize: "18px", fontWeight: "600" }}>
        Software Metrics Dashboard
      </div>

      {/* CENTER: Search */}
      <input
        type="text"
        placeholder="Search metrics / repo..."
        style={{
          width: "260px",
          padding: "6px 10px",
          borderRadius: "6px",
          border: darkMode ? "1px solid #334155" : "1px solid #cbd5f5",
          backgroundColor: darkMode ? "#020617" : "#ffffff",
          color: darkMode ? "#f8fafc" : "#020617",
          outline: "none",
        }}
      />

      {/* RIGHT: Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Repo Info */}
        <span style={{ fontSize: "13px", opacity: 0.85 }}>
          📦 Repo: <strong>Not Selected</strong>
        </span>

        {/* Notifications */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          🔔
          {notifications > 0 && (
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
              {notifications}
            </span>
          )}
        </div>

        {/* Dark / Light Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: "transparent",
            border: darkMode ? "1px solid #334155" : "1px solid #cbd5f5",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer",
            color: darkMode ? "#f8fafc" : "#020617",
          }}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* Logout */}
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
