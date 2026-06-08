const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));

app.get("/", (req, res) => {
  res.status(200).send("Backend Running 🚀");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/repos", require("./routes/repoRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    console.error("");
    console.error("Quick fixes:");
    console.error("1. Start local MongoDB: brew services start mongodb-community");
    console.error("2. Or allow your IP in MongoDB Atlas → Network Access");
    process.exit(1);
  }
};

startServer();
