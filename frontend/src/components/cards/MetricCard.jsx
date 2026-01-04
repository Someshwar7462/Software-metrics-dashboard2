import React from "react";

function MetricCard({ title, value, color, icon }) {
  return (
    <div
      style={{
        background: color,
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ fontSize: "30px" }}>{icon}</div>
      <p style={{ marginTop: "10px", opacity: 0.9 }}>{title}</p>
      <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>
        {value}
      </h2>
    </div>
  );
}

export default MetricCard;
