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

function TestCoverageLineChart() {
  return (
    <LineChart width={400} height={250} data={TEST_COVERAGE_DATA}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
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
