'use client';

import { useReducer } from 'react';
import type { GrowthNicheId, GrowthInputMode } from '@/lib/subscriberGrowthModel';
import { decodeGrowthState } from '@/lib/growthShareCodec';

export interface GrowthState {
  currentSubs: number;
  inputMode: GrowthInputMode;
  monthlyGrowthRate: number;
  monthlyNewSubs: number;
  uploadsPerWeek: number;
  nicheId: GrowthNicheId;
  decelerationEnabled: boolean;
}

type Action =
  | { type: 'SET_CURRENT_SUBS'; payload: number }
  | { type: 'SET_INPUT_MODE'; payload: GrowthInputMode }
  | { type: 'SET_MONTHLY_GROWTH_RATE'; payload: number }
  | { type: 'SET_MONTHLY_NEW_SUBS'; payload: number }
  | { type: 'SET_UPLOADS_PER_WEEK'; payload: number }
  | { type: 'SET_NICHE'; payload: GrowthNicheId }
  | { type: 'TOGGLE_DECELERATION' };

const defaults: GrowthState = {
  currentSubs: 500,
  inputMode: 'rate',
  monthlyGrowthRate: 0.05,
  monthlyNewSubs: 100,
  uploadsPerWeek: 2,
  nicheId: 'tech',
  decelerationEnabled: true,
};

function getInitialState(): GrowthState {
  if (typeof window === 'undefined') return defaults;
  const params = new URLSearchParams(window.location.search);
  const code = params.get('c');
  if (!code) return defaults;
  const decoded = decodeGrowthState(code);
  return decoded ?? defaults;
}

function reducer(state: GrowthState, action: Action): GrowthState {
  switch (action.type) {
    case 'SET_CURRENT_SUBS':
      return { ...state, currentSubs: action.payload };
    case 'SET_INPUT_MODE':
      return { ...state, inputMode: action.payload };
    case 'SET_MONTHLY_GROWTH_RATE':
      return { ...state, monthlyGrowthRate: action.payload };
    case 'SET_MONTHLY_NEW_SUBS':
      return { ...state, monthlyNewSubs: action.payload };
    case 'SET_UPLOADS_PER_WEEK':
      return { ...state, uploadsPerWeek: action.payload };
    case 'SET_NICHE':
      return { ...state, nicheId: action.payload };
    case 'TOGGLE_DECELERATION':
      return { ...state, decelerationEnabled: !state.decelerationEnabled };
    default:
      return state;
  }
}

export function useGrowthState() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  return {
    state,
    setCurrentSubs: (v: number) => dispatch({ type: 'SET_CURRENT_SUBS', payload: v }),
    setInputMode: (v: GrowthInputMode) => dispatch({ type: 'SET_INPUT_MODE', payload: v }),
    setMonthlyGrowthRate: (v: number) => dispatch({ type: 'SET_MONTHLY_GROWTH_RATE', payload: v }),
    setMonthlyNewSubs: (v: number) => dispatch({ type: 'SET_MONTHLY_NEW_SUBS', payload: v }),
    setUploadsPerWeek: (v: number) => dispatch({ type: 'SET_UPLOADS_PER_WEEK', payload: v }),
    setNiche: (v: GrowthNicheId) => dispatch({ type: 'SET_NICHE', payload: v }),
    toggleDeceleration: () => dispatch({ type: 'TOGGLE_DECELERATION' }),
  };
}
