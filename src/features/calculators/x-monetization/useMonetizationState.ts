'use client';

import { useReducer } from 'react';

export interface MonetizationState {
  followers: number;
  hasXPremium: boolean;
  accountAgeMonths: number;
  organicImpressions3Months: number;
  hasHostedSpaces: boolean;
  hasPostedLast30Days: boolean;
}

type Action =
  | { type: 'SET_FOLLOWERS'; payload: number }
  | { type: 'SET_HAS_X_PREMIUM'; payload: boolean }
  | { type: 'SET_ACCOUNT_AGE_MONTHS'; payload: number }
  | { type: 'SET_ORGANIC_IMPRESSIONS'; payload: number }
  | { type: 'SET_HAS_HOSTED_SPACES'; payload: boolean }
  | { type: 'SET_HAS_POSTED_LAST_30_DAYS'; payload: boolean };

function reducer(state: MonetizationState, action: Action): MonetizationState {
  switch (action.type) {
    case 'SET_FOLLOWERS':
      return { ...state, followers: action.payload };
    case 'SET_HAS_X_PREMIUM':
      return { ...state, hasXPremium: action.payload };
    case 'SET_ACCOUNT_AGE_MONTHS':
      return { ...state, accountAgeMonths: action.payload };
    case 'SET_ORGANIC_IMPRESSIONS':
      return { ...state, organicImpressions3Months: action.payload };
    case 'SET_HAS_HOSTED_SPACES':
      return { ...state, hasHostedSpaces: action.payload };
    case 'SET_HAS_POSTED_LAST_30_DAYS':
      return { ...state, hasPostedLast30Days: action.payload };
    default:
      return state;
  }
}

const DEFAULTS: MonetizationState = {
  followers: 1_000,
  hasXPremium: false,
  accountAgeMonths: 6,
  organicImpressions3Months: 100_000,
  hasHostedSpaces: false,
  hasPostedLast30Days: true,
};

export function useMonetizationState() {
  const [state, dispatch] = useReducer(reducer, DEFAULTS);

  return {
    state,
    setFollowers: (v: number) => dispatch({ type: 'SET_FOLLOWERS', payload: v }),
    setHasXPremium: (v: boolean) => dispatch({ type: 'SET_HAS_X_PREMIUM', payload: v }),
    setAccountAgeMonths: (v: number) => dispatch({ type: 'SET_ACCOUNT_AGE_MONTHS', payload: v }),
    setOrganicImpressions: (v: number) => dispatch({ type: 'SET_ORGANIC_IMPRESSIONS', payload: v }),
    setHasHostedSpaces: (v: boolean) => dispatch({ type: 'SET_HAS_HOSTED_SPACES', payload: v }),
    setHasPostedLast30Days: (v: boolean) =>
      dispatch({ type: 'SET_HAS_POSTED_LAST_30_DAYS', payload: v }),
  };
}
