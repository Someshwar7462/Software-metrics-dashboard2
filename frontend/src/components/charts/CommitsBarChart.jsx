import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { COMMITS_DATA } from "../../utils/constants";
import { useTheme } from "../../context/ThemeContext";

function CommitsBarChart() {
  const { darkMode } = useTheme();

  const textColor = darkMode ? "#f8fafc" : "#020617";
  const gridColor = darkMode ? "#334155" : "#e5e7eb";

  return (
    <BarChart width={380} height={240} data={COMMITS_DATA}>
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
      <Bar dataKey="commits" fill="#8b5cf6" />
    </BarChart>
  );
}

export default CommitsBarChart;
