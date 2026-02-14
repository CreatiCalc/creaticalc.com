'use client';

import { createContext, useContext } from 'react';

export const EmbedContext = createContext(false);

export function useIsEmbed(): boolean {
  return useContext(EmbedContext);
}
