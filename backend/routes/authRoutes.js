const express = require("express");
const {
  signup,
  login,
  getProfile,
  updateProfile,
  forgotPassword,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/me", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;
