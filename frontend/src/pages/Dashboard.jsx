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
        <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "32px" }}>
          Software Metrics Dashboard
        </h1>

        {/* OVERVIEW */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={sectionTitle}>Overview</h2>

          <div style={grid4}>
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

        {/* QUALITY TRENDS */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={sectionTitle}>Quality Trends</h2>

          <div style={grid2}>
            <div style={card}>
              <h3 style={cardTitle}>Test Coverage</h3>
              <TestCoverageLineChart />
            </div>

            <div style={card}>
              <h3 style={cardTitle}>Commits</h3>
              <CommitsBarChart />
            </div>
          </div>
        </section>

        {/* DEFECT ANALYSIS */}
        <section>
          <h2 style={sectionTitle}>Defect Analysis</h2>

          <div style={{ ...card, width: "fit-content" }}>
            <h3 style={cardTitle}>Bug Severity</h3>
            <BugSeverityPieChart />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---- styles ---- */

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "20px",
};

const grid4 = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const card = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "12px",
};

const cardTitle = {
  fontSize: "15px",
  fontWeight: "600",
  marginBottom: "10px",
};

export default Dashboard;
