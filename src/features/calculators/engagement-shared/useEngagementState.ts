'use client';

import { useReducer } from 'react';
import type { EngagementInput, IndustryId, InstagramContentType } from '@/lib/engagementModel';
import { decodeState, shareableToInput } from '@/lib/engagementShareCodec';
import type { EngagementPlatformConfig } from './platformConfigs';
import { buildDefaultState } from './platformConfigs';

type Action =
  | { type: 'SET_FIELD'; field: keyof EngagementInput; value: number | string }
  | { type: 'APPLY_SCENARIO'; payload: Partial<EngagementInput> };

function reducer(state: EngagementInput, action: Action): EngagementInput {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'APPLY_SCENARIO': {
      const next = { ...state };
      for (const [key, val] of Object.entries(action.payload)) {
        if (val !== undefined) {
          (next as Record<string, unknown>)[key] = val;
        }
      }
      return next;
    }
    default:
      return state;
  }
}

function getInitialState(config: EngagementPlatformConfig): EngagementInput {
  const base = buildDefaultState(config);

  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('s');
    if (encoded) {
      const decoded = decodeState(encoded);
      if (decoded && decoded.p === config.platform) {
        return shareableToInput(decoded);
      }
    }
  }

  return base;
}

export function useEngagementState(config: EngagementPlatformConfig) {
  const [state, dispatch] = useReducer(reducer, config, getInitialState);

  const setField = (field: keyof EngagementInput, value: number | string) =>
    dispatch({ type: 'SET_FIELD', field, value });

  const applyScenario = (changes: Partial<EngagementInput>) =>
    dispatch({ type: 'APPLY_SCENARIO', payload: changes });

  return { state, setField, applyScenario };
}

export type { Action as EngagementAction, IndustryId, InstagramContentType };
