'use client';

import { useReducer } from 'react';
import type { TikTokCalcMethod, IndustryId } from '@/lib/engagementModel';

export interface TikTokEngagementState {
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  avgViews: number;
  calcMethod: TikTokCalcMethod;
  industryId: IndustryId;
  postsAnalyzed: number;
}

type Action =
  | { type: 'SET_FOLLOWERS'; payload: number }
  | { type: 'SET_AVG_LIKES'; payload: number }
  | { type: 'SET_AVG_COMMENTS'; payload: number }
  | { type: 'SET_AVG_SHARES'; payload: number }
  | { type: 'SET_AVG_VIEWS'; payload: number }
  | { type: 'SET_CALC_METHOD'; payload: TikTokCalcMethod }
  | { type: 'SET_INDUSTRY'; payload: IndustryId }
  | { type: 'SET_POSTS_ANALYZED'; payload: number };

const initialState: TikTokEngagementState = {
  followers: 10_000,
  avgLikes: 600,
  avgComments: 30,
  avgShares: 20,
  avgViews: 8_000,
  calcMethod: 'byFollowers',
  industryId: 'general',
  postsAnalyzed: 12,
};

function reducer(state: TikTokEngagementState, action: Action): TikTokEngagementState {
  switch (action.type) {
    case 'SET_FOLLOWERS':
      return { ...state, followers: action.payload };
    case 'SET_AVG_LIKES':
      return { ...state, avgLikes: action.payload };
    case 'SET_AVG_COMMENTS':
      return { ...state, avgComments: action.payload };
    case 'SET_AVG_SHARES':
      return { ...state, avgShares: action.payload };
    case 'SET_AVG_VIEWS':
      return { ...state, avgViews: action.payload };
    case 'SET_CALC_METHOD':
      return { ...state, calcMethod: action.payload };
    case 'SET_INDUSTRY':
      return { ...state, industryId: action.payload };
    case 'SET_POSTS_ANALYZED':
      return { ...state, postsAnalyzed: action.payload };
    default:
      return state;
  }
}

export function useTikTokEngagementState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
