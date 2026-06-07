import React from "react";
import { useTheme } from "../../context/ThemeContext";

function ActionableInsights({ metrics }) {
  const { darkMode } = useTheme();

  const headingColor = darkMode ? "#f8fafc" : "#020617";
  const textColor = darkMode ? "#e5e7eb" : "#475569";

  const { criticalBugs, majorBugs, testCoverage, buildStatus } = metrics;

  const insights = [];

  if (criticalBugs > 0) {
    insights.push({
      level: "critical",
      message: "Fix critical bugs before next release",
    });
  }

  if (testCoverage < 80) {
    insights.push({
      level: "warning",
      message: "Improve test coverage above 80%",
    });
  }

  if (majorBugs > 5) {
    insights.push({
      level: "warning",
      message: "Review unresolved major bugs",
    });
  }

  if (buildStatus !== "PASS") {
    insights.push({
      level: "critical",
      message: "Build is failing, fix pipeline issues",
    });
  }

  if (insights.length === 0) {
    insights.push({
      level: "healthy",
      message: "Project looks healthy. No immediate action required",
    });
  }

  const getIcon = (level) => {
    if (level === "critical") return "🔴";
    if (level === "warning") return "🟡";
    return "🟢";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
      }}
    >
      <h3
        style={{
          margin: "0 0 10px",
          fontSize: "18px",
          fontWeight: "600",
          color: headingColor,
          flexShrink: 0,
        }}
      >
        Actionable Insights
      </h3>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          paddingRight: "4px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            margin: "0 0 12px",
            color: textColor,
            lineHeight: "1.5",
          }}
        >
          Key observations from your project metrics. Addressing these improves
          code quality, stability, and release confidence.
        </p>

        <ul
          style={{
            paddingLeft: "18px",
            margin: "0 0 14px",
            fontSize: "14px",
            lineHeight: "1.6",
            color: textColor,
          }}
        >
          {insights.map((item, index) => (
            <li key={index} style={{ marginBottom: "6px" }}>
              {getIcon(item.level)} {item.message}
            </li>
          ))}
        </ul>

        <p
          style={{
            margin: 0,
            fontSize: "13px",
            lineHeight: "1.5",
            color: textColor,
          }}
        >
          <strong>Why this matters:</strong> Resolving high-severity issues early
          prevents production failures, improves team velocity, and ensures
          smoother deployments.
        </p>
      </div>
    </div>
  );
}

export default ActionableInsights;
