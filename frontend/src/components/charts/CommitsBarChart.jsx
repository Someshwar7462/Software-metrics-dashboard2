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

function CommitsBarChart() {
  return (
    <BarChart width={400} height={250} data={COMMITS_DATA}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="commits" fill="#8b5cf6" />
    </BarChart>
  );
}

export default CommitsBarChart;
