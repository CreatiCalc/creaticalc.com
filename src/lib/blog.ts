import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  slug: string;
  date: string;
  lastModified: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
}

export interface BlogPost {
  frontmatter: BlogPostFrontmatter;
  content: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function readMdxFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data as BlogPostFrontmatter, content };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** All posts sorted by date descending. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => readMdxFile(path.join(BLOG_DIR, f)))
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

/** Single post by slug. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  return readMdxFile(filePath);
}

/** All slugs for generateStaticParams. */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}
