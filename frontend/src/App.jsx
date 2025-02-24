import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import InfiniteScroll from "react-infinite-scroll-component";

// Connect to WebSocket Server
const socket = io("http://localhost:5000");

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem("search") || ""); // Persistent search state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Fetch stored news articles from backend (Ensuring uniqueness)
  const fetchArticles = async (pageNum) => {
    try {
      const res = await axios.get(`http://localhost:5000/articles?page=${pageNum}&limit=10`);
      const newArticles = res.data;

      if (newArticles.length === 0) setHasMore(false);

      setArticles((prev) => {
        // 🔥 Keep only unique articles
        const uniqueArticles = [...prev, ...newArticles].filter(
          (article, index, self) =>
            index === self.findIndex((a) => a._id === article._id)
        );
        return uniqueArticles;
      });

      setFilteredArticles((prev) => {
        const uniqueFiltered = [...prev, ...newArticles].filter(
          (article, index, self) =>
            index === self.findIndex((a) => a._id === article._id)
        );
        return uniqueFiltered;
      });
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  // ✅ Handle real-time updates via WebSockets (Avoiding duplicates)
  useEffect(() => {
    socket.on("new_article", (newArticle) => {
      setArticles((prev) => {
        const exists = prev.some((article) => article._id === newArticle._id);
        return exists ? prev : [newArticle, ...prev]; // 🔥 Add only if unique
      });

      setFilteredArticles((prev) => {
        const exists = prev.some((article) => article._id === newArticle._id);
        return exists ? prev : [newArticle, ...prev]; // 🔥 Add only if unique
      });
    });

    return () => socket.off("new_article");
  }, []);

  // ✅ Initial Load (Fetch stored news)
  useEffect(() => {
    fetchArticles(1);
  }, []);

  // ✅ Fetch next set of articles (Infinite Scroll)
  const loadMoreArticles = async () => {
    await fetchArticles(page + 1);
    setPage((prev) => prev + 1); // 🔥 Ensure page increments correctly
  };

  // ✅ Filter articles based on search (State/City)
  useEffect(() => {
    localStorage.setItem("search", search); // Store search term in localStorage

    if (!search) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.state.toLowerCase().includes(search.toLowerCase()) ||
          article.city.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [search, articles]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        📰 AI-Powered News Feed
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search by state or city..."
          className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* News Articles List */}
      <InfiniteScroll
        dataLength={filteredArticles.length}
        next={loadMoreArticles}
        hasMore={hasMore}
        loader={<h4 className="text-center text-gray-500">Loading more news...</h4>}
      >
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article._id} className="bg-white p-5 mb-4 rounded-lg shadow-md border">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-3">{article.content}</p>
              <p className="text-sm text-gray-500">
                📍 {article.city || ""}, {article.state || ""}
              </p>
              <a
                href={article.url}
                className="text-blue-600 font-semibold hover:underline mt-2 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More →
              </a>
            </div>
          ))
        ) : (
          <h4 className="text-center text-gray-500">No news articles available.</h4>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default App;
