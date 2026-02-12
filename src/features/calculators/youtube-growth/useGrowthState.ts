'use client';

import { useReducer } from 'react';
import type { GrowthNicheId, GrowthInputMode } from '@/lib/subscriberGrowthModel';

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
  const [state, dispatch] = useReducer(reducer, defaults);
  return { state, dispatch } as const;
}
