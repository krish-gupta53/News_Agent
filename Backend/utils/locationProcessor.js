const axios = require("axios");
require("dotenv").config();

async function extractLocationAI(text) {
  if (!text || text.length < 20) {
    return { state: "India", city: "" };
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a location extraction assistant. Your task is to extract the **state** and **city** (if available) from the given news article.
                       
                       - If the article mentions a **specific Indian state**, return that as the state.
                       - If the article mentions a **specific city**, return that as the city.
                       - If no city is mentioned, leave it empty.
                       - If no state is mentioned, leave it empty.
                       
                       you have to read the article and then think what can be the state and city according to the article.
                       then respond it. there might be more than 1 state or city , but you have to pick atmost 1 city and 1 state.
                       you just have to respond the way i shown below.

                       Example -
                       article: today there's an big new that the famous actor balwant singh got died due to heart attack. 
                       he was living with his family in delhi. its a sensitive news and police researching it.

                       think: so as you can see there is a word delhi in the article which is a state , so you have to response delhi, but there is no city name
                       in the article you keep it blank in the response.

                       Response:
                       State: Delhi
                       City: 
                       
                       Here is the news article:
                       
                       "${text}"
                       
                       Extract the location now:`
              }
            ]
          }
        ]
      }
    );

    // Parse AI response
    const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text.trim() || "";
    const stateMatch = aiResponse.match(/State: (.+)/i);
    const cityMatch = aiResponse.match(/City: (.+)/i);

    return {
      state: stateMatch ? stateMatch[1].trim() : "",
      city: cityMatch ? cityMatch[1].trim() : ""
    };
  } catch (error) {
    console.error("❌ AI Location Extraction Error:", error.response?.data || error.message);
    return { state: "", city: "" };
  }
}

module.exports = extractLocationAI;
