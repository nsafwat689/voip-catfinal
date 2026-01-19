import express from "express";
import { createServer } from "http";
import { serveStatic } from "./vite";

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files and handle routing
  serveStatic(app);

  const port = process.env.PORT || 3e3;
  server.listen(port, () => {
    console.log(` Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
