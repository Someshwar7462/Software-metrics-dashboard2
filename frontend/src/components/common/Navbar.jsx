import React from "react";

function Navbar() {
  return (
    <div
      style={{
        height: "64px",
        backgroundColor: "#0f172a", // dark navy
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      {/* Left: Project Name */}
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
        Software Metrics Dashboard
      </div>

      {/* Right: User actions (future-ready) */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "14px", opacity: 0.9 }}>
          👤 Guest User
        </span>
        <button
          style={{
            backgroundColor: "#334155",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
