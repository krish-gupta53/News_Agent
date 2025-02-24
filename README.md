📌 README.md - AI-Powered News Aggregator
📰 AI-Powered News Aggregator
An AI-driven news aggregator that fetches real-time news, summarizes articles using AI, and updates autonomously every 5 minutes.

🚀 Features
✅ Real-time News Fetching - Uses a cron job to fetch the latest news every 10 minutes.
✅ AI-Powered Summarization - Summarizes news using AI (Google Gemini).
✅ Infinite Scroll - View more articles as you scroll down.
✅ Live Updates - WebSocket integration for instant news updates.
✅ Search by State/City - Filter news by location.

⚡ Tech Stack
Frontend (vite+React)
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
cd backend
npm install
3️⃣ Set Up Environment Variables
Create a .env file inside the backend folder and add:
ini
MONGODB_URI=your_mongodb_connection_string
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
GNEWS_API_KEY=your_gnews_api_key
4️⃣ Start the Backend Server
npm start
✅ The server will run on http://localhost:5000.
✅ Cron jobs will automatically fetch news every 10 minutes and store it in MongoDB.

💻 Frontend Setup
5️⃣ Install Dependencies
cd frontend
npm install
6️⃣ Set Up Environment Variables (Optional)
If using environment variables for the frontend, create a .env file:
ini
REACT_APP_BACKEND_URL=http://localhost:5000
7️⃣ Start the Frontend
npm start
✅ The app will open on http://localhost:5173.

Not able to deploy yet due to the paid version of hosting services but the video link is here - https://drive.google.com/file/d/1h7LnDy46ufxDy7Cb9xwTg3TuzZrH523c/view?usp=drivesdk
