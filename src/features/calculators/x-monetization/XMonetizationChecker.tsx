'use client';

import { useMemo } from 'react';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import ButtonToggle from '@/components/ui/ButtonToggle';
import FollowerSliderInput from '@/features/calculators/shared/FollowerSliderInput';
import ResultCard from '@/features/calculators/shared/ResultCard';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import ProgramCard from './ProgramCard';
import { useMonetizationState } from './useMonetizationState';
import { checkEligibility } from '@/lib/xMonetizationModel';

// ---------------------------------------------------------------------------
// Yes / No toggle helpers
// ---------------------------------------------------------------------------

const YES_NO_OPTIONS = [
  { value: 'yes' as const, label: 'Yes' },
  { value: 'no' as const, label: 'No' },
];

function boolToYesNo(v: boolean): 'yes' | 'no' {
  return v ? 'yes' : 'no';
}

function yesNoToBool(v: 'yes' | 'no'): boolean {
  return v === 'yes';
}

// ---------------------------------------------------------------------------
// Impression slider ticks
// ---------------------------------------------------------------------------

const IMPRESSION_TICKS = [
  { value: 100_000, label: '100K' },
  { value: 1_000_000, label: '1M' },
  { value: 5_000_000, label: '5M' },
  { value: 50_000_000, label: '50M' },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function XMonetizationChecker() {
  const {
    state,
    setFollowers,
    setHasXPremium,
    setAccountAgeMonths,
    setOrganicImpressions,
    setHasHostedSpaces,
    setHasPostedLast30Days,
  } = useMonetizationState();

  const result = useMemo(() => checkEligibility(state), [state]);

  return (
    <div className="space-y-8">
      {/* ----------------------------------------------------------------- */}
      {/* Inputs */}
      {/* ----------------------------------------------------------------- */}
      <Card>
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Your X Stats</h2>

          {/* Followers */}
          <FollowerSliderInput value={state.followers} onChange={setFollowers} />

          {/* X Premium */}
          <ButtonToggle
            value={boolToYesNo(state.hasXPremium)}
            onChange={(v) => setHasXPremium(yesNoToBool(v))}
            options={YES_NO_OPTIONS}
            label="X Premium subscriber?"
            ariaLabel="X Premium subscription status"
          />

          {/* Account age */}
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Account age (months)"
              value={state.accountAgeMonths}
              min={0}
              max={240}
              step={1}
              onChange={(v) => setAccountAgeMonths(Math.max(0, Math.min(v, 240)))}
            />
          </div>

          {/* Organic impressions */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Slider
                label="Organic impressions (last 3 months)"
                value={state.organicImpressions3Months}
                min={1_000}
                max={100_000_000}
                step={1_000}
                logScale
                ticks={IMPRESSION_TICKS}
                onChange={setOrganicImpressions}
                formatValue={(v) => {
                  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
                  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
                  return v.toLocaleString();
                }}
              />
              <NumberInput
                label="Or enter exact impressions"
                value={state.organicImpressions3Months}
                min={0}
                max={100_000_000}
                step={10_000}
                onChange={(v) => setOrganicImpressions(Math.max(0, Math.min(v, 100_000_000)))}
              />
            </div>
            <p className="mt-1 text-xs text-muted">
              Find this in X Analytics &gt; Posts &gt; Impressions. Add up the last 90 days.
            </p>
          </div>

          {/* Hosted Spaces */}
          <ButtonToggle
            value={boolToYesNo(state.hasHostedSpaces)}
            onChange={(v) => setHasHostedSpaces(yesNoToBool(v))}
            options={YES_NO_OPTIONS}
            label="Have you hosted X Spaces before?"
            ariaLabel="Spaces hosting history"
          />

          {/* Posted last 30 days */}
          <ButtonToggle
            value={boolToYesNo(state.hasPostedLast30Days)}
            onChange={(v) => setHasPostedLast30Days(yesNoToBool(v))}
            options={YES_NO_OPTIONS}
            label="Posted in the last 30 days?"
            ariaLabel="Recent posting activity"
          />
        </div>
      </Card>

      {/* ----------------------------------------------------------------- */}
      {/* Results summary */}
      {/* ----------------------------------------------------------------- */}
      <ResultCard
        label="Programs You Qualify For"
        value={`${result.qualifiedCount} of ${result.totalPrograms}`}
        highlight={result.qualifiedCount > 1}
        badge={
          result.qualifiedCount === result.totalPrograms
            ? 'All unlocked'
            : result.qualifiedCount > 1
              ? 'Getting there'
              : undefined
        }
        comparison={
          result.qualifiedCount < result.totalPrograms
            ? `${result.totalPrograms - result.qualifiedCount} program${result.totalPrograms - result.qualifiedCount === 1 ? '' : 's'} remaining`
            : 'You meet all requirements for every X monetization program.'
        }
      />

      {/* ----------------------------------------------------------------- */}
      {/* Program cards */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid gap-4 lg:grid-cols-2">
        {result.programs.map((program) => (
          <ProgramCard key={program.program} program={program} />
        ))}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Action plan */}
      {/* ----------------------------------------------------------------- */}
      {result.tips.length > 0 && (
        <CollapsibleSection
          title="Action Plan"
          defaultOpen
          preview={`${result.tips.length} tip${result.tips.length === 1 ? '' : 's'}`}
        >
          <ul className="space-y-3">
            {result.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="mt-0.5 flex-shrink-0 text-primary" aria-hidden="true">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      )}
    </div>
  );
}
