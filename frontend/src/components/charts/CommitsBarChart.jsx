import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { COMMITS_DATA } from "../../utils/constants";
import { useTheme } from "../../context/ThemeContext";

function CommitsBarChart({ data = COMMITS_DATA }) {
  const { darkMode } = useTheme();

  const textColor = darkMode ? "#f8fafc" : "#020617";
  const gridColor = darkMode ? "#334155" : "#e5e7eb";

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            stroke={textColor}
            angle={data.length > 6 ? -35 : 0}
            textAnchor={data.length > 6 ? "end" : "middle"}
            height={data.length > 6 ? 60 : 30}
            tick={{ fontSize: data.length > 6 ? 10 : 12 }}
            interval={data.length > 12 ? 1 : 0}
          />
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
      </ResponsiveContainer>
    </div>
  );
}

export default CommitsBarChart;
