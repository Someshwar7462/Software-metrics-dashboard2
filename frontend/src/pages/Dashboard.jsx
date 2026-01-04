import React from "react";

// KPI Card
import MetricCard from "../components/cards/MetricCard";

// Charts
import BugSeverityPieChart from "../components/charts/BugSeverityPieChart";
import TestCoverageLineChart from "../components/charts/TestCoverageLineChart";
import CommitsBarChart from "../components/charts/CommitsBarChart";

// Dummy Data
import { DASHBOARD_KPI_DATA } from "../utils/constants";

function Dashboard() {
  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      {/* ================= TITLE ================= */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        Software Metrics Dashboard
      </h1>

      {/* ================= KPI CARDS ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {DASHBOARD_KPI_DATA.map((item, index) => (
          <MetricCard
            key={index}
            title={item.title}
            value={item.value}
            color={item.color}
            icon={item.icon}
          />
        ))}
      </div>

      {/* ================= CHARTS SECTION ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {/* Bug Severity Pie Chart */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>
            Bug Severity Distribution
          </h3>
          <BugSeverityPieChart />
        </div>

        {/* Test Coverage Line Chart */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>
            Test Coverage Trend
          </h3>
          <TestCoverageLineChart />
        </div>

        {/* Commits Bar Chart */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            gridColumn: "1 / span 2", // full width
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>
            Commits Per Month
          </h3>
          <CommitsBarChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
