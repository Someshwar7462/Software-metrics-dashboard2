import React from "react";
import { useTheme } from "../../context/ThemeContext";

function ActionableInsights() {
  const { darkMode } = useTheme();

  // 🔹 Dummy values (later backend se aayenge)
  const criticalBugs = 4;
  const majorBugs = 6;
  const testCoverage = 78;

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "14px",
        backgroundColor: darkMode ? "#020617" : "#ffffff",
        border: darkMode ? "1px solid #1e293b" : "1px solid #e5e7eb",
        height: "100%",
      }}
    >
      <h3
        style={{
          marginBottom: "12px",
          color: darkMode ? "#f8fafc" : "#020617",
        }}
      >
        Actionable Insights
      </h3>

      <ul style={{ paddingLeft: "18px", fontSize: "14px" }}>
        {criticalBugs > 0 && (
          <li style={{ marginBottom: "8px" }}>
            ⚠ Fix <strong>critical bugs</strong> before next release
          </li>
        )}

        {testCoverage < 80 && (
          <li style={{ marginBottom: "8px" }}>
            📉 Improve test coverage above <strong>80%</strong>
          </li>
        )}

        {majorBugs > 5 && (
          <li style={{ marginBottom: "8px" }}>
            🕒 Review unresolved <strong>major bugs</strong>
          </li>
        )}

        {criticalBugs === 0 && testCoverage >= 80 && (
          <li>✅ Project quality looks stable</li>
        )}
      </ul>
    </div>
  );
}

export default ActionableInsights;
