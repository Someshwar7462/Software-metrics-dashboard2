import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";
import { BUG_SEVERITY_DATA } from "../../utils/constants";

const COLORS = ["#ef4444", "#f97316", "#22c55e"];

function BugSeverityPieChart({ data = BUG_SEVERITY_DATA }) {
  const { darkMode } = useTheme();

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
            labelStyle={{
              fill: darkMode ? "#f8fafc" : "#020617",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`${value}`, name]}
            contentStyle={{
              backgroundColor: darkMode ? "#020617" : "#ffffff",
              color: darkMode ? "#f8fafc" : "#020617",
              border: "1px solid #334155",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BugSeverityPieChart;
