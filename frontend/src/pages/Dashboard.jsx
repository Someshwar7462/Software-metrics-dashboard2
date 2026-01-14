import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useTheme } from "../context/ThemeContext";

import MetricCard from "../components/cards/MetricCard";
import TestCoverageLineChart from "../components/charts/TestCoverageLineChart";
import CommitsBarChart from "../components/charts/CommitsBarChart";
import BugSeverityPieChart from "../components/charts/BugSeverityPieChart";
import ActionableInsights from "../components/insights/ActionableInsights";

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

  // 🔹 Dummy metrics data (unchanged)
  const metricsData = {
    criticalBugs: 4,
    majorBugs: 6,
    testCoverage: 75,
    buildStatus: "PASS",
    commits: 148,
  };

  // 🔹 Repository context (UPDATED – still dummy, safe)
  const selectedRepo = {
    owner: "someshwar",
    name: "software-metrics-dashboard",
    branch: "main",
    visibility: "Public",
    lastSynced: "2 hours ago",
    language: "Java",
    url: "https://github.com/someshwar/software-metrics-dashboard",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: pageBg,
        paddingTop: "64px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px",
          width: "100%",
          flex: 1,
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            marginBottom: "16px",
            color: textColor,
          }}
        >
          Software Metrics Dashboard
        </h1>

       {/* REPOSITORY CONTEXT */}
<div
  style={{
    marginBottom: "36px",
    padding: "22px 28px",
    borderRadius: "16px",
    backgroundColor: darkMode ? "#020617" : "#ffffff",
    border: darkMode ? "1px solid #1e293b" : "1px solid #e5e7eb",
    display: "grid",
    gridTemplateColumns: "2.5fr 3.5fr 2fr",
    gap: "28px",
    alignItems: "center",
  }}
>
  {/* LEFT: REPO NAME */}
  <div>
    <div
      style={{
        fontSize: "13px",
        color: darkMode ? "#94a3b8" : "#64748b",
        marginBottom: "6px",
      }}
    >
      Repository Name
    </div>

    <div
      style={{
        fontSize: "20px",
        fontWeight: "600",
        color: darkMode ? "#f8fafc" : "#020617",
      }}
    >
      {selectedRepo.name}
    </div>
  </div>

  {/* CENTER: URL + BRANCH */}
  <div>
    <div
      style={{
        fontSize: "13px",
        color: darkMode ? "#94a3b8" : "#64748b",
        marginBottom: "6px",
      }}
    >
      Repository URL
    </div>

    <a
      href={selectedRepo.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: "14px",
        color: darkMode ? "#38bdf8" : "#2563eb",
        textDecoration: "none",
        wordBreak: "break-all",
        display: "block",
        marginBottom: "6px",
      }}
    >
      {selectedRepo.url}
    </a>

    <div
      style={{
        fontSize: "14px",
        color: darkMode ? "#94a3b8" : "#64748b",
      }}
    >
      Branch: <strong>{selectedRepo.branch}</strong>
    </div>
  </div>

  {/* RIGHT: META */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      fontSize: "14px",
      color: darkMode ? "#94a3b8" : "#64748b",
    }}
  >
    <span>🔓 Visibility: {selectedRepo.visibility}</span>
    <span>💻 Language: {selectedRepo.language}</span>
    <span>⏱ Last synced: {selectedRepo.lastSynced}</span>
  </div>
</div>



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
            <div style={cardStyle}>
              <h3 style={{ marginBottom: "12px", color: textColor }}>
                Test Coverage
              </h3>
              <TestCoverageLineChart />
            </div>

            <div style={cardStyle}>
              <h3 style={{ marginBottom: "12px", color: textColor }}>
                Commits
              </h3>
              <CommitsBarChart />
            </div>
          </div>
        </section>

        {/* BUG SEVERITY + INSIGHTS */}
        <section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            <div
              style={{
                ...cardStyle,
                height: "360px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 style={{ marginBottom: "12px", color: textColor }}>
                Bug Severity
              </h3>
              <BugSeverityPieChart />
            </div>

            <div style={{ ...cardStyle, height: "360px" }}>
              <ActionableInsights metrics={metricsData} />
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Dashboard;
