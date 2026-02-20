import type { ReactNode } from 'react';

export interface CalculatorMeta {
  title: string;
  description: string;
  slug: string;
}

export interface FAQItem {
  question: string;
  answer: ReactNode;
}
