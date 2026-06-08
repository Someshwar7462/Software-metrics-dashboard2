const mongoose = require("mongoose");

const LOCAL_FALLBACK_URI =
  process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/metrics_db";

const connectOptions = {
  serverSelectionTimeoutMS: 10000,
};

let activeDbLabel = "none";

const getActiveDbLabel = () => activeDbLabel;

const connectWithUri = async (uri, label) => {
  const connection = await mongoose.connect(uri, connectOptions);
  activeDbLabel = label;
  console.log(
    `MongoDB Connected ✅ [${label}] (${connection.connection.host}/${connection.connection.name})`
  );
  return connection;
};

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const primaryUri = process.env.MONGO_URI;
  const atlasUri = process.env.MONGO_ATLAS_URI || primaryUri;
  const localUri = LOCAL_FALLBACK_URI;

  const isLocalUri = (uri) =>
    uri && (uri.includes("127.0.0.1") || uri.includes("localhost"));

  if (primaryUri && isLocalUri(primaryUri)) {
    return connectWithUri(primaryUri, "local");
  }

  if (atlasUri && !isLocalUri(atlasUri)) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await connectWithUri(atlasUri, "Atlas");
      } catch (atlasError) {
        console.warn(`⚠️  Atlas attempt ${attempt}/3 failed`);
        if (attempt === 3) {
          console.warn("⚠️  Atlas error:", atlasError.message.split("\n")[0]);
        } else {
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    }

    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }

  console.warn("⚠️  Falling back to local MongoDB...");
  console.warn(
    "⚠️  If your account was created earlier, it may be in Atlas cloud DB."
  );
  console.warn(
    "⚠️  Fix Atlas: Network Access → Add IP → Allow access from anywhere (0.0.0.0/0)"
  );

  return connectWithUri(localUri, "local fallback");
};

const isDbConnected = () => mongoose.connection.readyState === 1;
const isUsingLocalFallback = () => activeDbLabel === "local fallback";

module.exports = connectDB;
module.exports.isDbConnected = isDbConnected;
module.exports.getActiveDbLabel = getActiveDbLabel;
module.exports.isUsingLocalFallback = isUsingLocalFallback;
