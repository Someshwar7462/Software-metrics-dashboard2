import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TEST_COVERAGE_DATA } from "../../utils/constants";
import { useTheme } from "../../context/ThemeContext";

function TestCoverageLineChart() {
  const { darkMode } = useTheme();

  const textColor = darkMode ? "#f8fafc" : "#020617";
  const gridColor = darkMode ? "#334155" : "#e5e7eb";

  return (
    <LineChart width={380} height={240} data={TEST_COVERAGE_DATA}>
      <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
      <XAxis dataKey="month" stroke={textColor} />
      <YAxis stroke={textColor} />
      <Tooltip
        contentStyle={{
          backgroundColor: darkMode ? "#020617" : "#ffffff",
          border: "none",
          color: textColor,
        }}
      />
      <Line
        type="monotone"
        dataKey="coverage"
        stroke="#3b82f6"
        strokeWidth={3}
      />
    </LineChart>
  );
}

export default TestCoverageLineChart;
