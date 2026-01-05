import React from "react";

function MetricCard({ title, value, color, icon, subtitle }) {
  return (
    <div
      style={{
        backgroundColor: color,
        padding: "20px",
        borderRadius: "12px",
        color: "white",
        boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 10px 20px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 15px rgba(0,0,0,0.15)";
      }}
    >
      {/* Icon */}
      <div style={{ fontSize: "32px", marginBottom: "10px" }}>
        {icon}
      </div>

      {/* Title */}
      <p style={{ opacity: 0.9 }}>{title}</p>

      {/* Value */}
      <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
        {value}
      </h2>

      {/* Subtitle */}
      <p style={{ fontSize: "13px", opacity: 0.85 }}>
        {subtitle}
      </p>
    </div>
  );
}

export default MetricCard;
