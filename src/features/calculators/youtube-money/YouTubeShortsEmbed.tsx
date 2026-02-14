'use client';

import YouTubeMoneyCalculator from './YouTubeMoneyCalculator';

export default function YouTubeShortsEmbed() {
  return (
    <YouTubeMoneyCalculator
      defaultOverrides={{ contentFormat: 'shorts', dailyViews: 50000 }}
      hideFormatToggle
    />
  );
}
