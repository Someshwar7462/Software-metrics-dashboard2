import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  const [user, setUser] = useState({
    name: "Someshwar Gupta",
    username: "someshwar_01",
    email: "someshwar@gmail.com",
    phone: "9876543210",
    profilePic: "https://i.pravatar.cc/100",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  // ✅ Profile image upload (ONLY from Edit Profile)
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setUser({ ...user, profilePic: previewURL });
  };

  return (
    <>
      {/* NAVBAR */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "64px",
          zIndex: 9999,
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
        <div style={{ fontSize: "18px", fontWeight: 600 }}>
          Software Metrics Dashboard
        </div>

        {/* <input placeholder="Search metrics..." style={inputStyle(darkMode)} /> */}

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* <span style={{ fontSize: "13px" }}>
            📦 Repo: <strong>Not Selected</strong>
          </span> */}

          <button onClick={toggleTheme} style={themeBtn(darkMode)}>
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          {/* PROFILE AVATAR (ONLY DROPDOWN) */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <img
              src={user.profilePic}
              alt="profile"
              onClick={() => setOpen(!open)}
              style={avatarStyle(darkMode)}
            />

            {open && (
              <div style={dropdownStyle(darkMode)}>
                <div style={userInfoStyle(darkMode)}>
                  <strong>{user.name}</strong>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>
                    {user.email}
                  </div>
                </div>

                <DropdownItem
                  label="✏️ Edit Profile"
                  onClick={() => {
                    setShowModal(true);
                    setOpen(false);
                  }}
                />
                <Divider darkMode={darkMode} />
                <DropdownItem label="🚪 Logout" danger />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* EDIT PROFILE MODAL */}
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle(darkMode)}>
            <h3 style={{ marginBottom: "12px" }}>Edit Profile</h3>

            {/* PROFILE IMAGE + UPLOAD */}
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <img
                src={user.profilePic}
                alt="profile"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: darkMode
                    ? "2px solid #38bdf8"
                    : "2px solid #2563eb",
                }}
              />

              <label
                style={{
                  display: "block",
                  marginTop: "8px",
                  fontSize: "13px",
                  color: "#2563eb",
                  cursor: "pointer",
                }}
              >
                Change Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            <Label>Full Name</Label>
            <input
              name="name"
              value={user.name}
              onChange={handleChange}
              style={modalInput(darkMode)}
            />

            <Label>Username</Label>
            <input
              name="username"
              value={user.username}
              onChange={handleChange}
              style={modalInput(darkMode)}
            />

            <Label>Email</Label>
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              style={modalInput(darkMode)}
            />

            <Label>Phone</Label>
            <input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              style={modalInput(darkMode)}
            />

            <hr
              style={{
                margin: "12px 0",
                border: "none",
                borderTop: darkMode
                  ? "1px solid #334155"
                  : "1px solid #e5e7eb",
              }}
            />

            <Label>Current Password</Label>
            <input
              type="password"
              name="currentPassword"
              value={user.currentPassword}
              onChange={handleChange}
              style={modalInput(darkMode)}
            />

            <Label>New Password</Label>
            <input
              type="password"
              name="newPassword"
              value={user.newPassword}
              onChange={handleChange}
              style={modalInput(darkMode)}
            />

            <Label>Confirm Password</Label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              style={modalInput(darkMode)}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "12px",
              }}
            >
              <button onClick={() => setShowModal(false)} style={cancelBtn}>
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} style={saveBtn}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- STYLES ---------- */

const Label = ({ children }) => {
  const { darkMode } = useTheme();
  return (
    <label
      style={{
        fontSize: "13px",
        marginTop: "8px",
        display: "block",
        color: darkMode ? "#cbd5f5" : "#334155",
      }}
    >
      {children}
    </label>
  );
};

const inputStyle = (dark) => ({
  width: "220px",
  padding: "6px 10px",
  borderRadius: "6px",
  border: dark ? "1px solid #334155" : "1px solid #cbd5e1",
  backgroundColor: dark ? "#020617" : "#ffffff",
  color: dark ? "#f8fafc" : "#020617",
});

const themeBtn = (dark) => ({
  padding: "6px 10px",
  borderRadius: "6px",
  border: dark ? "1px solid #334155" : "1px solid #cbd5e1",
  background: "transparent",
  cursor: "pointer",
  color: dark ? "#f8fafc" : "#020617",
});

const avatarStyle = (dark) => ({
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  cursor: "pointer",
  border: dark ? "2px solid #38bdf8" : "2px solid #2563eb",
});

const dropdownStyle = (dark) => ({
  position: "absolute",
  right: 0,
  top: "46px",
  width: "220px",
  backgroundColor: dark ? "#020617" : "#ffffff",
  border: dark ? "1px solid #1e293b" : "1px solid #e5e7eb",
  borderRadius: "12px",
});

const userInfoStyle = (dark) => ({
  padding: "14px",
  borderBottom: dark ? "1px solid #1e293b" : "1px solid #e5e7eb",
});

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10000,
};

const modalStyle = (dark) => ({
  width: "420px",
  backgroundColor: dark ? "#020617" : "#ffffff",
  color: dark ? "#f8fafc" : "#020617",
  padding: "24px",
  borderRadius: "14px",
  marginTop: "64px",
});

const modalInput = (dark) => ({
  width: "100%",
  padding: "8px",
  marginBottom: "6px",
  borderRadius: "6px",
  border: dark ? "1px solid #334155" : "1px solid #cbd5e1",
  backgroundColor: dark ? "#020617" : "#ffffff",
  color: dark ? "#f8fafc" : "#020617",
});

const cancelBtn = {
  padding: "8px 14px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
};

const saveBtn = {
  padding: "8px 14px",
  borderRadius: "6px",
  border: "none",
  background: "#2563eb",
  color: "white",
};

function DropdownItem({ label, danger, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px 14px",
        cursor: "pointer",
        color: danger ? "#ef4444" : "inherit",
      }}
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
