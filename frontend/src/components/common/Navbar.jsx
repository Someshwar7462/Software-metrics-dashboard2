import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  const [user, setUser] = useState({
    name: "Someshwar Gupta",
    username: "someshwar_01",
    email: "someshwar@gmail.com",
    phone: "9876543210",
    avatar: "https://i.pravatar.cc/150",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUser({ ...user, avatar: url });
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        style={{
          height: "64px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: darkMode ? "#020617" : "#ffffff",
          borderBottom: darkMode
            ? "1px solid #1e293b"
            : "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ color: darkMode ? "#f8fafc" : "#020617" }}>
          Software Metrics Dashboard
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: darkMode
                ? "1px solid #334155"
                : "1px solid #cbd5e1",
              background: "transparent",
              color: darkMode ? "#f8fafc" : "#020617",
              cursor: "pointer",
            }}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          {/* PROFILE */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <img
              src={user.avatar}
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
                  width: "220px",
                  backgroundColor: darkMode ? "#020617" : "#ffffff",
                  border: darkMode
                    ? "1px solid #1e293b"
                    : "1px solid #e5e7eb",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    padding: "14px",
                    borderBottom: darkMode
                      ? "1px solid #1e293b"
                      : "1px solid #e5e7eb",
                  }}
                >
                  <strong
                    style={{
                      color: darkMode ? "#f8fafc" : "#020617",
                    }}
                  >
                    {user.name}
                  </strong>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {user.email}
                  </div>
                </div>

                <DropdownItem
                  label="✏️ Edit Profile"
                  onClick={() => {
                    setShowModal(true);
                    setOpen(false);
                  }}
                  darkMode={darkMode}
                />

                <DropdownItem
                  label="🚪 Logout"
                  danger
                  onClick={handleLogout}
                  darkMode={darkMode}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {showModal && (
        <div style={overlay}>
          <div
            style={{
              width: "420px",
              padding: "24px",
              borderRadius: "14px",
              backgroundColor: darkMode ? "#020617" : "#ffffff",
              color: darkMode ? "#f8fafc" : "#020617",
            }}
          >
            <h3 style={{ marginBottom: "12px" }}>Edit Profile</h3>

   {/* PROFILE IMAGE SECTION */}
<div
  style={{
    display: "flex",
    flexDirection: "column",   // 🔑 MOST IMPORTANT
    alignItems: "center",
    marginBottom: "18px",
  }}
>
  {/* PROFILE IMAGE */}
  <img
    src={user.avatar}
    alt="profile"
    style={{
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #2563eb",
    }}
  />

  {/* CHANGE PHOTO — NOW JUST BELOW IMAGE */}
  <label
    style={{
      marginTop: "8px",          // 🔑 spacing below image
      fontSize: "14px",
      fontWeight: "500",
      color: darkMode ? "#38bdf8" : "#2563eb",
      cursor: "pointer",
    }}
  >
    Change Photo
    <input
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleImageUpload}
    />
  </label>
</div>



            {/* BASIC INFO */}
            {["name", "username", "email", "phone"].map((field) => (
              <div key={field}>
                <label style={labelStyle}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  value={user[field]}
                  onChange={handleChange}
                  style={inputStyle(darkMode)}
                />
              </div>
            ))}

            {/* PASSWORD SECTION (NEW – ONLY ADDITION) */}
            <hr style={{ margin: "16px 0", borderColor: "#334155" }} />

            <label style={labelStyle}>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={user.currentPassword}
              onChange={handleChange}
              style={inputStyle(darkMode)}
            />

            <label style={labelStyle}>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={user.newPassword}
              onChange={handleChange}
              style={inputStyle(darkMode)}
            />

            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              style={inputStyle(darkMode)}
            />

            <div style={{ textAlign: "right", marginTop: "12px" }}>
              <button onClick={() => setShowModal(false)} style={closeBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= STYLES ================= */

const DropdownItem = ({ label, onClick, danger, darkMode }) => (
  <div
    onClick={onClick}
    style={{
      padding: "10px 14px",
      cursor: "pointer",
      color: danger
        ? "#ef4444"
        : darkMode
        ? "#f8fafc"
        : "#020617",
    }}
  >
    {label}
  </div>
);

const overlay = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const labelStyle = {
  fontSize: "13px",
  color: "#94a3b8",
  display: "block",
  marginTop: "8px",
};

const inputStyle = (dark) => ({
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: dark ? "1px solid #334155" : "1px solid #cbd5e1",
  backgroundColor: dark ? "#020617" : "#ffffff",
  color: dark ? "#f8fafc" : "#020617",
});

const closeBtn = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

export default Navbar;
