'use client';

import { useCallback } from 'react';
import { SITE_URL } from '@/lib/siteConfig';

export function useShareUrl<TState>(
  state: TState,
  encodeFn: (state: TState) => string,
  basePath: string,
  queryParam: string = 'c'
) {
  const getShareUrl = useCallback(() => {
    const encoded = encodeFn(state);
    return `${SITE_URL}${basePath}?${queryParam}=${encoded}`;
  }, [state, encodeFn, basePath, queryParam]);

  const embedSlug = basePath.slice(1);

  return { getShareUrl, embedSlug };
}
