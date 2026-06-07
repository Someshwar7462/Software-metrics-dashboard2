import React from "react";
import { getInitials, hasProfileAvatar } from "../../utils/profileAvatar";

function ProfileAvatar({
  name,
  avatar,
  size = 36,
  darkMode = false,
  onClick,
  borderWidth = 2,
}) {
  const sharedStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    cursor: onClick ? "pointer" : "default",
    border: darkMode
      ? `${borderWidth}px solid #38bdf8`
      : `${borderWidth}px solid #2563eb`,
    flexShrink: 0,
  };

  if (hasProfileAvatar(avatar)) {
    return (
      <img
        src={avatar}
        alt="profile"
        onClick={onClick}
        style={{
          ...sharedStyle,
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      style={{
        ...sharedStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: darkMode ? "#1e3a8a" : "#2563eb",
        color: "#ffffff",
        fontWeight: "600",
        fontSize: `${Math.max(12, size * 0.34)}px`,
        userSelect: "none",
      }}
      aria-label="Profile"
    >
      {getInitials(name)}
    </div>
  );
}

export default ProfileAvatar;
