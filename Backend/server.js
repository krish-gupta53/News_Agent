require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Ensures it's connected before starting cron jobs)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected Successfully");

  // ✅ Start Cron Jobs Only After MongoDB is Connected
  require("./cron1"); // Fetch News
  require("./cron2"); // AI Processing
  require("./cron3"); // Send AI-Processed Articles

  // ✅ Start WebSocket & Server
  const server = require("http").createServer(app);
  const io = require("./socket")(server);

  // ✅ API Routes
  app.use("/articles", require("./routes/articles"));

  // ✅ Start Express Server
  const PORT = process.env.PORT;
  server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

})
.catch(err => console.error("❌ MongoDB Connection Error:", err));
