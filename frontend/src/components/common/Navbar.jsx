import React from "react";

function Navbar() {
  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "#020617",
        color: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: "1px solid #1e293b",
      }}
    >
      {/* LEFT: App Name */}
      <div style={{ fontSize: "18px", fontWeight: "600" }}>
        Software Metrics Dashboard
      </div>

      {/* RIGHT: Project related info & actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "14px",
        }}
      >
        {/* Repo Info */}
        <span style={{ opacity: 0.9 }}>
          📦 Repo: <strong>Not Selected</strong>
        </span>

        {/* Last Analysis */}
        <span style={{ opacity: 0.8 }}>
          ⏱ Last Analysis: --
        </span>

        {/* Actions */}
        <button style={actionBtn}>🔄 Re-analyze</button>
        <button style={actionBtn}>📥 Change Repo</button>
        <button style={{ ...actionBtn, borderColor: "#ef4444", color: "#ef4444" }}>
          🚪 Logout
        </button>
      </div>
    </header>
  );
}

const actionBtn = {
  background: "transparent",
  border: "1px solid #334155",
  color: "#e2e8f0",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export default Navbar;
