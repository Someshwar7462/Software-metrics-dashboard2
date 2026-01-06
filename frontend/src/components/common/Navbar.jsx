import React from "react";

function Navbar() {
  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "#020617", // deep dark
        color: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        borderBottom: "1px solid #1e293b",
      }}
    >
      {/* LEFT: Brand */}
      <div
        style={{
          fontSize: "18px",
          fontWeight: "600",
          letterSpacing: "0.3px",
        }}
      >
        Software Metrics Dashboard
      </div>

      {/* RIGHT: User info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#334155",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          G
        </div>

        {/* Username */}
        <span
          style={{
            fontSize: "14px",
            opacity: 0.9,
          }}
        >
          Guest
        </span>

        {/* Logout */}
        <button
          style={{
            backgroundColor: "transparent",
            color: "#e2e8f0",
            border: "1px solid #334155",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#334155";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
