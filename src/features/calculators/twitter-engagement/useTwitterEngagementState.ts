'use client';

import { useReducer } from 'react';
import type { TwitterCalcMethod, IndustryId, EngagementInput } from '@/lib/engagementModel';

export interface TwitterEngagementState {
  followers: number;
  avgLikes: number;
  avgReplies: number;
  avgReposts: number;
  avgBookmarks: number;
  avgImpressions: number;
  calcMethod: TwitterCalcMethod;
  industryId: IndustryId;
  postsAnalyzed: number;
}

type Action =
  | { type: 'SET_FOLLOWERS'; payload: number }
  | { type: 'SET_AVG_LIKES'; payload: number }
  | { type: 'SET_AVG_REPLIES'; payload: number }
  | { type: 'SET_AVG_REPOSTS'; payload: number }
  | { type: 'SET_AVG_BOOKMARKS'; payload: number }
  | { type: 'SET_AVG_IMPRESSIONS'; payload: number }
  | { type: 'SET_CALC_METHOD'; payload: TwitterCalcMethod }
  | { type: 'SET_INDUSTRY'; payload: IndustryId }
  | { type: 'SET_POSTS_ANALYZED'; payload: number }
  | { type: 'APPLY_SCENARIO'; payload: Partial<EngagementInput> }
  | { type: 'RESTORE_STATE'; payload: TwitterEngagementState };

const defaultState: TwitterEngagementState = {
  followers: 5_000,
  avgLikes: 50,
  avgReplies: 5,
  avgReposts: 10,
  avgBookmarks: 3,
  avgImpressions: 5_000,
  calcMethod: 'byFollowers',
  industryId: 'general',
  postsAnalyzed: 10,
};

function reducer(state: TwitterEngagementState, action: Action): TwitterEngagementState {
  switch (action.type) {
    case 'SET_FOLLOWERS':
      return { ...state, followers: action.payload };
    case 'SET_AVG_LIKES':
      return { ...state, avgLikes: action.payload };
    case 'SET_AVG_REPLIES':
      return { ...state, avgReplies: action.payload };
    case 'SET_AVG_REPOSTS':
      return { ...state, avgReposts: action.payload };
    case 'SET_AVG_BOOKMARKS':
      return { ...state, avgBookmarks: action.payload };
    case 'SET_AVG_IMPRESSIONS':
      return { ...state, avgImpressions: action.payload };
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
        ...(action.payload.avgComments !== undefined && { avgReplies: action.payload.avgComments }),
        ...(action.payload.avgReposts !== undefined && { avgReposts: action.payload.avgReposts }),
        ...(action.payload.avgBookmarks !== undefined && {
          avgBookmarks: action.payload.avgBookmarks,
        }),
      };
    case 'RESTORE_STATE':
      return action.payload;
    default:
      return state;
  }
}

export function useTwitterEngagementState(initialOverride?: TwitterEngagementState) {
  const [state, dispatch] = useReducer(reducer, initialOverride ?? defaultState);
  return { state, dispatch };
}

export { defaultState as twitterDefaultState };
