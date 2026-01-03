# Portfolio Website with Blog

A Next.js portfolio website with blog and AI interpretability sections.

## Prerequisites

- Node.js 18+ and npm
- Git (for cloning)

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd Portfolio_updated
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This installs:
   - Next.js, React, and TypeScript
   - Markdown processing: `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`
   - Content parsing: `gray-matter`
   - Styling: `tailwindcss`, `postcss`, `autoprefixer`
   - Icons: `lucide-react`
   - Math rendering: `katex`

## Getting Started

**Start the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

- `content/blog/` - Blog markdown posts (Physics, Philosophy, Medical Science)
- `content/ai-interpretability/` - AI interpretability research posts
- `src/app/blog/` - Blog pages and components
- `src/app/ai-interpretability/` - AI interpretability pages
- `public/assets/` - Images and static files

## Adding Blog Posts

Create markdown files in `content/blog/` with frontmatter:

```yaml
---
title: "Your Post Title"
date: 2025-01-15T00:00:00Z
categories: ["Physics"]
ShowToc: true
mathjax: true
---

Your content here...
```

## Build for Production

```bash
npm run build
```

Generates static files in `out/` directory.

## Troubleshooting

- **Port already in use**: Change port with `PORT=3001 npm run dev`
- **Module not found**: Run `npm install` again
- **Build errors**: Clear `.next` folder and rebuild
