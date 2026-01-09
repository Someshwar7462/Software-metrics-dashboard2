import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useTheme } from "../../context/ThemeContext";

const data = [
  { name: "Critical", value: 4 },
  { name: "Major", value: 6 },
  { name: "Minor", value: 2 },
];

const COLORS = ["#ef4444", "#f97316", "#22c55e"];

function BugSeverityPieChart() {
  const { darkMode } = useTheme();

  return (
    <PieChart width={300} height={240}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>

      <Tooltip
        contentStyle={{
          backgroundColor: darkMode ? "#020617" : "#ffffff",
          border: "none",
          color: darkMode ? "#f8fafc" : "#020617",
        }}
      />
    </PieChart>
  );
}

export default BugSeverityPieChart;
