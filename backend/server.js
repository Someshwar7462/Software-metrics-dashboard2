const express = require("express");
require("dotenv").config();   // ✅ MUST
const cors = require("cors");

const app = express();

const connectDB = require("./config/db");
connectDB();

app.use("/api/dashboard", require("./routes/dashboardRoutes"));
// Middleware
app.use(cors());
app.use(express.json());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.status(200).send("Backend Running 🚀");
});

// IMPORTANT: bind to 127.0.0.1
const PORT = 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});