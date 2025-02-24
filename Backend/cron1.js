const cron = require("node-cron");
const axios = require("axios");
const Article = require("./models/Article");

// Function to fetch news from API and store it in MongoDB
async function fetchNews() {
  console.log("🔄 Fetching latest news from API...");

  try {
    const response = await axios.get(`https://gnews.io/api/v4/top-headlines?country=in&token=${process.env.GNEWS_API_KEY}`);
    const articles = response.data.articles.slice(0, 10); // Fetch max 10 articles

    if (articles.length === 0) {
      console.log("⚠️ No new articles found.");
      return;
    }

    for (let article of articles) {
      const existingArticle = await Article.findOne({ title: article.title });
      if (!existingArticle) {
        await Article.create({
          title: article.title,
          content: article.description,
          url: article.url,
          state: "India",
          city: "",
          timestamp: new Date(),
          isUpdated: false,
          send: false,
        });
      }
    }

    console.log(`✅ Fetched & stored ${articles.length} new articles.`);
  } catch (error) {
    console.error("❌ Error fetching news:", error.response?.data || error.message);
  }
}

// Function to load articles from MongoDB on server start
async function loadStoredArticles() {
  console.log("🔄 Loading stored news from MongoDB...");
  try {
    const articles = await Article.find().sort({ timestamp: -1 }).limit(10); // Load latest 10 articles
    if (articles.length === 0) {
      console.log("⚠️ No articles found in database.");
    } else {
      console.log(`✅ Loaded ${articles.length} articles from database.`);
    }
  } catch (error) {
    console.error("❌ Error loading news from database:", error);
  }
}

// 🔄 Run the cron job every 5 minutes to fetch new news
cron.schedule("*/5 * * * *", fetchNews);

// 🚀 On server start, load articles from MongoDB instead of calling the API
(async () => {
  console.log("🚀 Server started. Loading news from database...");
  await loadStoredArticles();
})();
