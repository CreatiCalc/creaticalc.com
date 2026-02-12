'use client';

import { useReducer } from 'react';
import type { TikTokCalcMethod, IndustryId, EngagementInput } from '@/lib/engagementModel';

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
  | { type: 'SET_POSTS_ANALYZED'; payload: number }
  | { type: 'APPLY_SCENARIO'; payload: Partial<EngagementInput> }
  | { type: 'RESTORE_STATE'; payload: TikTokEngagementState };

const defaultState: TikTokEngagementState = {
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
    case 'APPLY_SCENARIO':
      return {
        ...state,
        ...(action.payload.followers !== undefined && { followers: action.payload.followers }),
        ...(action.payload.avgLikes !== undefined && { avgLikes: action.payload.avgLikes }),
        ...(action.payload.avgComments !== undefined && {
          avgComments: action.payload.avgComments,
        }),
        ...(action.payload.avgShares !== undefined && { avgShares: action.payload.avgShares }),
      };
    case 'RESTORE_STATE':
      return action.payload;
    default:
      return state;
  }
}

export function useTikTokEngagementState(initialOverride?: TikTokEngagementState) {
  const [state, dispatch] = useReducer(reducer, initialOverride ?? defaultState);
  return { state, dispatch };
}

export { defaultState as tiktokDefaultState };
