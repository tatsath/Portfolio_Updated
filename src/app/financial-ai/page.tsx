import { getAllFinancialAIPosts, getAllFinancialAICategories } from "@/lib/financial-ai";
import FinancialAIClient from "./FinancialAIClient";

export default function FinancialAIPage() {
  const allPosts = getAllFinancialAIPosts();
  const categories = getAllFinancialAICategories();

  return <FinancialAIClient initialPosts={allPosts} initialCategories={categories} />;
}
