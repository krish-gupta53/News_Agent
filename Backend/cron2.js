const cron = require("node-cron");
const processWithAI = require("./utils/aiProcessor"); // AI Summarization
const extractLocationAI = require("./utils/locationProcessor"); // AI Location Extraction
const Article = require("./models/Article");

cron.schedule("*/5 * * * *", async () => {
  console.log("🤖 Checking for unprocessed articles...");

  try {
    const unprocessedArticles = await Article.find({ isUpdated: false });

    if (unprocessedArticles.length === 0) {
      console.log("⚠️ No articles need AI processing.");
      return;
    }

    for (let article of unprocessedArticles) {
      // 🔥 AI generates news summary
      const aiSummary = await processWithAI(article.content);

      // 📍 AI extracts state & city
      const { state, city } = await extractLocationAI(article.content);

      // ✅ Update the article in the database
      await Article.findByIdAndUpdate(article._id, {
        content: aiSummary,
        isUpdated: true, // ✅ AI processing done
        state: state || "", 
        city: city || "", 
      });
    }

    console.log(`✅ AI processed ${unprocessedArticles.length} articles & extracted locations.`);
  } catch (error) {
    console.error("❌ Error in AI processing:", error);
  }
});
