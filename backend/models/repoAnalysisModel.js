const mongoose = require("mongoose");

const repoAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    repoInfo: {
      name: { type: String, required: true },
      url: { type: String, required: true },
      branch: { type: String, default: "main" },
      visibility: { type: String, default: "Public" },
      language: { type: String, default: "N/A" },
      lastSynced: { type: String, default: "Just now" },
    },
    metrics: {
      commits: { type: Number, default: 0 },
      criticalBugs: { type: Number, default: 0 },
      majorBugs: { type: Number, default: 0 },
      testCoverage: { type: Number, default: 0 },
      buildStatus: { type: String, default: "N/A" },
    },
    chartData: {
      testCoverageHistory: [
        {
          month: String,
          coverage: Number,
        },
      ],
      monthlyCommits: [
        {
          month: String,
          commits: Number,
        },
      ],
      bugSeverity: [
        {
          name: String,
          value: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

repoAnalysisSchema.index({ user: 1, "repoInfo.url": 1 }, { unique: true });

module.exports = mongoose.model("RepoAnalysis", repoAnalysisSchema);
