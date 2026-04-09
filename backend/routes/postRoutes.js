// routes/postRoutes.js
import express from "express";
import axios from "axios";
import Post from "../models/Post.js";

const router = express.Router();

// Fetch and store enriched posts
router.get("/fetch-posts", async (req, res) => {
  try {
    const existing = await Post.countDocuments();
    if (existing > 0) {
      return res.json({ message: "Posts already exist" });
    }

    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");

    // ✅ Enrich data
    const enrichedPosts = data.map((post) => ({
      userId: post.userId,
      id: post.id,
      title: post.title,
      content: post.body, // 🔥 rename here
      image: `https://picsum.photos/seed/${post.id}/600/300`, // unique image
    }));

    await Post.insertMany(enrichedPosts);

    res.json({ message: "Enriched posts stored successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Get single post
router.get("/:id", async (req, res) => {
  const post = await Post.findOne({ id: req.params.id });
  res.json(post);
});

export default router;