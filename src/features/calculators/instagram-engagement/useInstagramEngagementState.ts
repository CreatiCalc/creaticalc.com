'use client';

import { useReducer } from 'react';
import type {
  InstagramContentType,
  InstagramCalcMethod,
  IndustryId,
  EngagementInput,
} from '@/lib/engagementModel';

export interface InstagramEngagementState {
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgSaves: number;
  contentType: InstagramContentType;
  industryId: IndustryId;
  postsAnalyzed: number;
  avgReach: number;
  avgImpressions: number;
  instagramCalcMethod: InstagramCalcMethod;
}

type Action =
  | { type: 'SET_FOLLOWERS'; payload: number }
  | { type: 'SET_AVG_LIKES'; payload: number }
  | { type: 'SET_AVG_COMMENTS'; payload: number }
  | { type: 'SET_AVG_SAVES'; payload: number }
  | { type: 'SET_CONTENT_TYPE'; payload: InstagramContentType }
  | { type: 'SET_INDUSTRY'; payload: IndustryId }
  | { type: 'SET_POSTS_ANALYZED'; payload: number }
  | { type: 'SET_AVG_REACH'; payload: number }
  | { type: 'SET_AVG_IMPRESSIONS'; payload: number }
  | { type: 'SET_INSTAGRAM_CALC_METHOD'; payload: InstagramCalcMethod }
  | { type: 'APPLY_SCENARIO'; payload: Partial<EngagementInput> }
  | { type: 'RESTORE_STATE'; payload: InstagramEngagementState };

const defaultState: InstagramEngagementState = {
  followers: 10_000,
  avgLikes: 200,
  avgComments: 10,
  avgSaves: 15,
  contentType: 'mixed',
  industryId: 'general',
  postsAnalyzed: 12,
  avgReach: 0,
  avgImpressions: 0,
  instagramCalcMethod: 'byFollowers',
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
    case 'SET_AVG_REACH':
      return { ...state, avgReach: action.payload };
    case 'SET_AVG_IMPRESSIONS':
      return { ...state, avgImpressions: action.payload };
    case 'SET_INSTAGRAM_CALC_METHOD':
      return { ...state, instagramCalcMethod: action.payload };
    case 'APPLY_SCENARIO':
      return {
        ...state,
        ...(action.payload.followers !== undefined && { followers: action.payload.followers }),
        ...(action.payload.avgLikes !== undefined && { avgLikes: action.payload.avgLikes }),
        ...(action.payload.avgComments !== undefined && {
          avgComments: action.payload.avgComments,
        }),
        ...(action.payload.avgSaves !== undefined && { avgSaves: action.payload.avgSaves }),
      };
    case 'RESTORE_STATE':
      return action.payload;
    default:
      return state;
  }
}

export function useInstagramEngagementState(initialOverride?: InstagramEngagementState) {
  const [state, dispatch] = useReducer(reducer, initialOverride ?? defaultState);
  return { state, dispatch };
}

export { defaultState as instagramDefaultState };
