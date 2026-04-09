// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";

import postRoutes from "./routes/postRoutes.js";
import Post from "./models/Post.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create HTTP server
const server = http.createServer(app);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// REST routes
app.use("/api/posts", postRoutes);

// ✅ WebSocket setup
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

    ws.on("message", async (message) => {
    const query = message.toString().trim();

    if (!query) {
        const posts = await Post.find().limit(20);
        return ws.send(JSON.stringify(posts));
    }

    const regex = query;

    const results = await Post.aggregate([
        {
        $addFields: {
            score: {
            $cond: [
                { $regexMatch: { input: "$title", regex: `^${query}`, options: "i" } },
                3, // title starts with query
                {
                $cond: [
                    { $regexMatch: { input: "$title", regex, options: "i" } },
                    2, // title contains query
                    {
                    $cond: [
                        { $regexMatch: { input: "$content", regex, options: "i" } },
                        1, // content match
                        0
                    ]
                    }
                ]
                }
            ]
            }
        }
        },
        {
        $match: {
            score: { $gt: 0 }
        }
        },
        {
        $sort: { score: -1 } // 🔥 sort by relevance
        },
        {
        $limit: 10
        }
    ]);

    ws.send(JSON.stringify(results));
    });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});