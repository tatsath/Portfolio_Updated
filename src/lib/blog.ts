import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description?: string;
  author?: string | string[];
  categories?: string[];
  content: string;
  mathjax?: boolean;
  showToc?: boolean;
  draft?: boolean;
  lastmod?: string;
  image?: string;
}

function getBlogDirectory(): string {
  const possiblePaths = [
    path.join(process.cwd(), "content/blog"),
    path.join(process.cwd(), "../content/blog"),
  ];

  for (const blogPath of possiblePaths) {
    if (fs.existsSync(blogPath)) {
      return blogPath;
    }
  }

  return path.join(process.cwd(), "content/blog");
}

const blogDirectory = getBlogDirectory();

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = getAllMarkdownFiles(blogDirectory);

  const posts = fileNames
    .map((fileName) => {
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      if (data.draft === true || data.draft === "True" || data.Draft === true) {
        return null;
      }

      const title = data.title || "";
      if (!title || title.toLowerCase() === "untitled") {
        return null;
      }

      const slug = generateSlug(fileName);

      return {
        slug,
        title: title,
        date: data.date || new Date().toISOString(),
        description: data.description,
        author: data.author,
        categories: Array.isArray(data.categories)
          ? data.categories
          : data.categories
            ? [data.categories]
            : [],
        content,
        mathjax: data.mathjax === true || data.mathjax === "True",
        showToc: data.ShowToc === true || data.ShowToc === "True",
        draft: data.draft === true || data.draft === "True",
        lastmod: data.lastmod,
        image: data.image || data.featuredImage,
      } as BlogPost;
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(blogDirectory)) {
    return null;
  }

  const fileNames = getAllMarkdownFiles(blogDirectory);

  for (const fileName of fileNames) {
    const fileSlug = generateSlug(fileName);
    if (fileSlug === slug) {
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const title = data.title || "";
      if (!title || title.toLowerCase() === "untitled") {
        return null;
      }

      return {
        slug,
        title: title,
        date: data.date || new Date().toISOString(),
        description: data.description,
        author: data.author,
        categories: Array.isArray(data.categories)
          ? data.categories
          : data.categories
            ? [data.categories]
            : [],
        content,
        mathjax: data.mathjax === true || data.mathjax === "True",
        showToc: data.ShowToc === true || data.ShowToc === "True",
        draft: data.draft === true || data.draft === "True",
        lastmod: data.lastmod,
        image: data.image || data.featuredImage,
      } as BlogPost;
    }
  }

  return null;
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(
    (post) =>
      post.categories &&
      post.categories.some(
        (cat) => cat.toLowerCase() === category.toLowerCase(),
      ),
  );
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set<string>();

  allPosts.forEach((post) => {
    if (post.categories) {
      post.categories.forEach((cat) => categories.add(cat));
    }
  });

  return Array.from(categories).sort();
}

export function generateSlug(filename: string): string {
  return filename.replace(/\.md$/, "").toLowerCase();
}

function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== "categories" && file !== "year-one" && file !== "Archive") {
        getAllMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith(".md") && file !== "_index.md") {
      const relativePath = path.relative(blogDirectory, filePath);
      fileList.push(relativePath);
    }
  });

  return fileList;
}

