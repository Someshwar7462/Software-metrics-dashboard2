const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  saveAnalysis,
  getLatestAnalysis,
  getUserAnalyses,
} = require("../controllers/repoController");

const router = express.Router();

router.post("/analyze", protect, saveAnalysis);
router.get("/latest", protect, getLatestAnalysis);
router.get("/history", protect, getUserAnalyses);

module.exports = router;
