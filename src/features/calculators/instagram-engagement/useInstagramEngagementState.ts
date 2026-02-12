'use client';

import { useReducer } from 'react';
import type { InstagramContentType, IndustryId } from '@/lib/engagementModel';

export interface InstagramEngagementState {
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgSaves: number;
  contentType: InstagramContentType;
  industryId: IndustryId;
  postsAnalyzed: number;
}

type Action =
  | { type: 'SET_FOLLOWERS'; payload: number }
  | { type: 'SET_AVG_LIKES'; payload: number }
  | { type: 'SET_AVG_COMMENTS'; payload: number }
  | { type: 'SET_AVG_SAVES'; payload: number }
  | { type: 'SET_CONTENT_TYPE'; payload: InstagramContentType }
  | { type: 'SET_INDUSTRY'; payload: IndustryId }
  | { type: 'SET_POSTS_ANALYZED'; payload: number };

const initialState: InstagramEngagementState = {
  followers: 10_000,
  avgLikes: 200,
  avgComments: 10,
  avgSaves: 15,
  contentType: 'mixed',
  industryId: 'general',
  postsAnalyzed: 12,
};

function reducer(state: InstagramEngagementState, action: Action): InstagramEngagementState {
  switch (action.type) {
    case 'SET_FOLLOWERS':
      return { ...state, followers: action.payload };
    case 'SET_AVG_LIKES':
      return { ...state, avgLikes: action.payload };
    case 'SET_AVG_COMMENTS':
      return { ...state, avgComments: action.payload };
    case 'SET_AVG_SAVES':
      return { ...state, avgSaves: action.payload };
    case 'SET_CONTENT_TYPE':
      return { ...state, contentType: action.payload };
    case 'SET_INDUSTRY':
      return { ...state, industryId: action.payload };
    case 'SET_POSTS_ANALYZED':
      return { ...state, postsAnalyzed: action.payload };
    default:
      return state;
  }
}

export function useInstagramEngagementState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
