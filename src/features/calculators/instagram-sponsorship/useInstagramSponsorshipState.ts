'use client';

import { useReducer } from 'react';
import type { IndustryId } from '@/lib/engagementModel';
import type { InstagramContentType, DealType } from '@/lib/sponsorshipModel';

export interface InstagramSponsorshipState {
  followers: number;
  engagementRate: number;
  contentType: InstagramContentType;
  dealType: DealType;
  industryId: IndustryId;
  dealsPerMonth: number;
}

type Action =
  | { type: 'SET_FOLLOWERS'; payload: number }
  | { type: 'SET_ENGAGEMENT_RATE'; payload: number }
  | { type: 'SET_CONTENT_TYPE'; payload: InstagramContentType }
  | { type: 'SET_DEAL_TYPE'; payload: DealType }
  | { type: 'SET_INDUSTRY'; payload: IndustryId }
  | { type: 'SET_DEALS_PER_MONTH'; payload: number };

const defaultState: InstagramSponsorshipState = {
  followers: 10_000,
  engagementRate: 3.0,
  contentType: 'feedPost',
  dealType: 'mention',
  industryId: 'general',
  dealsPerMonth: 2,
};

function reducer(state: InstagramSponsorshipState, action: Action): InstagramSponsorshipState {
  switch (action.type) {
    case 'SET_FOLLOWERS':
      return { ...state, followers: action.payload };
    case 'SET_ENGAGEMENT_RATE':
      return { ...state, engagementRate: action.payload };
    case 'SET_CONTENT_TYPE':
      return { ...state, contentType: action.payload };
    case 'SET_DEAL_TYPE':
      return { ...state, dealType: action.payload };
    case 'SET_INDUSTRY':
      return { ...state, industryId: action.payload };
    case 'SET_DEALS_PER_MONTH':
      return { ...state, dealsPerMonth: action.payload };
    default:
      return state;
  }
}

export function useInstagramSponsorshipState() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return { state, dispatch };
}
