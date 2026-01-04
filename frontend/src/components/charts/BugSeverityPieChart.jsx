import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { BUG_SEVERITY_DATA } from "../../utils/constants";

const COLORS = ["#ef4444", "#f59e0b", "#10b981"];

function BugSeverityPieChart() {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={BUG_SEVERITY_DATA}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      >
        {BUG_SEVERITY_DATA.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

export default BugSeverityPieChart;
