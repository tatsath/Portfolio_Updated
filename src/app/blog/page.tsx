import { getAllPosts, getAllCategories } from "@/lib/blog";
import AIClient from "./AIClient";

export default function BlogPage() {
  // Load data at build time (server-side)
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  return <AIClient initialPosts={allPosts} initialCategories={categories} />;
}
