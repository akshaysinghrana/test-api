import mongoose from "mongoose";

const ArticleSourceSchema = new mongoose.Schema({
  id: { type: String, required: false },
  name: { type: String, required: true },
});

const ArticleSchema = new mongoose.Schema({
  source: { type: ArticleSourceSchema, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  content: { type: String, required: true },
});

const NewsResponseSchema = new mongoose.Schema(
  {
    articles: { type: [ArticleSchema], required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("NewsResponse", NewsResponseSchema);
