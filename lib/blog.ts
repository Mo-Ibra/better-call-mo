// lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { LanguageCode, defaultLanguage } from './i18n.config';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author?: string;
  tags: string[];
  keywords?: string[];
  image?: string;
  readingTime?: number;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  lang: LanguageCode;
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

// Get directory path for a specific language
function getPostsDirectoryForLang(lang: LanguageCode = defaultLanguage): string {
  if (lang === defaultLanguage) {
    return postsDirectory;
  }
  return path.join(postsDirectory, lang);
}

// Get all blog post slugs for a specific language
export async function getAllBlogSlugs(lang: LanguageCode = defaultLanguage): Promise<string[]> {
  const directory = getPostsDirectoryForLang(lang);
  
  if (!fs.existsSync(directory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(directory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''));
}

// Get a single blog post by slug and language
export async function getBlogPost(
  slug: string,
  lang: LanguageCode = defaultLanguage
): Promise<BlogPost | null> {
  try {
    const directory = getPostsDirectoryForLang(lang);
    const mdPath = path.join(directory, `${slug}.md`);
    const mdxPath = path.join(directory, `${slug}.mdx`);
    
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
      lang,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug} (${lang}):`, error);
    return null;
  }
}

// Get all blog posts sorted by date for a specific language
export async function getAllBlogPosts(lang: LanguageCode = defaultLanguage): Promise<BlogPost[]> {
  const slugs = await getAllBlogSlugs(lang);
  const posts = await Promise.all(
    slugs.map((slug) => getBlogPost(slug, lang))
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA; // Most recent first
    });
}

// Get posts by tag for a specific language
export async function getBlogPostsByTag(
  tag: string,
  lang: LanguageCode = defaultLanguage
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts(lang);
  return allPosts.filter((post) =>
    post.frontmatter.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get all unique tags for a specific language
export async function getAllTags(lang: LanguageCode = defaultLanguage): Promise<string[]> {
  const posts = await getAllBlogPosts(lang);
  const tagsSet = new Set<string>();
  
  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}

// Check if a post has translations
export async function getAvailableTranslations(slug: string): Promise<LanguageCode[]> {
  const availableLanguages: LanguageCode[] = ['en', 'es', 'it', 'de', 'pt'];
  const translations: LanguageCode[] = [];
  
  for (const lang of availableLanguages) {
    const post = await getBlogPost(slug, lang);
    if (post) {
      translations.push(lang);
    }
  }
  
  return translations;
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