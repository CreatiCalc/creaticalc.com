import type { NicheId } from './youtubeEarningsModel';
import type { FAQItem } from '@/features/calculators/shared/types';

export interface NichePageData {
  nicheId: NicheId;
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  pageDescription: string;
  howItWorks: string;
  faq: FAQItem[];
}

export const NICHE_PAGES: NichePageData[] = [
  {
    nicheId: 'finance',
    slug: 'finance',
    name: 'Finance & Business',
    title: 'YouTube Finance Money Calculator — Estimate Finance Channel Earnings',
    metaDescription:
      'Free YouTube finance money calculator. Estimate how much finance and business YouTubers make with CPM rates of $18–$45. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Finance Money Calculator',
    ogDescription: 'Estimate finance & business YouTube channel earnings. CPM: $18–$45.',
    pageDescription:
      'Estimate your YouTube finance channel earnings based on daily views. Finance and business content earns the highest CPM on YouTube, with rates of $18–$45 per 1,000 impressions.',
    howItWorks:
      'Finance and business content consistently commands the highest ad rates on YouTube. Advertisers in banking, investing, insurance, and fintech bid aggressively for this audience, driving CPMs to $18–$45. This calculator uses finance-specific RPM data to project your earnings. The high CPM means even modest view counts can generate significant revenue — a finance channel with 10,000 daily views can earn $3,000–$7,000 per month.',
    faq: [
      {
        question: 'How much do finance YouTubers make per 1,000 views?',
        answer:
          'Finance YouTubers earn between $9.90 and $24.75 per 1,000 views (RPM), which translates to a CPM of $18–$45. This is the highest-paying niche on YouTube because financial advertisers (banks, investment platforms, insurance companies, and fintech startups) bid aggressively for this audience.',
      },
      {
        question: 'How much does a finance YouTube channel make with 100K daily views?',
        answer:
          'A finance YouTube channel with 100,000 daily views can earn roughly $30,000–$75,000 per month. At the mid-range RPM of $16.50 per 1,000 views, that works out to about $50,000/month or $600,000/year. This makes finance one of the few niches where YouTube ad revenue alone can be a six-figure income.',
      },
      {
        question: 'Why does finance content pay so much on YouTube?',
        answer:
          'Finance content pays the highest CPM because financial advertisers have high customer lifetime values. A single new banking customer, investment account, or insurance policy can be worth hundreds or thousands of dollars, so companies are willing to pay $18–$45 per 1,000 ad impressions to reach potential customers. This creates intense bidding competition for ad placements on finance videos.',
      },
      {
        question: 'What types of finance content earn the most on YouTube?',
        answer:
          'Content about investing, stock market analysis, personal finance tips, cryptocurrency, and credit cards tends to earn the most. Videos reviewing financial products (credit cards, brokerages, budgeting apps) earn particularly well because viewers are in a buying mindset, which advertisers value highly. Tax and real estate content also commands premium CPM rates.',
      },
      {
        question: 'Do finance YouTubers make more from sponsorships or ads?',
        answer:
          'Finance YouTubers often earn more from sponsorships than ad revenue. Finance sponsorship rates are typically $25–$70 per 1,000 views for an integrated mention, compared to $9.90–$24.75 RPM from ads. A finance video with 50,000 views could earn $500–$1,250 from ads but $1,250–$3,500 from a single sponsorship. Many top finance creators earn 2–3x more from brand deals than ad revenue.',
      },
      {
        question: 'How many views do finance YouTubers need to make a full-time income?',
        answer:
          'Thanks to high CPM rates, finance YouTubers need relatively fewer views to earn a full-time income. At the mid-range RPM of $16.50, you need roughly 4,000 daily views (120,000 monthly) to earn $2,000/month from ad revenue alone. Compare this to gaming or entertainment, where you might need 40,000+ daily views for the same income.',
      },
    ],
  },
  {
    nicheId: 'tech',
    slug: 'technology',
    name: 'Technology',
    title: 'YouTube Tech Money Calculator — Estimate Tech Channel Earnings',
    metaDescription:
      'Free YouTube technology money calculator. Estimate how much tech YouTubers make with CPM rates of $8–$18. Calculate daily, monthly, and yearly tech channel earnings.',
    ogTitle: 'YouTube Tech Money Calculator',
    ogDescription: 'Estimate technology YouTube channel earnings. CPM: $8–$18.',
    pageDescription:
      'Estimate your YouTube tech channel earnings based on daily views. Technology content earns strong CPM rates of $8–$18 per 1,000 impressions, making it one of the highest-paying niches.',
    howItWorks:
      'Technology content attracts advertisers from hardware companies, software platforms, cloud services, and consumer electronics brands. With CPMs of $8–$18, tech channels earn well above the YouTube average. This calculator uses tech-specific RPM data to give you accurate earnings projections. Review and tutorial content tends to earn at the higher end because viewers are often in a purchasing mindset.',
    faq: [
      {
        question: 'How much do tech YouTubers make per 1,000 views?',
        answer:
          'Tech YouTubers earn between $4.40 and $9.90 per 1,000 views (RPM), with CPM rates of $8–$18. This places technology as the second-highest paying niche on YouTube, behind only finance and business content.',
      },
      {
        question: 'How much does a tech YouTube channel make with 100K daily views?',
        answer:
          'A tech YouTube channel with 100,000 daily views can earn roughly $13,000–$30,000 per month. At the mid-range RPM of $6.60, that works out to about $20,000/month or $240,000/year from ad revenue alone.',
      },
      {
        question: 'What type of tech content earns the most on YouTube?',
        answer:
          'Product reviews, comparison videos, and "best of" lists tend to earn the highest CPM in the tech niche because viewers are actively researching purchases. Software tutorials and SaaS-related content also command premium rates because enterprise software advertisers have high customer lifetime values. Unboxing videos and general tech news earn mid-range CPMs.',
      },
      {
        question: 'Do tech YouTubers earn more from affiliate links than ads?',
        answer:
          'Many tech YouTubers earn more from affiliate links than ad revenue. Amazon Associates typically pays 1–4% commission on electronics, and some tech affiliate programs pay even more. A tech review channel with 50,000 views per video might earn $200–$500 in ad revenue but $500–$2,000+ from affiliate commissions if viewers purchase the reviewed products.',
      },
      {
        question: 'How many views do tech YouTubers need to earn $5,000/month?',
        answer:
          'At the mid-range tech RPM of $6.60 per 1,000 views, you need about 25,000 daily views (750,000 monthly views) to earn $5,000/month from ads alone. With sponsorships and affiliate income added, many tech creators reach this milestone with 10,000–15,000 daily views.',
      },
    ],
  },
  {
    nicheId: 'education',
    slug: 'education',
    name: 'Education',
    title: 'YouTube Education Money Calculator — Estimate Education Channel Earnings',
    metaDescription:
      'Free YouTube education money calculator. Estimate how much educational YouTubers make with CPM rates of $5–$12. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Education Money Calculator',
    ogDescription: 'Estimate education YouTube channel earnings. CPM: $5–$12.',
    pageDescription:
      'Estimate your YouTube education channel earnings based on daily views. Educational content earns CPM rates of $5–$12 per 1,000 impressions with strong audience retention.',
    howItWorks:
      'Education content attracts advertisers from online learning platforms, educational software, textbook companies, and course creators. With CPMs of $5–$12, education channels earn above-average rates. This calculator uses education-specific RPM data for accurate projections. Educational content also benefits from strong long-term viewership — tutorial and explainer videos continue generating views for years after upload.',
    faq: [
      {
        question: 'How much do educational YouTubers make per 1,000 views?',
        answer:
          'Educational YouTubers earn between $2.75 and $6.60 per 1,000 views (RPM), with CPM rates of $5–$12. Education is a mid-to-high paying niche, with rates varying based on subject matter. STEM and professional development content tends to earn at the higher end.',
      },
      {
        question: 'How much does an education YouTube channel make with 50K daily views?',
        answer:
          'An education YouTube channel with 50,000 daily views can earn roughly $4,000–$10,000 per month. At the mid-range RPM of $4.40, that works out to about $6,600/month or $79,000/year from ad revenue alone.',
      },
      {
        question: 'What type of educational content earns the most on YouTube?',
        answer:
          'Professional development, coding tutorials, and business education tend to earn the highest CPM in the education niche. Content targeting adult learners who might purchase courses, certifications, or professional tools attracts premium advertisers. Language learning, test preparation, and academic tutoring also command solid CPM rates.',
      },
      {
        question: 'Do education videos keep earning money long-term?',
        answer:
          'Yes, educational content is among the most "evergreen" on YouTube. A well-made tutorial or explainer video can continue generating views and revenue for years after upload. This is one of the biggest advantages of the education niche — your library of content builds passive income over time, unlike trending or news-based content that rapidly loses relevance.',
      },
      {
        question: 'Can you make money with a small education YouTube channel?',
        answer:
          'Education channels can be profitable even with modest view counts thanks to above-average CPM rates and strong sponsorship opportunities. Online course platforms and educational apps often sponsor smaller education channels. Additionally, many education creators earn significant income by selling their own courses, which can be promoted through their YouTube content.',
      },
    ],
  },
  {
    nicheId: 'health',
    slug: 'health',
    name: 'Health & Fitness',
    title: 'YouTube Health & Fitness Money Calculator — Estimate Channel Earnings',
    metaDescription:
      'Free YouTube health and fitness money calculator. Estimate how much health YouTubers make with CPM rates of $5–$12. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Health & Fitness Money Calculator',
    ogDescription: 'Estimate health & fitness YouTube channel earnings. CPM: $5–$12.',
    pageDescription:
      'Estimate your YouTube health and fitness channel earnings based on daily views. Health content earns CPM rates of $5–$12 per 1,000 impressions.',
    howItWorks:
      'Health and fitness content attracts advertisers from supplement brands, fitness equipment companies, health apps, and wellness products. With CPMs of $5–$12, health channels earn above-average rates. This calculator uses health-specific RPM data for accurate projections. Workout and nutrition content also performs well for sponsorships, as viewers trust creator recommendations for products they use personally.',
    faq: [
      {
        question: 'How much do health and fitness YouTubers make per 1,000 views?',
        answer:
          'Health and fitness YouTubers earn between $2.75 and $6.60 per 1,000 views (RPM), with CPM rates of $5–$12. Specific sub-niches like medical health information or specialized training can earn toward the higher end of this range.',
      },
      {
        question: 'How much does a fitness YouTube channel make with 50K daily views?',
        answer:
          'A fitness YouTube channel with 50,000 daily views can earn roughly $4,000–$10,000 per month from ad revenue. At the mid-range RPM of $4.40, that works out to about $6,600/month. Many fitness creators earn 2–3x more from sponsorships and affiliate links for supplements and equipment.',
      },
      {
        question: 'What health and fitness content earns the most on YouTube?',
        answer:
          'Weight loss transformations, workout programs, nutrition guides, and medical health information tend to earn the highest CPM. Content that promotes a specific goal (losing weight, building muscle, improving flexibility) attracts advertisers who sell products and services related to those goals. Mental health and wellness content is a growing high-CPM subcategory.',
      },
      {
        question: 'Do fitness YouTubers make more from sponsorships or ads?',
        answer:
          'Most successful fitness YouTubers earn significantly more from sponsorships than ad revenue. Supplement companies, fitness apps, and equipment brands typically pay $15–$40 per 1,000 views for sponsored content. A fitness video with 100,000 views might earn $275–$660 in ad revenue but $1,500–$4,000 from a single sponsorship.',
      },
      {
        question: 'How many subscribers do fitness YouTubers need to make money?',
        answer:
          'You need at least 1,000 subscribers and 4,000 watch hours to join the YouTube Partner Program. However, fitness creators with smaller audiences often monetize through affiliate links for supplements and equipment before reaching YPP thresholds. Once monetized, a fitness channel with 5,000–10,000 daily views can earn $500–$2,000/month from ads alone.',
      },
    ],
  },
  {
    nicheId: 'beauty',
    slug: 'beauty',
    name: 'Beauty & Fashion',
    title: 'YouTube Beauty Money Calculator — Estimate Beauty Channel Earnings',
    metaDescription:
      'Free YouTube beauty and fashion money calculator. Estimate how much beauty YouTubers make with CPM rates of $3–$10. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Beauty Money Calculator',
    ogDescription: 'Estimate beauty & fashion YouTube channel earnings. CPM: $3–$10.',
    pageDescription:
      'Estimate your YouTube beauty and fashion channel earnings based on daily views. Beauty content earns CPM rates of $3–$10 per 1,000 impressions.',
    howItWorks:
      'Beauty and fashion content attracts advertisers from cosmetics brands, skincare companies, fashion retailers, and subscription box services. With CPMs of $3–$10, beauty channels earn moderate ad rates. This calculator uses beauty-specific RPM data for accurate projections. Beauty is one of the most sponsorship-friendly niches, with creators often earning more from brand deals than ad revenue.',
    faq: [
      {
        question: 'How much do beauty YouTubers make per 1,000 views?',
        answer:
          'Beauty and fashion YouTubers earn between $1.65 and $5.50 per 1,000 views (RPM), with CPM rates of $3–$10. Luxury beauty and skincare content tends to earn toward the higher end, while fast-fashion hauls earn at the lower end.',
      },
      {
        question: 'How much does a beauty YouTube channel make with 100K daily views?',
        answer:
          'A beauty YouTube channel with 100,000 daily views can earn roughly $5,000–$17,000 per month from ad revenue. At the mid-range RPM of $3.30, that works out to about $10,000/month. However, beauty creators with this audience size typically earn significantly more from sponsorships and affiliate commissions.',
      },
      {
        question: 'Do beauty YouTubers make more from brand deals or ads?',
        answer:
          'Beauty YouTubers almost always earn more from brand deals than ad revenue. Cosmetics and skincare brands pay premium rates for authentic creator endorsements, typically $10–$30 per 1,000 views. A beauty video with 50,000 views might earn $80–$275 in ad revenue but $500–$1,500 from a single brand partnership.',
      },
      {
        question: 'What type of beauty content earns the most on YouTube?',
        answer:
          'Product reviews, "get ready with me" videos, and tutorials for specific looks tend to earn the most because viewers are in a buying mindset. Luxury beauty content commands higher CPM rates than drugstore or fast-fashion content. Skincare routines and dermatologist-backed content also earn well due to the high-value skincare advertising market.',
      },
      {
        question: 'How do beauty YouTubers earn from affiliate links?',
        answer:
          'Beauty creators earn affiliate commissions (typically 5–15%) when viewers purchase products through their links. Programs like Amazon Associates, LTK (formerly rewardStyle), and brand-specific affiliate programs are popular. A beauty creator linking products in a tutorial that gets 50,000 views might earn $200–$1,000+ in affiliate commissions, making it a significant income stream alongside ads and sponsorships.',
      },
    ],
  },
  {
    nicheId: 'travel',
    slug: 'travel',
    name: 'Travel',
    title: 'YouTube Travel Money Calculator — Estimate Travel Channel Earnings',
    metaDescription:
      'Free YouTube travel money calculator. Estimate how much travel YouTubers make with CPM rates of $4–$10. Calculate daily, monthly, and yearly travel channel earnings.',
    ogTitle: 'YouTube Travel Money Calculator',
    ogDescription: 'Estimate travel YouTube channel earnings. CPM: $4–$10.',
    pageDescription:
      'Estimate your YouTube travel channel earnings based on daily views. Travel content earns CPM rates of $4–$10 per 1,000 impressions.',
    howItWorks:
      'Travel content attracts advertisers from airlines, hotels, booking platforms, travel gear companies, and tourism boards. With CPMs of $4–$10, travel channels earn moderate-to-good ad rates. This calculator uses travel-specific RPM data for accurate projections. Travel content often performs well in seasonal cycles, with higher CPMs during peak travel planning periods.',
    faq: [
      {
        question: 'How much do travel YouTubers make per 1,000 views?',
        answer:
          'Travel YouTubers earn between $2.20 and $5.50 per 1,000 views (RPM), with CPM rates of $4–$10. Travel content targeting luxury destinations and US/European audiences tends to earn at the higher end of this range.',
      },
      {
        question: 'How much does a travel YouTube channel make with 50K daily views?',
        answer:
          'A travel YouTube channel with 50,000 daily views can earn roughly $3,300–$8,250 per month from ad revenue. At the mid-range RPM of $3.85, that works out to about $5,800/month. Travel creators often supplement this with tourism board sponsorships and affiliate commissions from booking platforms.',
      },
      {
        question: 'What type of travel content earns the most on YouTube?',
        answer:
          'Travel guides, hotel and airline reviews, and "cost of living" comparisons tend to earn the highest CPM because viewers are researching purchases. Budget travel tips and destination guides also perform well. Content about luxury travel attracts premium advertisers, while backpacking and budget travel content earns lower CPM but often gets more views.',
      },
      {
        question: 'Do travel YouTubers get paid to travel?',
        answer:
          "Many established travel YouTubers receive sponsored trips, free accommodations, and press trips from tourism boards and hospitality brands. These partnerships can be worth $2,000–$20,000+ per trip depending on the creator's audience size. Combined with ad revenue and affiliate commissions from booking platforms, successful travel creators can fund their travels entirely through their channel.",
      },
      {
        question: 'How do travel YouTubers earn from affiliate marketing?',
        answer:
          'Travel creators earn commissions from booking platforms (Booking.com, Hotels.com, Airbnb), travel insurance, VPN services, travel gear on Amazon, and flight deal services. Commission rates typically range from 3–10% of bookings. A well-placed affiliate link in a destination guide with 100,000 views can generate $500–$3,000 in commissions.',
      },
    ],
  },
  {
    nicheId: 'food',
    slug: 'food',
    name: 'Food & Cooking',
    title: 'YouTube Food Money Calculator — Estimate Food Channel Earnings',
    metaDescription:
      'Free YouTube food and cooking money calculator. Estimate how much food YouTubers make with CPM rates of $3–$8. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Food Money Calculator',
    ogDescription: 'Estimate food & cooking YouTube channel earnings. CPM: $3–$8.',
    pageDescription:
      'Estimate your YouTube food and cooking channel earnings based on daily views. Food content earns CPM rates of $3–$8 per 1,000 impressions.',
    howItWorks:
      'Food and cooking content attracts advertisers from kitchen appliance brands, meal kit services, grocery delivery platforms, and food product companies. With CPMs of $3–$8, food channels earn moderate ad rates. This calculator uses food-specific RPM data for accurate projections. Recipe and cooking content is highly evergreen, with videos continuing to earn revenue for years after publication.',
    faq: [
      {
        question: 'How much do food YouTubers make per 1,000 views?',
        answer:
          'Food and cooking YouTubers earn between $1.65 and $4.40 per 1,000 views (RPM), with CPM rates of $3–$8. Recipe channels with US-based audiences tend to earn toward the higher end, while food entertainment content earns at the lower end.',
      },
      {
        question: 'How much does a food YouTube channel make with 100K daily views?',
        answer:
          'A food YouTube channel with 100,000 daily views can earn roughly $5,000–$13,000 per month from ad revenue. At the mid-range RPM of $2.75, that works out to about $8,250/month. Many food creators earn additional income through cookbook sales, sponsored content with food brands, and affiliate links for kitchen equipment.',
      },
      {
        question: 'What type of food content earns the most on YouTube?',
        answer:
          'Recipe tutorials, kitchen equipment reviews, and meal prep guides tend to earn the highest CPM because they attract viewers who are ready to purchase ingredients and tools. Content featuring premium kitchen appliances and specialized cooking techniques also earns well. Mukbang and food challenge content earns lower CPM but can attract very large audiences.',
      },
      {
        question: 'Is food content on YouTube evergreen?',
        answer:
          'Yes, food and recipe content is among the most evergreen on YouTube. A well-optimized recipe video can continue generating views and revenue for 3–5+ years after upload. Seasonal recipes (holiday dishes, summer grilling) see annual traffic spikes. This makes food channels excellent for building long-term passive income.',
      },
      {
        question: 'How do food YouTubers earn beyond ad revenue?',
        answer:
          'Food creators diversify income through cookbook and recipe e-book sales, sponsored content with food brands and kitchen equipment companies, affiliate links for kitchen tools and ingredients, cooking courses, and merchandise. Many successful food YouTubers earn more from these additional streams than from YouTube ad revenue alone.',
      },
    ],
  },
  {
    nicheId: 'lifestyle',
    slug: 'lifestyle',
    name: 'Lifestyle',
    title: 'YouTube Lifestyle Money Calculator — Estimate Lifestyle Channel Earnings',
    metaDescription:
      'Free YouTube lifestyle money calculator. Estimate how much lifestyle YouTubers make with CPM rates of $2–$6. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Lifestyle Money Calculator',
    ogDescription: 'Estimate lifestyle YouTube channel earnings. CPM: $2–$6.',
    pageDescription:
      'Estimate your YouTube lifestyle channel earnings based on daily views. Lifestyle content earns CPM rates of $2–$6 per 1,000 impressions.',
    howItWorks:
      'Lifestyle content attracts a broad range of advertisers from consumer brands, subscription services, home goods companies, and direct-to-consumer products. With CPMs of $2–$6, lifestyle channels earn moderate ad rates. This calculator uses lifestyle-specific RPM data for accurate projections. Lifestyle creators often excel at sponsorships due to the authentic, trust-based relationship with their audience.',
    faq: [
      {
        question: 'How much do lifestyle YouTubers make per 1,000 views?',
        answer:
          'Lifestyle YouTubers earn between $1.10 and $3.30 per 1,000 views (RPM), with CPM rates of $2–$6. Lifestyle content covering productivity, minimalism, and home organization tends to earn at the higher end.',
      },
      {
        question: 'How much does a lifestyle YouTube channel make with 50K daily views?',
        answer:
          'A lifestyle YouTube channel with 50,000 daily views can earn roughly $1,650–$5,000 per month from ad revenue. At the mid-range RPM of $2.20, that works out to about $3,300/month. Lifestyle creators typically supplement this significantly with brand sponsorships and affiliate marketing.',
      },
      {
        question: 'What type of lifestyle content earns the most on YouTube?',
        answer:
          'Productivity and organization content, "day in my life" vlogs featuring aspirational lifestyles, home tours, and product recommendation videos tend to earn the most. Content that naturally features products (home office setups, morning routines with products) attracts both higher CPM and more sponsorship opportunities.',
      },
      {
        question: 'How do lifestyle YouTubers get sponsorships?',
        answer:
          'Lifestyle creators attract sponsorships from brands seeking authentic product placements in relatable content. Common sponsors include subscription boxes, home goods brands, productivity apps, and fashion companies. Rates typically range from $10–$25 per 1,000 views. Lifestyle creators with engaged audiences can earn $500–$5,000+ per sponsored video depending on audience size.',
      },
      {
        question: 'Is lifestyle a good niche to start on YouTube?',
        answer:
          'Lifestyle is one of the most accessible niches for new YouTubers because it requires minimal equipment and covers topics anyone can create content about. While CPM rates are moderate ($2–$6), the niche offers strong sponsorship potential and the flexibility to pivot into higher-paying sub-niches like productivity, home organization, or wellness as your channel grows.',
      },
    ],
  },
  {
    nicheId: 'entertainment',
    slug: 'entertainment',
    name: 'Entertainment',
    title: 'YouTube Entertainment Money Calculator — Estimate Channel Earnings',
    metaDescription:
      'Free YouTube entertainment money calculator. Estimate how much entertainment YouTubers make with CPM rates of $1.50–$4. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Entertainment Money Calculator',
    ogDescription: 'Estimate entertainment YouTube channel earnings. CPM: $1.50–$4.',
    pageDescription:
      'Estimate your YouTube entertainment channel earnings based on daily views. Entertainment content earns CPM rates of $1.50–$4 per 1,000 impressions.',
    howItWorks:
      'Entertainment content (comedy, reactions, challenges, pranks) attracts broad consumer advertisers but at lower CPM rates of $1.50–$4. This calculator uses entertainment-specific RPM data for accurate projections. While CPM is lower, entertainment channels often generate massive view counts, compensating for the lower per-view earnings. The key to profitability in entertainment is volume and consistency.',
    faq: [
      {
        question: 'How much do entertainment YouTubers make per 1,000 views?',
        answer:
          'Entertainment YouTubers earn between $0.83 and $2.20 per 1,000 views (RPM), with CPM rates of $1.50–$4. This is one of the lower-paying niches on YouTube, but entertainment channels often generate much higher view counts than niche-specific channels.',
      },
      {
        question: 'How much does an entertainment YouTube channel make with 1M daily views?',
        answer:
          'An entertainment channel with 1,000,000 daily views can earn roughly $25,000–$66,000 per month from ad revenue. At the mid-range RPM of $1.38, that works out to about $41,000/month. Top entertainment creators with this traffic level also earn significant income from sponsorships and merchandise.',
      },
      {
        question: 'Why does entertainment content have lower CPM on YouTube?',
        answer:
          'Entertainment content (comedy, reactions, challenges) has lower CPM because advertisers in this space sell lower-priced consumer goods with lower profit margins compared to finance or tech products. Additionally, entertainment audiences tend to be younger with less purchasing power, making advertisers less willing to bid high for ad placements.',
      },
      {
        question: 'How do entertainment YouTubers make money beyond ads?',
        answer:
          'Successful entertainment creators diversify through merchandise sales, live show tickets, brand sponsorships, fan funding (Patreon, Super Chat), and licensing deals. Many top entertainment YouTubers earn more from merchandise and brand deals than ad revenue. MrBeast, for example, generates most of his revenue from brand partnerships and his consumer product lines.',
      },
      {
        question: 'How many views do entertainment YouTubers need to make $10,000/month?',
        answer:
          'At the mid-range entertainment RPM of $1.38, you need about 240,000 daily views (7.2 million monthly views) to earn $10,000/month from ads alone. However, with sponsorships and merchandise added, many entertainment creators reach this income level with 50,000–100,000 daily views.',
      },
    ],
  },
  {
    nicheId: 'gaming',
    slug: 'gaming',
    name: 'Gaming',
    title: 'YouTube Gaming Money Calculator — Estimate Gaming Channel Earnings',
    metaDescription:
      'Free YouTube gaming money calculator. Estimate how much gaming YouTubers make with CPM rates of $1.50–$5. Calculate daily, monthly, and yearly gaming channel earnings.',
    ogTitle: 'YouTube Gaming Money Calculator',
    ogDescription: 'Estimate gaming YouTube channel earnings. CPM: $1.50–$5.',
    pageDescription:
      'Estimate your YouTube gaming channel earnings based on daily views. Gaming content earns CPM rates of $1.50–$5 per 1,000 impressions.',
    howItWorks:
      'Gaming content attracts advertisers from game publishers, hardware manufacturers, energy drink brands, and peripheral companies. With CPMs of $1.50–$5, gaming channels earn lower-than-average ad rates. This calculator uses gaming-specific RPM data for accurate projections. Despite lower CPM, gaming is one of the largest and most active niches on YouTube, with massive potential for sponsorships and affiliate income from gaming hardware.',
    faq: [
      {
        question: 'How much do gaming YouTubers make per 1,000 views?',
        answer:
          'Gaming YouTubers earn between $0.83 and $2.75 per 1,000 views (RPM), with CPM rates of $1.50–$5. While this is one of the lower-paying niches, gaming channels often attract very high view counts and strong audience loyalty, which makes up for lower per-view earnings.',
      },
      {
        question: 'How much does a gaming YouTube channel make with 100K daily views?',
        answer:
          'A gaming YouTube channel with 100,000 daily views can earn roughly $2,500–$8,250 per month from ad revenue. At the mid-range RPM of $1.65, that works out to about $5,000/month. Gaming creators often earn significantly more from sponsorships, affiliate links for gaming hardware, and live streaming revenue.',
      },
      {
        question: 'Why does gaming content have lower CPM than other niches?',
        answer:
          'Gaming CPMs are lower because gaming audiences skew younger with less disposable income, and gaming advertisers typically sell lower-margin products. Additionally, the sheer volume of gaming content on YouTube creates more ad inventory, driving down the price per impression. However, specific gaming sub-niches (PC hardware reviews, esports) can command higher CPMs.',
      },
      {
        question: 'What type of gaming content earns the most on YouTube?',
        answer:
          'Gaming hardware reviews, build guides, and comparison videos earn the highest CPM because they attract tech-focused advertisers. Game reviews and "best games" lists also earn well. Let\'s Plays and live stream highlights earn lower CPM but generate high volumes of content. Esports commentary and competitive gaming content attracts premium sponsors.',
      },
      {
        question: 'How do gaming YouTubers make money beyond YouTube ads?',
        answer:
          'Gaming creators diversify income through Twitch/YouTube live streaming (donations, subscriptions), game sponsorships ($5,000–$50,000+ per sponsored video for large channels), affiliate links for gaming peripherals and hardware, merchandise sales, and tournament prize money. Many full-time gaming creators earn 50–70% of their income from sources other than YouTube ad revenue.',
      },
      {
        question: 'How many subscribers do gaming YouTubers need to go full-time?',
        answer:
          'Due to lower CPM, gaming YouTubers typically need a larger audience to go full-time compared to other niches. At the mid-range gaming RPM of $1.65, you need roughly 40,000 daily views to earn $2,000/month from ads. However, many gaming creators go full-time with 20,000+ daily views by supplementing with streaming income, sponsorships, and affiliate revenue.',
      },
    ],
  },
];

export const NICHE_SLUGS = NICHE_PAGES.map((n) => n.slug);

export function getNichePageData(slug: string): NichePageData | undefined {
  return NICHE_PAGES.find((n) => n.slug === slug);
}
