'use client';

import ShareButtons from '@/components/ui/ShareButtons';
import { SITE_URL } from '@/lib/siteConfig';

interface BlogShareButtonsProps {
  slug: string;
  title: string;
}

export default function BlogShareButtons({ slug, title }: BlogShareButtonsProps) {
  const url = `${SITE_URL}/blog/${slug}`;
  return <ShareButtons getShareUrl={() => url} shareText={title} />;
}
