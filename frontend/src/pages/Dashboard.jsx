import React from "react";
import Navbar from "../components/common/Navbar";
import ActionableInsights from "../components/Insights/ActionableInsights";

import { useTheme } from "../context/ThemeContext";

import MetricCard from "../components/cards/MetricCard";
import TestCoverageLineChart from "../components/charts/TestCoverageLineChart";
import CommitsBarChart from "../components/charts/CommitsBarChart";
import BugSeverityPieChart from "../components/charts/BugSeverityPieChart";

import { DASHBOARD_KPI_DATA } from "../utils/constants";

function Dashboard() {
  const { darkMode } = useTheme();

  const pageBg = darkMode ? "#020617" : "#f1f5f9";
  const textColor = darkMode ? "#f8fafc" : "#020617";

  const cardStyle = {
    backgroundColor: darkMode ? "#020617" : "#ffffff",
    border: darkMode ? "1px solid #1e293b" : "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: darkMode
      ? "0 0 0 1px rgba(255,255,255,0.05)"
      : "0 6px 16px rgba(0,0,0,0.08)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "64px", // navbar height
        backgroundColor: pageBg,
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            marginBottom: "32px",
            color: textColor,
          }}
        >
          Software Metrics Dashboard
        </h1>

        {/* KPI CARDS */}
        <section style={{ marginBottom: "48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {DASHBOARD_KPI_DATA.map((item, index) => (
              <MetricCard key={index} {...item} />
            ))}
          </div>
        </section>

        {/* CHARTS */}
        <section style={{ marginBottom: "48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {/* TEST COVERAGE */}
            <div style={cardStyle}>
              <h3
                style={{
                  marginBottom: "12px",
                  color: textColor,
                }}
              >
                Test Coverage
              </h3>
              <TestCoverageLineChart />
            </div>

            {/* COMMITS */}
            <div style={cardStyle}>
              <h3
                style={{
                  marginBottom: "12px",
                  color: textColor,
                }}
              >
                Commits
              </h3>
              <CommitsBarChart />
            </div>
          </div>
        </section>

        {/* BUG SEVERITY */}
       {/* BUG SEVERITY + INSIGHTS */}
<section>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "420px 1fr",
      gap: "24px",
    }}
  >
    {/* LEFT: BUG SEVERITY (UNCHANGED) */}
    <div
      style={{
        ...cardStyle,
        height: "360px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3 style={{ marginBottom: "12px", color: textColor }}>
        Bug Severity
      </h3>
      <BugSeverityPieChart />
    </div>

    {/* RIGHT: ACTIONABLE INSIGHTS (NEW) */}
    <ActionableInsights />
  </div>
</section>


      </div>
    </div>
  );
}

export default Dashboard;
