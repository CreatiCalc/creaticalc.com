'use client';

import { useReducer } from 'react';
import type { FacebookCalcMethod, IndustryId, EngagementInput } from '@/lib/engagementModel';

export interface FacebookEngagementState {
  followers: number;
  avgReactions: number;
  avgComments: number;
  avgShares: number;
  avgReach: number;
  calcMethod: FacebookCalcMethod;
  industryId: IndustryId;
  postsAnalyzed: number;
}

type Action =
  | { type: 'SET_FOLLOWERS'; payload: number }
  | { type: 'SET_AVG_REACTIONS'; payload: number }
  | { type: 'SET_AVG_COMMENTS'; payload: number }
  | { type: 'SET_AVG_SHARES'; payload: number }
  | { type: 'SET_AVG_REACH'; payload: number }
  | { type: 'SET_CALC_METHOD'; payload: FacebookCalcMethod }
  | { type: 'SET_INDUSTRY'; payload: IndustryId }
  | { type: 'SET_POSTS_ANALYZED'; payload: number }
  | { type: 'APPLY_SCENARIO'; payload: Partial<EngagementInput> }
  | { type: 'RESTORE_STATE'; payload: FacebookEngagementState };

const defaultState: FacebookEngagementState = {
  followers: 5_000,
  avgReactions: 50,
  avgComments: 10,
  avgShares: 5,
  avgReach: 500,
  calcMethod: 'byFollowers',
  industryId: 'general',
  postsAnalyzed: 10,
};

function reducer(state: FacebookEngagementState, action: Action): FacebookEngagementState {
  switch (action.type) {
    case 'SET_FOLLOWERS':
      return { ...state, followers: action.payload };
    case 'SET_AVG_REACTIONS':
      return { ...state, avgReactions: action.payload };
    case 'SET_AVG_COMMENTS':
      return { ...state, avgComments: action.payload };
    case 'SET_AVG_SHARES':
      return { ...state, avgShares: action.payload };
    case 'SET_AVG_REACH':
      return { ...state, avgReach: action.payload };
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
        ...(action.payload.avgLikes !== undefined && { avgReactions: action.payload.avgLikes }),
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

export function useFacebookEngagementState(initialOverride?: FacebookEngagementState) {
  const [state, dispatch] = useReducer(reducer, initialOverride ?? defaultState);
  return { state, dispatch };
}

export { defaultState as facebookDefaultState };
