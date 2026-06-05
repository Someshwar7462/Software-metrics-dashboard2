const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    users: 10,
    projects: 5,
    bugs: 2
  });
});

module.exports = router;