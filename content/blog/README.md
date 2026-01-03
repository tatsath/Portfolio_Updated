# Research Post Guide

## How Tags/Categories Work

Tags (also called categories) are used to organize and filter research posts. They appear in the left sidebar on the research page and can be clicked to filter posts by category.

### How Tags Are Generated

Tags come from the **`categories`** field in the YAML frontmatter at the top of each markdown file. The system:

1. **Reads the frontmatter** of each markdown file in the `content/research/` directory
2. **Extracts the `categories` field** (can be a single string or an array of strings)
3. **Collects all unique categories** from all research posts
4. **Displays them alphabetically** in the left sidebar filter
5. **Makes them clickable** to filter posts by that category

### Adding Tags to a Research Post

Tags are defined in the **frontmatter** (YAML header) at the top of each markdown file using the `categories` field.

#### Single Tag Example:

```yaml
---
title: "Your Research Post Title"
date: 2024-01-15T00:00:00Z
categories: ["Research"]
---
```

#### Multiple Tags Example:

```yaml
---
title: "Your Research Post Title"
date: 2024-01-15T00:00:00Z
categories: ["Research", "Technical", "Interpretability"]
---
```

### Creating New Tags

To create a new tag:

1. **Add the tag to a research post's frontmatter:**

   - Open the markdown file for your research post
   - Add or update the `categories` field in the frontmatter
   - Use a descriptive, capitalized tag name (e.g., "Research", "Technical", "Interpretability")

2. **The tag will automatically appear:**
   - Once you save the file, the tag will automatically appear in the left sidebar filter
   - The tag will be clickable and will filter posts when clicked
   - Tags are sorted alphabetically in the sidebar

### Adding Featured Images to Research Posts

You can add a featured image to any research post by including an `image` or `featuredImage` field in the frontmatter:

```yaml
---
title: "Your Research Post Title"
date: 2024-01-15T00:00:00Z
categories: ["Research"]
image: "/images/research/your-image.jpg"
---
```

**Image Path Options:**

- **Relative to public folder**: Use paths like `/images/research/image.jpg` (place images in `apps/home/public/images/research/`)
- **External URLs**: Use full URLs like `https://example.com/image.jpg`
- **CDN URLs**: Use CDN URLs for optimized images

### Example Research Post with Tags and Image

```markdown
---
title: "Advancing Mechanistic Interpretability"
date: 2024-12-15T00:00:00Z
lastmod: 2024-12-15T00:00:00Z
draft: false
description: "Exploring the latest breakthroughs in mechanistic interpretability research."
author: ["NeuronLens Research Team"]
categories: ["Research", "Technical", "Interpretability"]
image: "/images/research/mechanistic-interpretability.jpg"
---

Your research post content here...
```

### Common Tag Categories

Here are some suggested tag categories you might want to use:

- **Research** - General research posts OK
- **Technical** - Technical deep-dives and implementations
- **Interpretability** - Interpretability-specific research
- **Research Notes** - Quick notes and findings
- **Publications** - Published papers and articles
- **Experiments** - Experimental results and findings

### Notes

- Tags are case-sensitive, so use consistent capitalization
- Tags with spaces are supported (e.g., "Research Notes")
- A research post can have multiple tags
- Tags automatically appear in the sidebar once used in at least one published post
- Draft posts (with `draft: true`) are not included in the research listing

### File Location

Research posts are located in: `apps/home/content/research/`

Each markdown file should have:

- A `.md` extension
- YAML frontmatter at the top
- The `categories` field in the frontmatter for tags
- Optional `image` or `featuredImage` field for featured images

### How Tags Are Processed

The tag system works as follows:

1. **File Reading**: The system reads all `.md` files from `content/research/`
2. **Frontmatter Parsing**: Uses `gray-matter` to parse YAML frontmatter
3. **Category Extraction**: Extracts the `categories` field (handles both string and array formats)
4. **Category Collection**: Collects all unique categories from all posts
5. **Display**: Shows categories alphabetically in the sidebar filter
6. **Filtering**: When a category is clicked, filters posts that have that category

The code that handles this is in: `apps/home/src/lib/research.ts`




