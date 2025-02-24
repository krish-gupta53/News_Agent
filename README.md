📌 README.md - AI-Powered News Aggregator
📰 AI-Powered News Aggregator
An AI-driven news aggregator that fetches real-time news, summarizes articles using AI, and updates autonomously every 10 minutes.

🚀 Features
✅ Real-time News Fetching - Uses a cron job to fetch the latest news every 10 minutes.
✅ AI-Powered Summarization - Summarizes news using AI (Google Gemini).
✅ Infinite Scroll - View more articles as you scroll down.
✅ Live Updates - WebSocket integration for instant news updates.
✅ Search by State/City - Filter news by location.

⚡ Tech Stack
Frontend (React)
React.js
Axios (API calls)
Tailwind CSS (UI styling)
Socket.io-client (Real-time updates)
Backend (Node.js + Express)
Express.js (API framework)
MongoDB + Mongoose (Database)
Node-cron (Automated news fetching)
Axios (Fetching news from external API)
Socket.io (Real-time updates)
🔧 Setup Instructions
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/your-repo.git
cd your-repo
⚙️ Backend Setup
2️⃣ Install Dependencies
bash
Copy
Edit
cd backend
npm install
3️⃣ Set Up Environment Variables
Create a .env file inside the backend folder and add:

ini
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
GNEWS_API_KEY=your_gnews_api_key
4️⃣ Start the Backend Server
bash
Copy
Edit
npm start
✅ The server will run on http://localhost:5000.
✅ Cron jobs will automatically fetch news every 10 minutes and store it in MongoDB.

💻 Frontend Setup
5️⃣ Install Dependencies
bash
Copy
Edit
cd frontend
npm install
6️⃣ Set Up Environment Variables (Optional)
If using environment variables for the frontend, create a .env file:

ini
Copy
Edit
REACT_APP_BACKEND_URL=http://localhost:5000
7️⃣ Start the Frontend
bash
Copy
Edit
npm start
✅ The app will open on http://localhost:3000.

🚀 Deployment Instructions
Backend (Deployed on Koyeb)
1️⃣ Go to Koyeb Dashboard
2️⃣ Set Environment Variables (MONGODB_URI, GOOGLE_GEMINI_API_KEY, GNEWS_API_KEY)
3️⃣ Build Command: npm install
4️⃣ Run Command: npm start
5️⃣ Deploy and get your API URL (Example: https://your-app.koyeb.app)

Frontend (Deployed on Vercel/Netlify)
1️⃣ Install Vercel or Netlify CLI (Optional)

bash
Copy
Edit
npm install -g vercel
2️⃣ Deploy using Vercel (Recommended)

bash
Copy
Edit
vercel --prod
✅ Now your app is live!
