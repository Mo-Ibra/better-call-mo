// lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author?: string;
  tags: string[];
  image?: string;
  readingTime?: number;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Get all blog post slugs
export async function getAllBlogSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''));
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const mdPath = path.join(postsDirectory, `${slug}.md`);
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    
    let fullPath: string;
    if (fs.existsSync(mdPath)) {
      fullPath = mdPath;
    } else if (fs.existsSync(mdxPath)) {
      fullPath = mdxPath;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate reading time if not provided
    const readingTime = data.readingTime || calculateReadingTime(content);

    return {
      slug,
      frontmatter: {
        ...data,
        readingTime,
      } as BlogPostFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

// Get all blog posts sorted by date
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = await getAllBlogSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getBlogPost(slug))
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA; // Most recent first
    });
}

// Get posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) =>
    post.frontmatter.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tagsSet = new Set<string>();
  
  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}

// Extract headings from markdown content for Table of Contents
export function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    headings.push({
      id,
      text,
      level,
    });
  }

  return headings;
}