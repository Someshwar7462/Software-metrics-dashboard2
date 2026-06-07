import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profileForm, setProfileForm] = useState(null);
  const [profileError, setProfileError] = useState("");
  const [saving, setSaving] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    if (user && showModal) {
      setProfileForm({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "https://i.pravatar.cc/150",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setProfileError("");
    }
  }, [user, showModal]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!profileForm) return;

    if (
      profileForm.newPassword &&
      profileForm.newPassword !== profileForm.confirmPassword
    ) {
      setProfileError("New passwords do not match");
      return;
    }

    setSaving(true);
    setProfileError("");

    try {
      await updateProfile({
        name: profileForm.name,
        username: profileForm.username,
        email: profileForm.email,
        phone: profileForm.phone,
        avatar: profileForm.avatar,
        currentPassword: profileForm.currentPassword || undefined,
        newPassword: profileForm.newPassword || undefined,
      });

      setShowModal(false);
    } catch (err) {
      setProfileError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
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

          <div ref={dropdownRef} style={{ position: "relative" }}>
            <img
              src={user.avatar || "https://i.pravatar.cc/150"}
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
                objectFit: "cover",
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

      {showModal && profileForm && (
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

            {profileError && (
              <p style={{ color: "#ef4444", marginBottom: "12px", fontSize: "14px" }}>
                {profileError}
              </p>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <img
                src={profileForm.avatar}
                alt="profile"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #2563eb",
                }}
              />

              <label
                style={{
                  marginTop: "8px",
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

            {["name", "username", "email", "phone"].map((field) => (
              <div key={field}>
                <label style={labelStyle}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  value={profileForm[field]}
                  onChange={handleChange}
                  style={inputStyle(darkMode)}
                />
              </div>
            ))}

            <hr style={{ margin: "16px 0", borderColor: "#334155" }} />

            <label style={labelStyle}>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={profileForm.currentPassword}
              onChange={handleChange}
              style={inputStyle(darkMode)}
            />

            <label style={labelStyle}>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={profileForm.newPassword}
              onChange={handleChange}
              style={inputStyle(darkMode)}
            />

            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={profileForm.confirmPassword}
              onChange={handleChange}
              style={inputStyle(darkMode)}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "12px",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={secondaryBtn}
                disabled={saving}
              >
                Close
              </button>
              <button
                onClick={handleSaveProfile}
                style={closeBtn}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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

const secondaryBtn = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  background: "transparent",
  color: "#64748b",
  cursor: "pointer",
};

export default Navbar;
