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
const WORDS_PER_MINUTE = 238;

/** Compute reading time in minutes from raw MDX content. */
export function computeReadingTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function readMdxFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;
  frontmatter.readingTime = computeReadingTime(content);
  return { frontmatter, content };
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

/** All unique tags across all posts. */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.frontmatter.tags) {
      tags.add(tag);
    }
  }
  return [...tags].sort();
}

/** Posts matching a given tag, sorted by date descending. */
export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((p) => p.frontmatter.tags.includes(tag));
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Extract H2/H3 headings from raw MDX content for table of contents.
 *  Uses github-slugger (same as rehype-slug) so TOC links match rendered heading IDs. */
export function extractHeadings(content: string): TocHeading[] {
  // Dynamic import would complicate things; github-slugger is ESM but available at build time
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const GithubSlugger = require('github-slugger').default ?? require('github-slugger');
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].replace(/\*\*/g, '').replace(/`/g, '').trim();
    const id = slugger.slug(text);
    headings.push({ id, text, level: match[1].length as 2 | 3 });
  }
  return headings;
}

const TAG_LABELS: Record<string, string> = {
  'youtube': 'YouTube',
  'tiktok': 'TikTok',
  'instagram': 'Instagram',
  'cpm': 'CPM',
  'rpm': 'RPM',
  'brand-deals': 'Brand Deals',
  'engagement-rate': 'Engagement Rate',
};

/** Format a tag slug for display (e.g. "brand-deals" → "Brand Deals"). */
export function formatTagLabel(tag: string): string {
  if (TAG_LABELS[tag]) return TAG_LABELS[tag];
  return tag
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
