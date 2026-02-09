'use client';

import { useReducer } from 'react';
import type { NicheId, ProjectionInput } from '@/lib/youtubeEarningsModel';

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
  | { type: 'APPLY_SCENARIO'; payload: Partial<ProjectionInput> };

const initialState: CalculatorState = {
  dailyViews: 50000,
  nicheId: 'tech',
  monthlyGrowthRate: 0,
  seasonalityEnabled: false,
  revenueTarget: 2000,
  startMonth: new Date().getMonth(),
};

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
    default:
      return state;
  }
}

export function useCalculatorState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch } as const;
}
