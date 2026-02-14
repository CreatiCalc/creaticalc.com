import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { YouTubeMoneyCalculator } from '@/features/calculators/youtube-money';
import type { FAQItem } from '@/features/calculators/shared/types';
import { NICHE_PAGES } from '@/lib/nichePageData';

export const metadata: Metadata = {
  title: 'YouTube Money Calculator — Estimate Your Earnings',
  description:
    'Free YouTube money calculator. Estimate how much money YouTubers make based on views, CPM, and niche. Calculate daily, monthly, and yearly YouTube earnings.',
  openGraph: {
    title: 'YouTube Money Calculator — Estimate Your Earnings',
    description:
      'Estimate how much money YouTubers make based on views, CPM, and niche. Free calculator for daily, monthly, and yearly YouTube revenue.',
    url: '/youtube-money-calculator',
  },
  alternates: {
    canonical: '/youtube-money-calculator',
  },
};

const faq: FAQItem[] = [
  {
    question: 'How much money do YouTubers make per view?',
    answer:
      'YouTubers typically earn between $0.001 and $0.045 per view, depending on their niche, audience location, and ad engagement. This translates to a CPM (cost per 1,000 views) of roughly $1.50 to $45. Finance and business channels tend to earn the most per view, while gaming and entertainment channels earn less.',
  },
  {
    question: 'What is CPM on YouTube?',
    answer:
      'CPM stands for "Cost Per Mille" (cost per 1,000 impressions). It represents how much advertisers pay YouTube for every 1,000 ad views on your videos. Your actual revenue is based on RPM (Revenue Per Mille), which is your earnings per 1,000 video views after YouTube takes its 45% cut. Our calculator uses estimated CPM ranges by niche to project your earnings.',
  },
  {
    question: 'How much does YouTube pay for 1 million views?',
    answer:
      'For 1 million views, YouTube creators typically earn between $1,500 and $45,000, depending on their content niche. A finance channel might earn $18,000–$45,000 per million views, while a gaming channel might earn $1,500–$5,000. These figures vary based on audience demographics, ad engagement rates, and seasonal advertiser demand.',
  },
  {
    question: 'What YouTube niche pays the most?',
    answer:
      'Finance and business content consistently pays the highest CPM on YouTube, with rates ranging from $18 to $45 per 1,000 views. This is because financial advertisers (banks, investment platforms, insurance companies) bid aggressively for this audience. Technology ($8–$18 CPM) and education ($5–$12 CPM) are also high-paying niches.',
  },
  {
    question: 'How do YouTubers get paid?',
    answer:
      'YouTubers earn money through the YouTube Partner Program (YPP), which requires at least 1,000 subscribers and 4,000 watch hours in the past 12 months. Once accepted, creators earn a share of ad revenue displayed on their videos. YouTube keeps 45% and pays creators 55%. Payments are made monthly through AdSense once the $100 minimum threshold is reached.',
  },
  {
    question: 'Are YouTube earnings estimates accurate?',
    answer:
      'Earnings calculators provide rough estimates based on average CPM rates by niche. Actual earnings vary based on many factors: audience location (US viewers pay more than other regions), viewer ad-blocker usage, video length (longer videos allow mid-roll ads), content type, and seasonal advertiser spending. Use these estimates as a general guide, not an exact prediction.',
  },
  {
    question: 'How can I increase my YouTube earnings?',
    answer:
      'To maximize YouTube revenue, focus on: creating longer videos (8+ minutes) to enable mid-roll ads, targeting high-CPM niches like finance or technology, growing a US/UK audience where ad rates are highest, improving viewer retention to boost ad impressions, and diversifying income through sponsorships, memberships, and merchandise alongside ad revenue.',
  },
  {
    question: 'What is RPM vs CPM on YouTube?',
    answer:
      'CPM (Cost Per Mille) is the amount advertisers pay YouTube for 1,000 ad impressions. RPM (Revenue Per Mille) is the amount creators actually earn per 1,000 video views after YouTube takes its 45% cut. For example, if the CPM is $10, the RPM is roughly $5.50. RPM is the more useful metric for creators because it reflects your actual take-home pay per 1,000 views. Our calculator shows both so you can see exactly how the split works.',
  },
  {
    question: 'Why do YouTube earnings spike in Q4?',
    answer:
      'YouTube ad revenue peaks in October through December because of the holiday advertising cycle. Brands dramatically increase ad spend for Black Friday, Cyber Monday, and Christmas shopping. This drives CPMs up by 30–40% compared to mid-year averages. November typically sees a 30% increase and December a 40% increase in RPM. Conversely, January is the lowest-earning month — ad budgets reset and CPMs can drop 20% below average. Our seasonality toggle models these real fluctuations.',
  },
  {
    question: 'What is the "Per Video" input mode?',
    answer:
      'The Per Video mode lets you estimate earnings based on how many views each video gets and how often you upload, rather than entering total daily views. The calculator converts your inputs to daily views using the formula: daily views = (views per video × uploads per week) / 7. This is useful for smaller creators who think in terms of individual video performance rather than overall channel traffic. Switching to Per Video mode does not change the earnings model — it simply provides an alternative way to enter your view data.',
  },
  {
    question: 'How accurate is the growth rate projection?',
    answer:
      'The growth rate projection uses compound monthly growth, meaning each month builds on the previous one. A 5% monthly growth rate means your views increase by 5% each month compared to the previous month — not 5% of your starting views. Over 12 months, 5% monthly growth means roughly 80% more views by the end of the year. This is realistic for actively growing channels but aggressive for established ones. We recommend starting with 0% (flat) for conservative estimates and adjusting based on your recent channel trends.',
  },
  {
    question: 'Does video length affect YouTube earnings?',
    answer:
      'Yes, video length has a significant impact on YouTube ad revenue. Videos under 8 minutes cannot run mid-roll ads — they only display pre-roll and post-roll ads, which typically reduces RPM by about 30%. Videos between 8 and 20 minutes can include mid-roll ads and represent the standard earning potential. Videos over 20 minutes allow multiple mid-roll ad placements, boosting RPM by roughly 30% compared to standard-length videos. Our calculator includes a Video Length selector that adjusts your earnings estimate based on these real differences in ad load.',
  },
  {
    question: 'How does audience geography affect YouTube earnings?',
    answer:
      'Audience location is one of the biggest factors in YouTube ad revenue. Views from the US, UK, Canada, and Australia pay 3 to 5 times more than views from regions like India, Southeast Asia, or Latin America, because advertisers in high-income countries bid significantly more for ad placements. A channel with 100,000 daily views from a mostly US audience can earn 3x more than a channel with the same views from a global audience. Our Audience Geography slider lets you model this by adjusting the percentage of your viewers from high-CPM regions, with the default set to 50% as a baseline.',
  },
  {
    question: 'What does the milestone timeline show?',
    answer:
      'The milestone timeline appears when you set a monthly growth rate above 0%. It projects when your channel will cross key monthly earnings thresholds: $100, $500, $1,000, $5,000, and $10,000 per month. The projections extend up to 36 months into the future, accounting for your current settings including niche, audience geography, video length, and seasonality. Milestones you have already reached are marked with a green check, future milestones show the projected month and date, and milestones beyond 3 years are grayed out.',
  },
  {
    question: 'How much should I charge for a YouTube sponsorship?',
    answer:
      'Sponsorship rates depend on your niche, views per video, and audience quality. As a rule of thumb, creators charge $15 to $50 per 1,000 views for a standard 30 to 60 second integrated mention in a long-form video. Finance and tech channels command the highest rates ($25 to $70 per 1K views), while gaming and entertainment sit lower ($8 to $18 per 1K views). Dedicated review videos typically cost brands 3 to 5 times more than a mid-roll integration. Shorts sponsorships pay roughly 25 to 40 percent of long-form rates. Our sponsorship estimator calculates a suggested per-video rate based on your current views and niche.',
  },
  {
    question: 'How much do YouTube Shorts pay?',
    answer:
      'YouTube Shorts pay significantly less than long-form videos — roughly $0.01 to $0.07 per 1,000 views (RPM). This is because Shorts ads come from a separate revenue pool where creators receive 45% of allocated ad revenue. Unlike long-form content where niche heavily influences earnings, Shorts RPM is relatively flat across most content categories, though finance and tech Shorts can earn toward the higher end. Use the "Shorts" toggle in our calculator to see projected Shorts earnings. To maximize revenue, many creators use Shorts to drive subscribers who then watch their higher-paying long-form content.',
  },
];

