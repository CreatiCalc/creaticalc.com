'use client';

import { useReducer } from 'react';
import type { IndustryId } from '@/lib/engagementModel';
import type { DealType } from '@/lib/sponsorshipModel';
import { decodeSponsorshipState } from '@/lib/sponsorshipShareCodec';

export interface SponsorshipState<TContentType extends string> {
  followers: number;
  engagementRate: number;
  contentType: TContentType;
  dealType: DealType;
  industryId: IndustryId;
  dealsPerMonth: number;
}

type Action<TContentType extends string> =
  | { type: 'SET_FOLLOWERS'; payload: number }
  | { type: 'SET_ENGAGEMENT_RATE'; payload: number }
  | { type: 'SET_CONTENT_TYPE'; payload: TContentType }
  | { type: 'SET_DEAL_TYPE'; payload: DealType }
  | { type: 'SET_INDUSTRY'; payload: IndustryId }
  | { type: 'SET_DEALS_PER_MONTH'; payload: number };

function createReducer<TContentType extends string>() {
  return function reducer(
    state: SponsorshipState<TContentType>,
    action: Action<TContentType>
  ): SponsorshipState<TContentType> {
    switch (action.type) {
      case 'SET_FOLLOWERS':
        return { ...state, followers: action.payload };
      case 'SET_ENGAGEMENT_RATE':
        return { ...state, engagementRate: action.payload };
      case 'SET_CONTENT_TYPE':
        return { ...state, contentType: action.payload };
      case 'SET_DEAL_TYPE':
        return { ...state, dealType: action.payload };
      case 'SET_INDUSTRY':
        return { ...state, industryId: action.payload };
      case 'SET_DEALS_PER_MONTH':
        return { ...state, dealsPerMonth: action.payload };
      default:
        return state;
    }
  };
}

interface SponsorshipStateConfig<TContentType extends string> {
  platform: string;
  defaults: SponsorshipState<TContentType>;
}

export function createSponsorshipStateHook<TContentType extends string>(
  config: SponsorshipStateConfig<TContentType>
) {
  const reducer = createReducer<TContentType>();

  function getInitialState(): SponsorshipState<TContentType> {
    if (typeof window === 'undefined') return config.defaults;
    const params = new URLSearchParams(window.location.search);
    const code = params.get('c');
    if (!code) return config.defaults;
    const decoded = decodeSponsorshipState(code);
    if (!decoded || decoded.platform !== config.platform) return config.defaults;
    return {
      followers: decoded.followers,
      engagementRate: decoded.engagementRate,
      contentType: decoded.contentType as TContentType,
      dealType: decoded.dealType as DealType,
      industryId: decoded.industryId,
      dealsPerMonth: decoded.dealsPerMonth,
    };
  }

  return function useSponsorshipState() {
    const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
    return { state, dispatch };
  };
}
