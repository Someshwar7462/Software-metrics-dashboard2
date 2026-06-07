const RepoAnalysis = require("../models/repoAnalysisModel");

const formatAnalysis = (doc) => ({
  id: doc._id,
  repoInfo: doc.repoInfo,
  metrics: doc.metrics,
  chartData: doc.chartData,
  analyzedAt: doc.updatedAt,
});

exports.saveAnalysis = async (req, res) => {
  try {
    const { repoInfo, metrics, chartData } = req.body;

    if (!repoInfo?.url || !repoInfo?.name) {
      return res
        .status(400)
        .json({ message: "Repository info with name and URL is required" });
    }

    const analysis = await RepoAnalysis.findOneAndUpdate(
      {
        user: req.userId,
        "repoInfo.url": repoInfo.url,
      },
      {
        user: req.userId,
        repoInfo: {
          ...repoInfo,
          lastSynced: "Just now",
        },
        metrics,
        chartData,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(201).json({
      message: "Repository analysis saved successfully",
      analysis: formatAnalysis(analysis),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to save repository analysis",
    });
  }
};

exports.getLatestAnalysis = async (req, res) => {
  try {
    const analysis = await RepoAnalysis.findOne({ user: req.userId }).sort({
      updatedAt: -1,
    });

    if (!analysis) {
      return res.status(404).json({ message: "No repository analysis found" });
    }

    res.json(formatAnalysis(analysis));
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch repository analysis",
    });
  }
};

exports.getUserAnalyses = async (req, res) => {
  try {
    const analyses = await RepoAnalysis.find({ user: req.userId })
      .sort({ updatedAt: -1 })
      .select("repoInfo metrics updatedAt");

    res.json(
      analyses.map((item) => ({
        id: item._id,
        repoInfo: item.repoInfo,
        metrics: item.metrics,
        analyzedAt: item.updatedAt,
      }))
    );
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch repository history",
    });
  }
};
