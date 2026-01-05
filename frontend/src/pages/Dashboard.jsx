import React from "react";

//Navbar
import Navbar from "../components/common/Navbar";


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
    <div style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      {/* NAVBAR ONLY */}
      <Navbar />

    <div
      style={{
        padding: "30px",
        backgroundColor: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      {/* ================= PAGE TITLE ================= */}
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}>
        Software Metrics Dashboard
      </h1>

      {/* ================= OVERVIEW SECTION ================= */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>Overview</h2>

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
            color={item.color}
            icon={item.icon}
            subtitle={item.subtitle}
           />

          ))}
        </div>
      </section>

      {/* ================= TRENDS SECTION ================= */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>Quality Trends</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Test Coverage Trend</h3>
            <TestCoverageLineChart />
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Commits Per Month</h3>
            <CommitsBarChart />
          </div>
        </div>
      </section>

      {/* ================= ANALYSIS SECTION ================= */}
      <section>
        <h2 style={{ marginBottom: "20px" }}>Defect Analysis</h2>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "fit-content",
          }}
        >
          <h3>Bug Severity Distribution</h3>
          <BugSeverityPieChart />
        </div>
      </section>
    </div>
    </div>
  );
}

export default Dashboard;
