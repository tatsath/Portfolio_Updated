import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { parseShortcodes } from "@/lib/shortcodes";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import "katex/dist/katex.min.css";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description || "Blog post by Hariom Tatsat",
    authors: Array.isArray(post.author)
      ? post.author.map((a) => ({ name: a }))
      : post.author
        ? [{ name: post.author }]
        : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-main)" }}
      >
        <div className="text-center">
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-headings)" }}
          >
            Post Not Found
          </h1>
          <Link
            href="/blog"
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: "var(--button-bg-light)",
              color: "var(--button-text-dark)",
            }}
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const processedContent = parseShortcodes(post.content);

  const generateId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // Extract explicit ID from heading text if present, return { text, id }
  const extractHeadingId = (text: string): { text: string; id: string } => {
    const idMatch = text.match(/\s*\{#([^}]+)\}$/);
    if (idMatch) {
      const cleanText = text.replace(/\s*\{#[^}]+\}$/, "").trim();
      return { text: cleanText, id: idMatch[1] };
    }
    return { text: text.trim(), id: generateId(text) };
  };

  const generateTOC = (content: string) => {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const headings: Array<{ level: number; text: string; id: string }> = [];
    const idCounts = new Map<string, number>();
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1]?.length || 0;
      let text = match[2] || "";
      
      // Strip out {#id} syntax from the text if present
      const idMatch = text.match(/\s*\{#([^}]+)\}$/);
      if (idMatch) {
        text = text.replace(/\s*\{#[^}]+\}$/, "").trim();
        // Use the explicit ID if provided
        const explicitId = idMatch[1];
        let id = explicitId;
        
        const count = idCounts.get(id) || 0;
        idCounts.set(id, count + 1);
        if (count > 0) {
          id = `${id}-${count}`;
        }
        
        headings.push({ level, text, id });
      } else {
        // No explicit ID, generate one from text
        let id = generateId(text);
        
        const count = idCounts.get(id) || 0;
        idCounts.set(id, count + 1);
        if (count > 0) {
          id = `${id}-${count}`;
        }
        
        headings.push({ level, text, id });
      }
    }

    return headings;
  };

  const toc = generateTOC(processedContent);
  const showTOC = toc.length > 0 && post.showToc !== false;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div
          className={`grid gap-12 ${
            showTOC ? "lg:grid-cols-[280px_1fr]" : "lg:grid-cols-1"
          }`}
        >
          {showTOC && (
            <aside className="hidden lg:block">
              <div
                className="sticky top-20 p-4 max-h-[calc(100vh-8rem)] overflow-y-auto"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderLeft: "1px solid var(--shadow-color)",
                }}
              >
                <h2
                  className="text-xs font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "var(--text-headings)" }}
                >
                  Table of Contents
                </h2>
                <nav>
                  <ul className="space-y-1">
                    {toc.map((heading) => {
                      const maxLength =
                        heading.level === 2
                          ? 50
                          : heading.level === 3
                            ? 40
                            : 30;
                      const displayText =
                        heading.text.length > maxLength
                          ? heading.text.substring(0, maxLength) + "..."
                          : heading.text;
                      return (
                        <li
                          key={heading.id}
                          className={`${
                            heading.level === 2
                              ? "ml-0 font-medium text-xs leading-tight"
                              : heading.level === 3
                                ? "ml-3 text-xs leading-tight"
                                : "ml-6 text-xs leading-tight"
                          }`}
                        >
                          <a
                            href={`#${heading.id}`}
                            className="block py-0.5 leading-tight break-words transition-colors hover:opacity-80"
                            style={{ color: "var(--text-secondary)" }}
                            title={heading.text}
                          >
                            {displayText}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>
          )}
          <div className="max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 mb-6 transition-colors hover:opacity-80"
              style={{ color: "var(--text-primary)" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {showTOC && (
              <div
                className="lg:hidden mb-8 p-4 rounded-lg"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--shadow-color)",
                }}
              >
                <h2
                  className="text-xs font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "var(--text-headings)" }}
                >
                  Table of Contents
                </h2>
                <nav>
                  <ul className="space-y-1">
                    {toc.map((heading) => {
                      const maxLength =
                        heading.level === 2
                          ? 50
                          : heading.level === 3
                            ? 40
                            : 30;
                      const displayText =
                        heading.text.length > maxLength
                          ? heading.text.substring(0, maxLength) + "..."
                          : heading.text;
                      return (
                        <li
                          key={heading.id}
                          className={`${
                            heading.level === 2
                              ? "ml-0 font-medium text-xs leading-tight"
                              : heading.level === 3
                                ? "ml-3 text-xs leading-tight"
                                : "ml-6 text-xs leading-tight"
                          }`}
                        >
                          <a
                            href={`#${heading.id}`}
                            className="block py-0.5 leading-tight break-words transition-colors hover:opacity-80"
                            style={{ color: "var(--text-secondary)" }}
                            title={heading.text}
                          >
                            {displayText}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            )}

            <article>
              <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories?.map((category) => (
                    <span
                      key={category}
                      className="rounded-full px-3 py-1 text-sm flex items-center gap-1"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <Tag className="h-3 w-3" />
                      {category}
                    </span>
                  ))}
                </div>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  style={{ color: "var(--text-headings)" }}
                >
                  {post.title}
                </h1>
                <div
                  className="flex flex-wrap gap-4 text-sm mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>
                {post.description && (
                  <p
                    className="text-lg mb-6"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {post.description}
                  </p>
                )}
                {post.image && (
                  <div className="mb-8 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </header>

              <div
                className="prose prose-lg max-w-none"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                  components={{
                    h1: () => null,
                    h2: ({ node, ...props }) => {
                      const rawText = props.children?.toString() || "";
                      const { text, id } = extractHeadingId(rawText);
                      return (
                        <h2
                          id={id}
                          className="text-2xl font-bold mt-12 mb-6 scroll-mt-20 first:mt-0"
                          style={{ color: "var(--text-headings)" }}
                          {...props}
                        >
                          {text}
                        </h2>
                      );
                    },
                    h3: ({ node, ...props }) => {
                      const rawText = props.children?.toString() || "";
                      const { text, id } = extractHeadingId(rawText);
                      return (
                        <h3
                          id={id}
                          className="text-xl font-bold mt-8 mb-4 scroll-mt-20"
                          style={{ color: "var(--text-headings)" }}
                          {...props}
                        >
                          {text}
                        </h3>
                      );
                    },
                    h4: ({ node, ...props }) => {
                      const rawText = props.children?.toString() || "";
                      const { text, id } = extractHeadingId(rawText);
                      return (
                        <h4
                          id={id}
                          className="text-lg font-bold mt-6 mb-3 scroll-mt-20"
                          style={{ color: "var(--text-headings)" }}
                          {...props}
                        >
                          {text}
                        </h4>
                      );
                    },
                    code: ({ node, className, children, ...props }) => (
                      <code
                        className={`${className} px-1 py-0.5 rounded text-sm`}
                        style={{
                          backgroundColor: "var(--bg-card)",
                        }}
                        {...props}
                      >
                        {children}
                      </code>
                    ),
                    pre: ({ node, ...props }) => (
                      <pre
                        className="p-4 rounded-lg overflow-x-auto my-4"
                        style={{
                          backgroundColor: "var(--bg-card)",
                        }}
                        {...props}
                      />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        className="hover:underline"
                        style={{ color: "var(--accent-primary)" }}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    img: ({ node, src, alt, ...props }) => (
                      <img
                        src={src || ""}
                        alt={alt || ""}
                        className="max-w-full h-auto rounded-lg my-4"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p
                        className="mb-4 leading-relaxed"
                        style={{ color: "var(--text-primary)" }}
                        {...props}
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc list-inside mb-4 space-y-2"
                        style={{ color: "var(--text-primary)" }}
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal list-inside mb-4 space-y-2"
                        style={{ color: "var(--text-primary)" }}
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li style={{ color: "var(--text-primary)" }} {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 pl-4 my-4 italic"
                        style={{
                          borderColor: "var(--accent-primary)",
                          color: "var(--text-secondary)",
                        }}
                        {...props}
                      />
                    ),
                  }}
                >
                  {processedContent}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}

