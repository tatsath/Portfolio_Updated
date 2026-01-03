import { getAllAIPosts, getAllAICategories } from "@/lib/ai-interpretability";
import BlogClient from "./BlogClient";

export default function AIPage() {
  // Load data at build time (server-side)
  const allPosts = getAllAIPosts();
  const categories = getAllAICategories();

  return <BlogClient initialPosts={allPosts} initialCategories={categories} />;
}
