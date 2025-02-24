const cron = require("node-cron");
const Article = require("./models/Article");
const io = require("./socket"); // WebSockets

cron.schedule("*/5 * * * *", async () => {
  console.log("📡 Checking for new AI-processed articles to send...");

  try {
    const readyArticles = await Article.find({ isUpdated: true, send: false });

    if (readyArticles.length === 0) {
      console.log("⚠️ No new AI-processed articles to send.");
      return;
    }

    for (let article of readyArticles) {
      io.emit("new_article", article); // 🔥 Send only new articles to frontend
      await Article.findByIdAndUpdate(article._id, { send: true }); // ✅ Mark as sent
    }

    console.log(`✅ Sent ${readyArticles.length} new articles to frontend.`);
  } catch (error) {
    console.error("❌ Error sending articles:", error);
  }
});
