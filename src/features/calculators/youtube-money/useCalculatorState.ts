'use client';

import { useReducer } from 'react';
import type { NicheId, ProjectionInput } from '@/lib/youtubeEarningsModel';
import { decodeCalcState } from '@/lib/shareCodec';

export interface CalculatorState {
  dailyViews: number;
  nicheId: NicheId;
  monthlyGrowthRate: number;
  seasonalityEnabled: boolean;
  revenueTarget: number;
  startMonth: number;
}

type Action =
  | { type: 'SET_DAILY_VIEWS'; payload: number }
  | { type: 'SET_NICHE'; payload: NicheId }
  | { type: 'SET_GROWTH_RATE'; payload: number }
  | { type: 'TOGGLE_SEASONALITY' }
  | { type: 'SET_REVENUE_TARGET'; payload: number }
  | { type: 'APPLY_SCENARIO'; payload: Partial<ProjectionInput> }
  | { type: 'SET_FROM_LOOKUP'; payload: { dailyViews: number; nicheId?: NicheId } };

const defaults: CalculatorState = {
  dailyViews: 5000,
  nicheId: 'tech',
  monthlyGrowthRate: 0,
  seasonalityEnabled: false,
  revenueTarget: 2000,
  startMonth: new Date().getMonth(),
};

function getInitialState(): CalculatorState {
  if (typeof window === 'undefined') return defaults;

  const params = new URLSearchParams(window.location.search);
  const code = params.get('c');
  if (!code) return defaults;

  const decoded = decodeCalcState(code);
  if (!decoded) return defaults;

  return { ...defaults, ...decoded };
}

function reducer(state: CalculatorState, action: Action): CalculatorState {
  switch (action.type) {
    case 'SET_DAILY_VIEWS':
      return { ...state, dailyViews: action.payload };
    case 'SET_NICHE':
      return { ...state, nicheId: action.payload };
    case 'SET_GROWTH_RATE':
      return { ...state, monthlyGrowthRate: action.payload };
    case 'TOGGLE_SEASONALITY':
      return { ...state, seasonalityEnabled: !state.seasonalityEnabled };
    case 'SET_REVENUE_TARGET':
      return { ...state, revenueTarget: action.payload };
    case 'APPLY_SCENARIO':
      return { ...state, ...action.payload };
    case 'SET_FROM_LOOKUP': {
      const next: Partial<CalculatorState> = { dailyViews: action.payload.dailyViews };
      if (action.payload.nicheId) next.nicheId = action.payload.nicheId;
      return { ...state, ...next };
    }
    default:
      return state;
  }
}

export function useCalculatorState() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  return { state, dispatch } as const;
}
