// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  content: String,   // ✅ renamed
  image: String,     // ✅ new field
}, { timestamps: true });

export default mongoose.model("Post", postSchema);