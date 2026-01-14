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
    {/* TITLE */}
    <h3
      style={{
        marginBottom: "16px",
        fontSize: "22px",
        fontWeight: "600",
        color: headingColor,
      }}
    >
      Actionable Insights
    </h3>

    {/* OVERALL NOTE */}
    <p
      style={{
        fontSize: "16px",
        marginBottom: "18px",
        color: textColor,
        lineHeight: "1.6",
      }}
    >
      Below are the key observations derived from your project metrics.
      Addressing these points will significantly improve code quality,
      stability, and release confidence.
    </p>

    {/* INSIGHTS */}
    <ul
      style={{
        paddingLeft: "20px",
        fontSize: "17px",
        lineHeight: "2",
        color: textColor,
        marginBottom: "24px",
      }}
    >
      <li>🔴 <strong>Fix critical bugs</strong> before the next release cycle</li>
      <li>🟡 <strong>Improve test coverage</strong> to at least <b>80%</b></li>
      <li>🟠 <strong>Review unresolved major bugs</strong> to reduce technical debt</li>
    </ul>

    {/* EXTRA GUIDANCE */}
    <p
  style={{
    marginTop: "14px",
    fontSize: "15px",
    lineHeight: "1.6",
    color: textColor,
  }}
>
  <strong>Why this matters:</strong> Resolving high-severity issues early
  prevents production failures, improves team velocity, and ensures smoother
  deployments. Consistent monitoring of these insights helps maintain long-term
  software health.
</p>

  </div>
);

}

export default ActionableInsights;
