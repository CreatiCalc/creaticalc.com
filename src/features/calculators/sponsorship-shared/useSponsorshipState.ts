'use client';

import { useReducer } from 'react';
import type { IndustryId } from '@/lib/engagementBenchmarks';
import type { DealType, SponsorshipContentType } from '@/lib/sponsorshipModel';
import { decodeSponsorshipState } from '@/lib/sponsorshipShareCodec';
import type { SponsorshipPlatformConfig } from './sponsorshipConfigs';

export interface SponsorshipState {
  followers: number;
  engagementRate: number;
  contentType: SponsorshipContentType;
  dealType: DealType;
  industryId: IndustryId;
  dealsPerMonth: number;
}

type Action =
  | { type: 'SET_FOLLOWERS'; payload: number }
  | { type: 'SET_ENGAGEMENT_RATE'; payload: number }
  | { type: 'SET_CONTENT_TYPE'; payload: SponsorshipContentType }
  | { type: 'SET_DEAL_TYPE'; payload: DealType }
  | { type: 'SET_INDUSTRY'; payload: IndustryId }
  | { type: 'SET_DEALS_PER_MONTH'; payload: number };

function reducer(state: SponsorshipState, action: Action): SponsorshipState {
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
}

function getInitialState(config: SponsorshipPlatformConfig): SponsorshipState {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('c');
    if (code) {
      const decoded = decodeSponsorshipState(code);
      if (decoded && decoded.platform === config.platform) {
        return {
          followers: decoded.followers,
          engagementRate: decoded.engagementRate,
          contentType: decoded.contentType as SponsorshipContentType,
          dealType: decoded.dealType as DealType,
          industryId: decoded.industryId,
          dealsPerMonth: decoded.dealsPerMonth,
        };
      }
    }
  }
  return {
    followers: config.defaultFollowers,
    engagementRate: config.defaultEngagementRate,
    contentType: config.defaultContentType,
    dealType: config.defaultDealType,
    industryId: config.defaultIndustryId,
    dealsPerMonth: config.defaultDealsPerMonth,
  };
}

export function useSponsorshipState(config: SponsorshipPlatformConfig) {
  const [state, dispatch] = useReducer(reducer, config, getInitialState);
  return { state, dispatch } as const;
}
