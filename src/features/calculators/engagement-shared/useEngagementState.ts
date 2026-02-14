'use client';

import { useReducer } from 'react';
import type { EngagementInput, IndustryId, InstagramContentType } from '@/lib/engagementModel';
import type { EngagementPlatformConfig } from './platformConfigs';
import { buildDefaultState } from './platformConfigs';

type Action =
  | { type: 'SET_FIELD'; field: keyof EngagementInput; value: number | string }
  | { type: 'APPLY_SCENARIO'; payload: Partial<EngagementInput> }
  | { type: 'RESTORE_STATE'; payload: EngagementInput };

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
    case 'RESTORE_STATE':
      return action.payload;
    default:
      return state;
  }
}

export function useEngagementState(config: EngagementPlatformConfig) {
  const [state, dispatch] = useReducer(reducer, config, buildDefaultState);

  const setField = (field: keyof EngagementInput, value: number | string) =>
    dispatch({ type: 'SET_FIELD', field, value });

  const applyScenario = (changes: Partial<EngagementInput>) =>
    dispatch({ type: 'APPLY_SCENARIO', payload: changes });

  const restoreState = (restored: EngagementInput) =>
    dispatch({ type: 'RESTORE_STATE', payload: restored });

  return { state, setField, applyScenario, restoreState };
}

export type { Action as EngagementAction, IndustryId, InstagramContentType };
