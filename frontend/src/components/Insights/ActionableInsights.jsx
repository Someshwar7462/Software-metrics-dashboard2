import React from "react";
import { useTheme } from "../../context/ThemeContext";

function ActionableInsights({ metrics }) {
  const { darkMode } = useTheme();

  const headingColor = darkMode ? "#f8fafc" : "#020617";
  const textColor = darkMode ? "#e5e7eb" : "#475569";

  const {
    criticalBugs,
    majorBugs,
    testCoverage,
    buildStatus,
    commits,
  } = metrics;

  const insights = [];

  // 🔴 Critical bugs rule
  if (criticalBugs > 0) {
    insights.push({
      level: "critical",
      message: "Fix critical bugs before next release",
    });
  }

  // 🟡 Test coverage rule
  if (testCoverage < 80) {
    insights.push({
      level: "warning",
      message: "Improve test coverage above 80%",
    });
  }

  // 🟡 Major bugs rule
  if (majorBugs > 5) {
    insights.push({
      level: "warning",
      message: "Review unresolved major bugs",
    });
  }

  // 🔴 Build failed rule
  if (buildStatus !== "PASS") {
    insights.push({
      level: "critical",
      message: "Build is failing, fix pipeline issues",
    });
  }

  // 🟢 Healthy case
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
    <div>
      <h3 style={{ marginBottom: "16px", color: headingColor }}>
        Actionable Insights
      </h3>

      <ul
        style={{
          paddingLeft: "20px",
          fontSize: "15px",
          lineHeight: "1.8",
          color: textColor,
        }}
      >
        {insights.map((item, index) => (
          <li key={index}>
            {getIcon(item.level)} {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActionableInsights;
