const mongoose = require("mongoose");

const isDbConnected = () => mongoose.connection.readyState === 1;

const handleDbError = (res, error, fallbackMessage) => {
  if (
    !isDbConnected() ||
    error.name === "MongooseError" ||
    error.message?.includes("buffering timed out")
  ) {
    return res.status(503).json({
      message:
        "Database is unavailable. Please restart the backend server and try again.",
    });
  }

  return res.status(500).json({
    message: error.message || fallbackMessage,
  });
};

module.exports = { handleDbError, isDbConnected };
