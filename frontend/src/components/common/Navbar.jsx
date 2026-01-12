import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      {/* CENTER */}
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
          outline: "none",
        }}
      />

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "13px", opacity: 0.85 }}>
          📦 Repo: <strong>Not Selected</strong>
        </span>

        {/* Theme Toggle */}
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

        {/* PROFILE */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            onClick={() => setOpen(!open)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              cursor: "pointer",
              border: darkMode
                ? "2px solid #38bdf8"
                : "2px solid #2563eb",
            }}
          />

          {open && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "46px",
                width: "160px",
                backgroundColor: darkMode ? "#020617" : "#ffffff",
                border: darkMode
                  ? "1px solid #1e293b"
                  : "1px solid #e5e7eb",
                borderRadius: "10px",
                boxShadow: darkMode
                  ? "0 10px 30px rgba(0,0,0,0.6)"
                  : "0 10px 20px rgba(0,0,0,0.15)",
                overflow: "hidden",
                zIndex: 100,
              }}
            >
              <DropdownItem label="✏️ Edit Profile" />
              <Divider darkMode={darkMode} />
              <DropdownItem label="🚪 Logout" danger />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* --- helpers --- */

function DropdownItem({ label, danger }) {
  return (
    <div
      style={{
        padding: "10px 14px",
        fontSize: "14px",
        cursor: "pointer",
        color: danger ? "#ef4444" : "inherit",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(0,0,0,0.05)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "transparent")
      }
    >
      {label}
    </div>
  );
}

function Divider({ darkMode }) {
  return (
    <div
      style={{
        height: "1px",
        backgroundColor: darkMode ? "#1e293b" : "#e5e7eb",
      }}
    />
  );
}

export default Navbar;
