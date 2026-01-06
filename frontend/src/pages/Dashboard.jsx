import React from "react";
import Navbar from "../components/common/Navbar";
import MetricCard from "../components/cards/MetricCard";
import BugSeverityPieChart from "../components/charts/BugSeverityPieChart";
import TestCoverageLineChart from "../components/charts/TestCoverageLineChart";
import CommitsBarChart from "../components/charts/CommitsBarChart";
import { DASHBOARD_KPI_DATA } from "../utils/constants";

function Dashboard() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      <Navbar />

      <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* PAGE TITLE */}
        <h1 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "6px" }}>
          Software Metrics Dashboard
        </h1>
        <p style={{ color: "#64748b", marginBottom: "32px" }}>
          Centralized view of software quality and engineering metrics
        </p>

        {/* OVERVIEW */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Overview</h2>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            High-level summary of project quality indicators
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {DASHBOARD_KPI_DATA.map((item, index) => (
              <MetricCard
                key={index}
                title={item.title}
                value={item.value}
                subtitle={item.subtitle}
                color={item.color}
                icon={item.icon}
              />
            ))}
          </div>
        </section>

        <hr style={{ border: "1px solid #e2e8f0", marginBottom: "48px" }} />

        {/* QUALITY TRENDS */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
            Quality Trends
          </h2>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            Trends of test coverage and commit activity over time
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div style={cardStyle}>
              <h3 style={cardTitle}>Test Coverage (%) Over Time</h3>
              <TestCoverageLineChart />
            </div>

            <div style={cardStyle}>
              <h3 style={cardTitle}>Monthly Commit Count</h3>
              <CommitsBarChart />
            </div>
          </div>
        </section>

        <hr style={{ border: "1px solid #e2e8f0", marginBottom: "48px" }} />

        {/* DEFECT ANALYSIS */}
        <section>
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
            Defect Analysis
          </h2>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            Distribution of defects based on severity
          </p>

          <div style={{ ...cardStyle, width: "fit-content" }}>
            <h3 style={cardTitle}>Bug Severity Distribution</h3>
            <BugSeverityPieChart />
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: "64px",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          © 2026 Software Metrics Dashboard · Built with React
        </footer>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "12px",
};

const cardTitle = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "10px",
};

export default Dashboard;
