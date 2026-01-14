import React from "react";
import { useTheme } from "../../context/ThemeContext";

function ActionableInsights() {
  const { darkMode } = useTheme();

  const headingColor = darkMode ? "#f8fafc" : "#020617";
  const textColor = darkMode ? "#e5e7eb" : "#475569";
  const highlightColor = darkMode ? "#ffffff" : "#020617";

  return (
    <div>
      {/* TITLE */}
      <h3
        style={{
          marginBottom: "16px",
          color: headingColor,
        }}
      >
        Actionable Insights
      </h3>

      {/* LIST */}
      <ul
        style={{
          paddingLeft: "20px",
          lineHeight: "1.8",
          fontSize: "15px",
          color: textColor,
        }}
      >
        <li>
          ⚠️{" "}
          <strong style={{ color: highlightColor }}>
            Fix critical bugs
          </strong>{" "}
          before next release
        </li>

        <li>
          📈 Improve test coverage above{" "}
          <strong style={{ color: highlightColor }}>80%</strong>
        </li>

        <li>
          🕒 Review unresolved{" "}
          <strong style={{ color: highlightColor }}>
            major bugs
          </strong>
        </li>
      </ul>
    </div>
  );
}

export default ActionableInsights;
