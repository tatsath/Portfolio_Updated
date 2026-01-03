"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import type { BlogPost } from "@/lib/blog";
import Header from "@/components/Header";

interface AIClientProps {
  initialPosts: BlogPost[];
  initialCategories: string[];
}

function AIContent({
  initialPosts,
  initialCategories,
}: AIClientProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get("category") || null;

  const posts = useMemo(() => {
    if (!selectedCategory) return initialPosts;
    return initialPosts.filter(
      (post) =>
        post.categories &&
        post.categories.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase(),
        ),
    );
  }, [initialPosts, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12" style={{ paddingTop: "100px" }}>
        <div className="mb-8 md:mb-12">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--text-headings)" }}
          >
            Blog
          </h1>
          <p
            className="text-lg max-w-3xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Articles, thoughts, and writings on Physics, philosophy, and hard things that matter.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {initialCategories.length > 0 && (
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h2
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Filter By
                </h2>
                <nav className="space-y-2">
                  <Link
                    href="/blog"
                    className={`block px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                      !selectedCategory
                        ? "text-white"
                        : "hover:text-white"
                    }`}
                    style={{
                      backgroundColor: !selectedCategory
                        ? "var(--accent-primary)"
                        : "transparent",
                      color: !selectedCategory
                        ? "var(--button-text-dark)"
                        : "var(--text-secondary)",
                    }}
                  >
                    All Posts
                  </Link>
                  {initialCategories.map((category) => {
                    const isSelected =
                      selectedCategory?.toLowerCase() ===
                      category.toLowerCase();
                    return (
                      <Link
                        key={category}
                        href={`/blog?category=${encodeURIComponent(category)}`}
                        className={`block px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                          isSelected ? "text-white" : "hover:text-white"
                        }`}
                        style={{
                          backgroundColor: isSelected
                            ? "var(--accent-primary)"
                            : "transparent",
                          color: isSelected
                            ? "var(--button-text-dark)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {category}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>
          )}

          <div className="flex-1 min-w-0">
            <div className="space-y-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article
                    className="border-b pb-8 last:border-b-0 hover:opacity-80 transition-opacity cursor-pointer"
                    style={{
                      borderColor: "var(--shadow-color)",
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      {post.image && (
                        <div className="md:w-48 lg:w-56 xl:w-64 flex-shrink-0">
                          <div
                            className="aspect-video md:aspect-[4/3] rounded-lg overflow-hidden"
                            style={{
                              backgroundColor: "var(--bg-card)",
                              border: "1px solid var(--shadow-color)",
                            }}
                          >
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories?.map((category) => (
                            <span
                              key={category}
                              className="text-xs rounded-full px-3 py-1"
                              style={{
                                backgroundColor: "var(--bg-card)",
                                color: "var(--text-primary)",
                              }}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        <h2
                          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 hover:opacity-80 transition-colors"
                          style={{ color: "var(--text-headings)" }}
                        >
                          {post.title}
                        </h2>
                        {post.description && (
                          <p
                            className="mb-4 text-base leading-relaxed"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {post.description}
                          </p>
                        )}
                        <div
                          className="flex items-center gap-4 text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12">
                <p style={{ color: "var(--text-secondary)" }}>
                  No posts found.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AIClient(props: AIClientProps) {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "var(--bg-main)" }}
        >
          <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
        </div>
      }
    >
      <AIContent {...props} />
    </Suspense>
  );
}
