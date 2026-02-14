'use client';

import { useReducer } from 'react';
import type {
  NicheId,
  ContentFormat,
  VideoLength,
  ProjectionInput,
} from '@/lib/youtubeEarningsModel';
import { decodeCalcState } from '@/lib/shareCodec';

export type InputMode = 'daily' | 'perVideo';

export interface CalculatorState {
  dailyViews: number;
  nicheId: NicheId;
  monthlyGrowthRate: number;
  seasonalityEnabled: boolean;
  startMonth: number;
  inputMode: InputMode;
  viewsPerVideo: number;
  uploadsPerWeek: number;
  contentFormat: ContentFormat;
  videoLength: VideoLength;
  highCpmAudiencePct: number;
}

export function computeDailyViewsFromPerVideo(
  viewsPerVideo: number,
  uploadsPerWeek: number
): number {
  return Math.round((viewsPerVideo * uploadsPerWeek) / 7);
}

type Action =
  | { type: 'SET_DAILY_VIEWS'; payload: number }
  | { type: 'SET_NICHE'; payload: NicheId }
  | { type: 'SET_GROWTH_RATE'; payload: number }
  | { type: 'TOGGLE_SEASONALITY' }
  | { type: 'APPLY_SCENARIO'; payload: Partial<ProjectionInput> }
  | { type: 'SET_FROM_LOOKUP'; payload: { dailyViews: number; nicheId?: NicheId } }
  | { type: 'SET_INPUT_MODE'; payload: InputMode }
  | { type: 'SET_VIEWS_PER_VIDEO'; payload: number }
  | { type: 'SET_UPLOADS_PER_WEEK'; payload: number }
  | { type: 'SET_CONTENT_FORMAT'; payload: ContentFormat }
  | { type: 'SET_VIDEO_LENGTH'; payload: VideoLength }
  | { type: 'SET_HIGH_CPM_AUDIENCE_PCT'; payload: number };

const defaults: CalculatorState = {
  dailyViews: 5000,
  nicheId: 'tech',
  monthlyGrowthRate: 0,
  seasonalityEnabled: false,
  startMonth: new Date().getMonth(),
  inputMode: 'daily',
  viewsPerVideo: 2000,
  uploadsPerWeek: 3,
  contentFormat: 'longform',
  videoLength: 'standard',
  highCpmAudiencePct: 50,
};

function getInitialState(defaultOverrides?: Partial<CalculatorState>): CalculatorState {
  const base = defaultOverrides ? { ...defaults, ...defaultOverrides } : defaults;

  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('c');
    if (code) {
      const decoded = decodeCalcState(code);
      if (decoded) return { ...base, ...decoded };
    }
  }

  return base;
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
    case 'APPLY_SCENARIO':
      return { ...state, ...action.payload, inputMode: 'daily' };
    case 'SET_FROM_LOOKUP': {
      const next: Partial<CalculatorState> = {
        dailyViews: action.payload.dailyViews,
        inputMode: 'daily',
      };
      if (action.payload.nicheId) next.nicheId = action.payload.nicheId;
      return { ...state, ...next };
    }
    case 'SET_INPUT_MODE':
      return { ...state, inputMode: action.payload };
    case 'SET_VIEWS_PER_VIDEO':
      return { ...state, viewsPerVideo: action.payload };
    case 'SET_UPLOADS_PER_WEEK':
      return { ...state, uploadsPerWeek: action.payload };
    case 'SET_CONTENT_FORMAT':
      return { ...state, contentFormat: action.payload };
    case 'SET_VIDEO_LENGTH':
      return { ...state, videoLength: action.payload };
    case 'SET_HIGH_CPM_AUDIENCE_PCT':
      return { ...state, highCpmAudiencePct: action.payload };
    default:
      return state;
  }
}

export function useCalculatorState(defaultOverrides?: Partial<CalculatorState>) {
  const [state, dispatch] = useReducer(reducer, defaultOverrides, (overrides) =>
    getInitialState(overrides)
  );

  return { state, dispatch } as const;
}
