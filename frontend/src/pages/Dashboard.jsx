import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useTheme } from "../context/ThemeContext";

import MetricCard from "../components/cards/MetricCard";
import TestCoverageLineChart from "../components/charts/TestCoverageLineChart";
import CommitsBarChart from "../components/charts/CommitsBarChart";
import BugSeverityPieChart from "../components/charts/BugSeverityPieChart";
import ActionableInsights from "../components/insights/ActionableInsights";
import {
  TEST_COVERAGE_DATA,
  COMMITS_DATA,
  BUG_SEVERITY_DATA,
} from "../utils/constants";

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

  /* ================= SAFE LOCAL STORAGE READ ================= */

  const storedData = JSON.parse(localStorage.getItem("selectedRepo")) || {};

  const selectedRepo = storedData.repoInfo || {
    name: "No repository selected",
    url: "",
    branch: "-",
    visibility: "-",
    language: "-",
    lastSynced: "-",
  };

  const metricsData = storedData.metrics || {
    criticalBugs: 0,
    majorBugs: 0,
    testCoverage: 0,
    buildStatus: "N/A",
    commits: 0,
  };

  const chartData = storedData.chartData || {};
  const testCoverageHistory = chartData.testCoverageHistory || TEST_COVERAGE_DATA;
  const monthlyCommits = chartData.monthlyCommits || COMMITS_DATA;
  const bugSeverity = chartData.bugSeverity || BUG_SEVERITY_DATA;

  /* ================= KPI DATA (NOW DYNAMIC) ================= */

  const DASHBOARD_KPI_DATA = [
    {
      title: "Critical Bugs",
      value: metricsData.criticalBugs,
      subtitle: "High priority issues",
      color: "#dc2626",
    },
    {
      title: "Major Bugs",
      value: metricsData.majorBugs,
      subtitle: "Needs attention",
      color: "#f97316",
    },
    {
      title: "Test Coverage",
      value: `${metricsData.testCoverage}%`,
      subtitle: "Code covered by tests",
      color: "#2563eb",
    },
    {
      title: "Commits",
      value: metricsData.commits,
      subtitle: "Total commits",
      color: "#16a34a",
    },
  ];

  /* =========================================================== */

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
      <Navbar />

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
          <div>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Repository Name
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: textColor,
              }}
            >
              {selectedRepo.name}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Repository URL
            </div>
            <a
              href={selectedRepo.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "14px",
                color: "#2563eb",
                textDecoration: "none",
                wordBreak: "break-all",
              }}
            >
              {selectedRepo.url}
            </a>
            <div
  style={{
    fontSize: "14px",
    marginTop: "6px",
    color: darkMode ? "#cbd5e1" : "#334155",
  }}
>
  Branch: <strong>{selectedRepo.branch}</strong>
</div>

          </div>

          <div style={{ fontSize: "14px", color: "#64748b" }}>
            <div>Visibility: {selectedRepo.visibility}</div>
            <div>Language: {selectedRepo.language}</div>
            <div>Last synced: {selectedRepo.lastSynced}</div>
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

        {/* CHARTS (UNCHANGED) */}
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
              <TestCoverageLineChart data={testCoverageHistory} />
            </div>

            <div style={cardStyle}>
              <h3 style={{ marginBottom: "12px", color: textColor }}>
                Commits
              </h3>
              <CommitsBarChart data={monthlyCommits} />
            </div>
          </div>
        </section>

        {/* BUG SEVERITY + INSIGHTS (UNCHANGED) */}
        <section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            <div style={{ ...cardStyle, height: "360px" }}>
              <h3 style={{ marginBottom: "12px", color: textColor }}>
                Bug Severity
              </h3>
              <BugSeverityPieChart data={bugSeverity} />
            </div>

            <div style={{ ...cardStyle, height: "360px" }}>
              <ActionableInsights metrics={metricsData} />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
