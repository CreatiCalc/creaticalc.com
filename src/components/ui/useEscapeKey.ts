import { useEffect } from 'react';

/**
 * Calls `handler` when the Escape key is pressed.
 * Only active when `enabled` is true.
 */
export default function useEscapeKey(handler: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') handler();
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handler, enabled]);
}
