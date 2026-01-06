import React from "react";
import Navbar from "../components/common/Navbar";
import { useTheme } from "../context/ThemeContext";
import MetricCard from "../components/cards/MetricCard";
import BugSeverityPieChart from "../components/charts/BugSeverityPieChart";
import TestCoverageLineChart from "../components/charts/TestCoverageLineChart";
import CommitsBarChart from "../components/charts/CommitsBarChart";
import { DASHBOARD_KPI_DATA } from "../utils/constants";

function Dashboard() {
  const { darkMode } = useTheme();

  const bg = darkMode ? "#020617" : "#f1f5f9";
  const cardBg = darkMode ? "#020617" : "#ffffff";
  const border = darkMode ? "1px solid #1e293b" : "none";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bg }}>
      <Navbar />

      <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            marginBottom: "32px",
            color: darkMode ? "#f8fafc" : "#020617",
          }}
        >
          Software Metrics Dashboard
        </h1>

        {/* KPI */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
            {DASHBOARD_KPI_DATA.map((item, index) => (
              <MetricCard
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>

        {/* Charts */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={{ background: cardBg, padding: "20px", borderRadius: "12px", border }}>
              <h3>Test Coverage</h3>
              <TestCoverageLineChart />
            </div>

            <div style={{ background: cardBg, padding: "20px", borderRadius: "12px", border }}>
              <h3>Commits</h3>
              <CommitsBarChart />
            </div>
          </div>
        </section>

        <section>
          <div style={{ background: cardBg, padding: "20px", borderRadius: "12px", border, width: "fit-content" }}>
            <h3>Bug Severity</h3>
            <BugSeverityPieChart />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
