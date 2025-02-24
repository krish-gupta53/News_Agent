const socketIo = require("socket.io");

module.exports = (server) => {
  const io = socketIo(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("⚡ Client connected to WebSocket");

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected");
    });
  });

  return io;
};
