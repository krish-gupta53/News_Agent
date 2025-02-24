const axios = require("axios");
require("dotenv").config();

async function processWithAI(text) {
  if (!text || text.length < 20) {
    return "No significant content available for summarization.";
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a professional news summarizer. 
                      Your task is to generate **concise**, **factual**, and **neutral** summaries for news articles. 
                      The summary should:
                      - contain keywords which help in increasing the SEO optimization.
                      - Capture the main event or topic of the article.
                      - Provide only **key facts** (who, what, when, where, why, how).
                      - Exclude unnecessary opinions, speculations, or extra details.
                      - Be **under 50 to 70 words** (4-5 sentences max).

                      Let me provide you an example article and the response-
                      
                      
                      Here is the article to summarize:
                      
                      "${text}"
                      
                      Please generate the summary now:`
              }
            ]
          }
        ]
      }
    );

    return response.data.candidates[0]?.content?.parts[0]?.text.trim() || "Summary unavailable.";
  } catch (error) {
    console.error("❌ AI Processing Error:", error.response?.data || error.message);
    return "AI failed to generate a summary.";
  }
}

module.exports = processWithAI;