const howItWorks = (
  <>
    <p>
      Our YouTube Money Calculator estimates your potential earnings using RPM (Revenue Per Mille) —
      the amount you actually earn per 1,000 video views. We use industry-average data across 10
      popular content niches to give you low, mid, and high earnings estimates, with optional
      compound growth modeling and seasonal ad-rate adjustments.
    </p>
    <p className="mt-3">
      The formula: your projected monthly views (daily views × days in month × growth factor) are
      divided by 1,000 and multiplied by your niche RPM. If seasonality is enabled, each month uses
      a different RPM multiplier based on real advertising cycles. The 12-month chart shows the
      range between low and high estimates, with the mid estimate as a trend line.
    </p>
    <p className="mt-3">
      Keep in mind that these are estimates based on ad revenue alone. Many successful creators earn
      significantly more through brand sponsorships, affiliate marketing, merchandise, channel
      memberships, and Super Chats. Your actual YouTube ad revenue will also depend on factors like
      viewer geography, ad-blocker usage, and seasonal advertiser demand.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">
      RPM vs CPM vs What Creators Actually Earn
    </h3>
    <p className="mt-2">
      CPM is the advertiser-side metric — what brands pay YouTube for 1,000 ad impressions. But
      YouTube keeps 45% of that revenue. The remaining 55% is your RPM: the actual dollars you earn
      per 1,000 video views. For example, a $10 CPM niche pays creators roughly $5.50 RPM. Our
      calculator displays both values so you can see exactly how much YouTube takes and what you
      keep.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Why Q4 Pays More</h3>
    <p className="mt-2">
      Advertising follows a seasonal cycle tied to consumer spending. In Q4, brands compete
      aggressively for ad placements around Black Friday, Cyber Monday, and the holiday gift season.
      This increased demand pushes ad rates up significantly: November CPMs typically rise 30% and
      December CPMs surge 40% above the annual average. After the holidays, budgets reset — January
      is the lowest-earning month with CPMs dropping about 20% below average. Our seasonality toggle
      applies these real-world multipliers to your projection so you can see the impact across the
      full year.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5">
      <li>
        <Link
          href="/youtube-shorts-money-calculator"
          className="font-medium text-primary hover:underline"
        >
          YouTube Shorts Money Calculator
        </Link>{' '}
        — estimate how much Shorts pay per 1,000 views
      </li>
      <li>
        <Link
          href="/youtube-subscriber-projector"
          className="font-medium text-primary hover:underline"
        >
          YouTube Subscriber Growth Projector
        </Link>{' '}
        — project when you&rsquo;ll hit key subscriber milestones
      </li>
      <li>
        <Link
          href="/instagram-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          Instagram Sponsorship Rate Calculator
        </Link>{' '}
        — find out how much to charge for sponsored Instagram posts
      </li>
      <li>
        <Link
          href="/tiktok-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          TikTok Sponsorship Rate Calculator
        </Link>{' '}
        — calculate your TikTok sponsorship rates
      </li>
      <li>
        <Link
          href="/engagement-rate-benchmarks"
          className="font-medium text-primary hover:underline"
        >
          Engagement Rate Benchmarks 2026
        </Link>{' '}
        — compare engagement rates across all platforms
      </li>
    </ul>
  </>
);

export default function YouTubeMoneyCalculatorPage() {
  return (
    <>
      <CalculatorSchema
        name="YouTube Money Calculator"
        description="Estimate how much money YouTubers make based on views, CPM, and content niche."
        url="/youtube-money-calculator"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'YouTube', path: '/youtube-money-calculator' },
          { name: 'YouTube Money Calculator', path: '/youtube-money-calculator' },
        ]}
      />
      <CalculatorLayout
        title="YouTube Money Calculator"
        description="Estimate your YouTube earnings based on daily views and content niche. See projected daily, monthly, and yearly revenue with growth modeling and seasonal adjustments."
        faq={faq}
        howItWorks={howItWorks}
      >
        <YouTubeMoneyCalculator />

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Browse by Niche</h2>
          <p className="mb-6 text-muted">
            See earnings estimates tailored to your specific content niche. Each calculator uses
            niche-specific CPM and RPM data.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {NICHE_PAGES.map((niche) => (
              <Link
                key={niche.slug}
                href={`/youtube-money-calculator/${niche.slug}`}
                className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {niche.name} Calculator
              </Link>
            ))}
          </div>
        </section>
      </CalculatorLayout>
    </>
  );
}
