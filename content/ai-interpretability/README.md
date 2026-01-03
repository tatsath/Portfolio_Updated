# Blog Post Guide

## How to Add Tags/Categories to Blog Posts

Tags (categories) are used to organize and filter blog posts. They appear in the left sidebar on the blog page and can be clicked to filter posts by category.

### Adding Tags to a Blog Post

Tags are defined in the **frontmatter** (YAML header) at the top of each markdown file using the `categories` field.

#### Single Tag Example:

```yaml
---
title: "Your Blog Post Title"
date: 2024-01-15T00:00:00Z
categories: ["Research"]
---
```

#### Multiple Tags Example:

```yaml
---
title: "Your Blog Post Title"
date: 2024-01-15T00:00:00Z
categories: ["Research", "Announcement", "Technical"]
---
```

### Creating New Tags

To create a new tag:

1. **Add the tag to a blog post's frontmatter:**

   - Open the markdown file for your blog post
   - Add or update the `categories` field in the frontmatter
   - Use a descriptive, capitalized tag name (e.g., "Company Updates", "Partnerships", "Educational")

2. **The tag will automatically appear:**
   - Once you save the file, the tag will automatically appear in the left sidebar filter
   - The tag will be clickable and will filter posts when clicked
   - Tags are sorted alphabetically in the sidebar

### Adding Featured Images to Blog Posts

You can add a featured image to any blog post by including an `image` or `featuredImage` field in the frontmatter. The image will appear:

- In the blog listing page (left side of each post)
- At the top of the individual blog post page

#### Image Example:

```yaml
---
title: "Your Blog Post Title"
date: 2024-01-15T00:00:00Z
categories: ["Research"]
image: "/images/blog/your-image.jpg"
---
```

**Image Path Options:**

- **Relative to public folder**: Use paths like `/images/blog/image.jpg` (place images in `apps/home/public/images/blog/`)
- **External URLs**: Use full URLs like `https://example.com/image.jpg`
- **CDN URLs**: Use CDN URLs for optimized images

**Recommended Image Specifications:**

- **Aspect Ratio**: 16:9 or 1:1 (square) works best
- **Size**: Recommended 1200x675px or 800x800px
- **Format**: JPG or PNG
- **File Size**: Optimize images to keep page load fast

### Example Blog Post with Tags and Image

```markdown
---
title: "Announcing NeuronLens Partnership with OpenAI"
date: 2024-01-15T00:00:00Z
lastmod: 2024-01-15T00:00:00Z
draft: false
description: "We're excited to announce our new partnership..."
author: ["John Doe"]
categories: ["Partnerships", "Company Updates"]
image: "/images/blog/partnership-announcement.jpg"
---

Your blog post content here...
```

### Common Tag Categories

Here are some suggested tag categories you might want to use:

- **Research** - Research papers, findings, and technical deep-dives
- **Announcement** - Company announcements and news
- **Company Updates** - Updates about the company
- **Partnerships** - Partnership announcements
- **Educational** - Educational content and tutorials
- **Technical** - Technical documentation and guides
- **Opinion** - Opinion pieces and editorials
- **Product Releases** - New product or feature releases

### Notes

- Tags are case-sensitive, so use consistent capitalization
- Tags with spaces are supported (e.g., "Company Updates")
- A blog post can have multiple tags
- Tags automatically appear in the sidebar once used in at least one published post
- Draft posts (with `draft: true`) are not included in the blog listing

### File Location

Blog posts are located in: `apps/home/content/blog/`

Each markdown file should have:

- A `.md` extension
- YAML frontmatter at the top
- The `categories` field in the frontmatter for tags
- Optional `image` or `featuredImage` field for featured images

### Image Storage

**Option 1: Store images in the public folder (Recommended)**

1. Create the directory: `apps/home/public/images/blog/`
2. Place your images in this folder
3. Reference them in frontmatter as: `image: "/images/blog/your-image.jpg"`

**Option 2: Use external URLs**

- Use full URLs: `image: "https://example.com/image.jpg"`
- Works with CDNs, cloud storage, etc.

**Option 3: Use relative paths from public folder**

- Any path starting with `/` is relative to the `public` folder
- Example: `image: "/blog-images/post-1.jpg"` looks for `apps/home/public/blog-images/post-1.jpg`
