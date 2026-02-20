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
    title: 'YouTube Finance Money & Earnings Calculator 2026',
    metaDescription:
      'Free YouTube finance money calculator. Estimate how much finance and business YouTubers make with CPM rates of $18–$45. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Finance Money Calculator',
    ogDescription: 'Estimate finance & business YouTube channel earnings. CPM: $18–$45.',
    pageDescription:
      'Estimate your YouTube finance channel earnings based on daily views. Finance and business content earns the highest CPM on YouTube, with rates of $18–$45 per 1,000 impressions.',
    howItWorks:
      'Finance and business content consistently commands the highest ad rates on YouTube. Advertisers in banking, investing, insurance, and fintech bid aggressively for this audience, driving CPMs to $18–$45. The reason is simple: a single new banking customer, brokerage account, or insurance policy can be worth hundreds or thousands of dollars in lifetime value, so financial companies are willing to pay premium rates for ad placements on finance videos. This calculator uses finance-specific RPM data to project your earnings accurately.\n\nWithin finance, sub-niche selection makes a significant difference in earnings. Personal finance and credit card content tends to earn the highest CPMs because viewers are actively comparing financial products. Stock market analysis and investing tutorials also command premium rates, particularly during earnings season and market volatility. Cryptocurrency content saw inflated CPMs during bull markets but has stabilized to more moderate rates. Tax preparation and real estate investing content earn consistently well year-round, while general budgeting and frugality content earns toward the lower end of the finance range.\n\nSeasonal patterns heavily influence finance channel revenue. Q4 (October through December) is the strongest quarter as financial companies push year-end investment and tax planning products. January sees a spike from New Year financial resolutions and tax season preparation. Q1 broadly remains strong through April due to tax filing deadlines. Summer months (June through August) typically represent the low point for finance CPMs, with rates dropping 20–30% below peak levels. Enabling the seasonality toggle in this calculator accounts for these fluctuations.\n\nBeyond ad revenue, finance YouTubers have some of the most lucrative monetization options of any niche. Course sales are a major revenue stream — creators teaching investing, trading, or personal finance regularly sell courses for $200–$2,000+. Affiliate programs for financial products (brokerage sign-up bonuses, credit card referrals, budgeting apps) can pay $50–$200 per conversion. Sponsorship rates for finance channels run 2–3x higher than ad RPM, with dedicated sponsor integrations for fintech apps and investment platforms commanding $25–$70 per 1,000 views.',
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
    title: 'YouTube Tech Money & Earnings Calculator 2026',
    metaDescription:
      'Free YouTube technology money calculator. Estimate how much tech YouTubers make with CPM rates of $8–$18. Calculate daily, monthly, and yearly tech channel earnings.',
    ogTitle: 'YouTube Tech Money Calculator',
    ogDescription: 'Estimate technology YouTube channel earnings. CPM: $8–$18.',
    pageDescription:
      'Estimate your YouTube tech channel earnings based on daily views. Technology content earns strong CPM rates of $8–$18 per 1,000 impressions, making it one of the highest-paying niches.',
    howItWorks:
      'Technology content attracts advertisers from hardware companies, software platforms, cloud services, and consumer electronics brands. With CPMs of $8–$18, tech channels earn well above the YouTube average. The tech advertising ecosystem is driven by high-margin products and competitive markets — companies launching new phones, laptops, or SaaS tools are willing to pay premium rates to reach an audience that is actively researching purchases. This calculator uses tech-specific RPM data to give you accurate earnings projections.\n\nSub-niche selection within tech creates substantial CPM variation. Enterprise software and SaaS-related content (tutorials for tools like Notion, Figma, or cloud platforms) commands the highest rates because B2B advertisers have extremely high customer lifetime values. Hardware reviews and "best of" comparison videos earn strong CPMs because viewers are in a direct purchase mindset — a viewer watching a laptop comparison is likely about to spend $1,000+. Programming tutorials and coding content earn mid-range CPMs but benefit from high audience retention and evergreen viewership. General tech news and unboxing content earns toward the lower end but attracts larger audiences.\n\nTech CPMs follow a product launch cycle more than a seasonal one. Major launches from Apple, Samsung, Google, and other manufacturers create CPM spikes as advertisers compete for attention during launch windows. Back-to-school season (July through September) drives strong CPMs for laptop, tablet, and accessory content. Black Friday and holiday season (November through December) push tech CPMs to annual highs as electronics advertisers bid aggressively. The period from January through March tends to be the quietest, though CES coverage in early January creates a brief spike.\n\nAffiliate income is often the largest revenue stream for tech creators, frequently exceeding ad revenue. Amazon Associates pays 1–4% on electronics, but volume matters — a popular laptop review driving thousands of purchases can generate significant commissions. Many tech creators also join manufacturer affiliate programs that pay higher rates than Amazon. Sponsorship rates for tech channels run $15–$40 per 1,000 views for integrated mentions, with VPN companies, mobile games, and SaaS tools being the most common sponsors. Some established tech reviewers earn additional revenue through consulting and early product access agreements with manufacturers.',
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
    title: 'YouTube Education Money & Earnings Calculator 2026',
    metaDescription:
      'Free YouTube education money calculator. Estimate how much educational YouTubers make with CPM rates of $5–$12. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Education Money Calculator',
    ogDescription: 'Estimate education YouTube channel earnings. CPM: $5–$12.',
    pageDescription:
      'Estimate your YouTube education channel earnings based on daily views. Educational content earns CPM rates of $5–$12 per 1,000 impressions with strong audience retention.',
    howItWorks:
      'Education content attracts advertisers from online learning platforms, educational software, textbook companies, and course creators. With CPMs of $5–$12, education channels earn above-average rates. EdTech companies are among the fastest-growing advertiser categories on YouTube, and they specifically target educational content because the audience aligns perfectly with their customer base — people actively seeking to learn new skills. This calculator uses education-specific RPM data for accurate projections.\n\nThe education niche has significant CPM variation by subject matter. STEM content (science, math, engineering, coding) earns at the top of the range because tech and EdTech advertisers bid heavily for these viewers. Professional development and career-focused content (interview skills, resume building, certifications) also commands premium rates due to the high-value B2B advertisers targeting working professionals. Test preparation content (SAT, GRE, MCAT, professional licensing exams) earns well because viewers have immediate, high-stakes needs. Language learning, general knowledge, and K-12 academic tutoring earn more moderate CPMs but attract consistent, loyal audiences.\n\nEducation content has the strongest evergreen advantage of any YouTube niche. A well-made calculus tutorial, history explainer, or coding lesson can generate views and revenue for 3–5+ years after upload with minimal degradation. This compounding effect means education channels build a growing library of passive income — a channel with 200 evergreen videos averaging 500 daily views each generates the equivalent of 100,000 daily views indefinitely. Back-to-school periods (August through September) and exam seasons (April through June) create predictable annual traffic spikes. January also sees elevated traffic from New Year learning resolutions.\n\nEducation creators have uniquely strong monetization beyond ads. Selling courses is the dominant supplementary income stream — platforms like Teachable, Udemy, and Skillshare make it straightforward to package existing YouTube content into paid courses priced at $50–$500+. Many education YouTubers earn more from course sales than ad revenue once they reach 50,000+ subscribers. Tutoring services, membership communities, study guides, and digital downloads (cheat sheets, templates, worksheets) provide additional recurring revenue. Sponsorships from EdTech companies, online universities, and learning platforms are also common and pay $10–$30 per 1,000 views.',
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
    title: 'YouTube Health & Fitness Money & Earnings Calculator 2026',
    metaDescription:
      'Free YouTube health and fitness money calculator. Estimate how much health YouTubers make with CPM rates of $5–$12. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Health & Fitness Money Calculator',
    ogDescription: 'Estimate health & fitness YouTube channel earnings. CPM: $5–$12.',
    pageDescription:
      'Estimate your YouTube health and fitness channel earnings based on daily views. Health content earns CPM rates of $5–$12 per 1,000 impressions.',
    howItWorks:
      'Health and fitness content attracts advertisers from supplement brands, fitness equipment companies, health apps, and wellness products. With CPMs of $5–$12, health channels earn above-average rates. The health advertising market is driven by high customer retention — once someone subscribes to a fitness app, buys a supplement brand, or invests in home gym equipment, they tend to become repeat customers. This makes health audiences particularly valuable to advertisers, and it shows in the CPM rates. This calculator uses health-specific RPM data for accurate projections.\n\nSub-niche selection matters considerably within health and fitness. Medical health information and doctor-run channels command the highest CPMs because they attract pharmaceutical and healthcare advertisers with massive budgets, though this content also faces stricter ad policies under YouTube\'s YMYL (Your Money or Your Life) guidelines. Specialized training content (powerlifting, yoga, martial arts, running) earns strong CPMs because the audience is highly engaged and actively purchasing niche-specific equipment and supplements. General workout content (home workouts, gym routines) earns mid-range CPMs but attracts the broadest audience. Mental health and wellness content is a rapidly growing sub-niche with increasingly competitive ad rates.\n\nHealth and fitness channels experience the most pronounced seasonal pattern of any YouTube niche. January is far and away the strongest month — "new year, new me" resolutions drive a massive spike in fitness content consumption, and advertisers bid aggressively to capture this motivated audience. CPMs can be 40–60% higher in January than the annual average. The surge gradually tapers through February and March. Summer months (May through July) see a secondary peak around beach season and outdoor fitness. Q4 is moderate, with a slight pre-holiday fitness push. The lowest CPMs typically occur in late November and December when audiences shift attention to holiday content.\n\nFitness creators have exceptionally strong monetization options beyond ad revenue. Supplement brand sponsorships are the most common, paying $15–$40 per 1,000 views for integrated mentions — far exceeding ad RPM. Affiliate commissions on fitness equipment, supplements, and athletic wear provide steady income, with Amazon Associates and brand-direct programs paying 4–10% on fitness products. Many fitness YouTubers develop their own product lines (workout programs, meal plans, supplement brands, or fitness apps) which can become the primary income source. Online coaching and personalized training programs are another major revenue stream, with creators charging $100–$500+/month per client.',
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
    title: 'YouTube Beauty Money & Earnings Calculator 2026',
    metaDescription:
      'Free YouTube beauty and fashion money calculator. Estimate how much beauty YouTubers make with CPM rates of $3–$10. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Beauty Money Calculator',
    ogDescription: 'Estimate beauty & fashion YouTube channel earnings. CPM: $3–$10.',
    pageDescription:
      'Estimate your YouTube beauty and fashion channel earnings based on daily views. Beauty content earns CPM rates of $3–$10 per 1,000 impressions.',
    howItWorks:
      'Beauty and fashion content attracts advertisers from cosmetics brands, skincare companies, fashion retailers, and subscription box services. With CPMs of $3–$10, beauty channels earn moderate ad rates. While beauty CPMs are lower than finance or tech, the niche compensates with extremely high sponsorship demand — cosmetics and skincare brands spend heavily on influencer marketing because authentic creator endorsements drive purchases far more effectively than traditional ads. This calculator uses beauty-specific RPM data for accurate projections.\n\nWithin the beauty niche, sub-category selection significantly impacts earnings. Skincare content commands the highest CPMs because skincare products have higher margins and repeat purchase rates than color cosmetics. Luxury beauty content (high-end brands, department store products) attracts premium advertisers willing to pay more per impression than drugstore beauty content. Hair care and nail art occupy a strong middle ground with dedicated audiences and growing advertiser interest. Fast fashion hauls earn the lowest CPMs but generate high view counts due to trend-driven virality. Dermatologist-partnered content and ingredient-focused videos are a growing premium sub-niche.\n\nBeauty content follows a gift-driven seasonal cycle. Q4 (October through December) is the strongest period by far, with holiday gift guide season and Black Friday driving CPMs 30–50% above the annual average. Beauty advent calendar reviews, gift set roundups, and holiday look tutorials are peak-earning content during this window. Spring sees a secondary bump around prom season and summer prep. New York Fashion Week (September) and Paris Fashion Week create brief CPM spikes for fashion-focused channels. Summer tends to be the lowest CPM period, though "summer beauty routine" and SPF content performs steadily.\n\nBeauty creators arguably have the most diverse monetization ecosystem on YouTube. Brand sponsorships are the primary income driver — cosmetics and skincare companies pay $10–$30 per 1,000 views for sponsored content, often exceeding ad revenue by 3–5x. Affiliate programs through Amazon Associates, LTK (formerly rewardStyle), and brand-specific programs pay 5–15% commissions, and beauty audiences are among the highest-converting for affiliate links since viewers watch specifically to discover products to buy. Many established beauty creators launch their own product lines (lip kits, palettes, skincare lines) which can generate revenue orders of magnitude beyond ad income. PR packages and brand trips, while not direct income, reduce content production costs significantly.',
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
    title: 'YouTube Travel Money & Earnings Calculator 2026',
    metaDescription:
      'Free YouTube travel money calculator. Estimate how much travel YouTubers make with CPM rates of $4–$10. Calculate daily, monthly, and yearly travel channel earnings.',
    ogTitle: 'YouTube Travel Money Calculator',
    ogDescription: 'Estimate travel YouTube channel earnings. CPM: $4–$10.',
    pageDescription:
      'Estimate your YouTube travel channel earnings based on daily views. Travel content earns CPM rates of $4–$10 per 1,000 impressions.',
    howItWorks:
      'Travel content attracts advertisers from airlines, hotels, booking platforms, travel gear companies, and tourism boards. With CPMs of $4–$10, travel channels earn moderate-to-good ad rates. The travel advertising market is highly competitive because a single hotel or flight booking can be worth hundreds of dollars, making travel viewers extremely valuable to advertisers. This calculator uses travel-specific RPM data to project your earnings based on the unique dynamics of travel content monetization.\n\nTravel sub-niches have notable CPM differences. Luxury travel and first-class flight reviews earn the highest CPMs because they attract affluent viewers and premium brand advertisers — airlines and hotel chains bidding on luxury keywords pay top dollar. Destination guides and "cost of living" comparisons earn strong CPMs because viewers are actively researching trip purchases. Budget travel and backpacking content earns lower CPMs per view but tends to attract larger, younger audiences and generates strong engagement. Digital nomad and remote work travel content has emerged as a premium sub-niche, attracting advertisers from coworking spaces, VPN companies, and travel insurance providers. Van life and road trip content occupies a unique space with dedicated audiences and growing advertiser interest from outdoor and automotive brands.\n\nTravel content experiences the most dramatic seasonal CPM swings of almost any niche. Early-year planning season (January through March) sees strong CPMs as viewers research summer vacations — destination guides and flight deal content performs especially well during this window. Summer months (June through August) maintain solid CPMs as travel brands compete during peak booking season. Fall shoulder season (September through October) sees a dip before a recovery in November as holiday travel and winter vacation planning kicks in. December CPMs spike for winter holiday destination content and year-end travel roundups. Geography-specific content creates its own micro-seasons — ski resort reviews peak in October through November, while beach content peaks in March through April.\n\nTravel creators benefit from uniquely tangible monetization beyond ads. Tourism board sponsorships and destination marketing partnerships are a major revenue stream — tourism boards pay $2,000–$20,000+ for destination feature videos depending on channel size. Hotel and airline partnerships often include complimentary travel in addition to payment, dramatically reducing the cost of content production. Booking platform affiliate programs (Booking.com, Hotels.com, Airbnb, Hostelworld) pay 3–6% commissions on reservations made through creator links. Travel insurance, VPN services, and travel gear affiliates provide additional income. Many travel creators also sell photography presets, travel planning guides, and itinerary templates as digital products.',
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
    title: 'YouTube Food Money & Earnings Calculator 2026',
    metaDescription:
      'Free YouTube food and cooking money calculator. Estimate how much food YouTubers make with CPM rates of $3–$8. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Food Money Calculator',
    ogDescription: 'Estimate food & cooking YouTube channel earnings. CPM: $3–$8.',
    pageDescription:
      'Estimate your YouTube food and cooking channel earnings based on daily views. Food content earns CPM rates of $3–$8 per 1,000 impressions.',
    howItWorks:
      "Food and cooking content attracts advertisers from kitchen appliance brands, meal kit services, grocery delivery platforms, and food product companies. With CPMs of $3–$8, food channels earn moderate ad rates. The food advertising market benefits from the fact that everyone eats — food content reaches a universal audience, and advertisers from meal kits to kitchen gadgets to grocery delivery services compete for these viewers. This calculator uses food-specific RPM data to project your earnings based on the unique economics of food content.\n\nFood content has meaningful CPM variation across sub-niches. Kitchen equipment reviews and comparison videos earn the highest CPMs because viewers are researching specific purchases — a stand mixer or knife review attracts kitchen appliance advertisers willing to bid premium rates. Recipe tutorials targeting specific dietary needs (keto, vegan, gluten-free) command above-average CPMs because health food and specialty ingredient brands target these audiences specifically. Restaurant reviews and food tourism content earn mid-range CPMs with strong audience engagement. Mukbang and food challenge content earns the lowest CPMs due to younger audience demographics and limited advertiser appeal, though it can attract very high view counts. Meal prep and budget cooking content occupies a growing sweet spot with good CPMs and loyal audiences.\n\nFood content is among the most seasonal on YouTube, following cooking and holiday patterns closely. Q4 (October through December) is the strongest period — Thanksgiving recipe videos, holiday baking content, and Christmas dinner guides drive massive traffic spikes and peak CPMs. Many food creators earn 30–40% of their annual revenue in Q4 alone. Super Bowl Sunday content (January/February) creates a brief but intense spike for appetizer and party food recipes. Summer grilling season (May through July) provides another reliable traffic peak. Easter, Valentine's Day, and Mother's Day each create mini-spikes for relevant recipe content. The key advantage of food content is that seasonal recipes generate compounding traffic year after year — a Thanksgiving turkey tutorial gains more views with each passing November.\n\nFood creators have diverse monetization paths beyond ad revenue. Cookbook sales (both physical and e-book) are a natural extension of recipe content, with popular food YouTubers regularly landing publishing deals or self-publishing profitably. Affiliate links for kitchen equipment on Amazon generate steady commissions, especially when linked from evergreen recipe videos that recommend specific tools. Meal kit services and kitchen appliance brands are among the most active sponsors in the food space, paying $10–$25 per 1,000 views for integrated sponsorships. Many food creators develop their own product lines — spice blends, sauces, baking mixes, and cookware collaborations can become significant revenue streams. Cooking classes and membership communities with exclusive recipes provide recurring subscription income.",
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
    title: 'YouTube Lifestyle Money & Earnings Calculator 2026',
    metaDescription:
      'Free YouTube lifestyle money calculator. Estimate how much lifestyle YouTubers make with CPM rates of $2–$6. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Lifestyle Money Calculator',
    ogDescription: 'Estimate lifestyle YouTube channel earnings. CPM: $2–$6.',
    pageDescription:
      'Estimate your YouTube lifestyle channel earnings based on daily views. Lifestyle content earns CPM rates of $2–$6 per 1,000 impressions.',
    howItWorks:
      'Lifestyle content attracts a broad range of advertisers from consumer brands, subscription services, home goods companies, and direct-to-consumer products. With CPMs of $2–$6, lifestyle channels earn moderate ad rates compared to specialized niches like finance or tech. However, lifestyle has a unique advantage: the breadth of content topics means you can attract advertisers from dozens of different industries within a single channel. A morning routine video might attract coffee brand, skincare, and productivity app advertisers simultaneously. This calculator uses lifestyle-specific RPM data for accurate projections.\n\nWithin lifestyle, sub-niche positioning dramatically affects earnings potential. Productivity and organization content earns at the top of the range because it attracts SaaS and app advertisers with high customer lifetime values — viewers watching "desk setup" or "morning routine" videos are prime targets for productivity tool companies. Home decor and interior design content commands above-average CPMs from furniture and home goods brands. Minimalism and intentional living content attracts premium brand partnerships despite smaller audiences because the demographic skews toward higher income. General "day in my life" vlogs earn lower CPMs but build strong parasocial relationships that convert well for any product category. Self-improvement and habit-building content is a growing premium sub-niche.\n\nLifestyle content has gentler seasonal patterns than most niches, but they still exist. January brings a significant CPM and traffic boost driven by New Year resolutions — "reset my life," "new year organization," and "habit building" content sees major spikes. Back-to-school and back-to-work seasons (August through September) provide a secondary peak for productivity and organization content. Q4 sees elevated CPMs from gift guide content and holiday routine videos. The "clean with me" and "organize with me" sub-genre experiences year-round demand but peaks in January and September. Summer months are typically the lowest CPM period for lifestyle content, though travel-adjacent lifestyle content picks up during this window.\n\nLifestyle creators have exceptionally strong sponsorship potential because brands love the authentic product integration that lifestyle content naturally provides. A product placed in a morning routine or "things I use every day" video feels organic rather than forced, making lifestyle creators highly attractive to direct-to-consumer brands. Sponsorship rates run $10–$25 per 1,000 views, often exceeding ad revenue by 2–4x. Affiliate marketing performs well since lifestyle audiences are accustomed to shopping links for featured products. Many lifestyle creators build their own brands — productivity planners, home goods collaborations, and digital organization templates are common product lines. Subscription-based community memberships and Patreon tiers where creators share more personal content also provide recurring revenue.',
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
    title: 'YouTube Entertainment Money & Earnings Calculator 2026',
    metaDescription:
      'Free YouTube entertainment money calculator. Estimate how much entertainment YouTubers make with CPM rates of $1.50–$4. Calculate daily, monthly, and yearly earnings.',
    ogTitle: 'YouTube Entertainment Money Calculator',
    ogDescription: 'Estimate entertainment YouTube channel earnings. CPM: $1.50–$4.',
    pageDescription:
      'Estimate your YouTube entertainment channel earnings based on daily views. Entertainment content earns CPM rates of $1.50–$4 per 1,000 impressions.',
    howItWorks:
      'Entertainment content (comedy, reactions, challenges, pranks) attracts broad consumer advertisers but at lower CPM rates of $1.50–$4. Despite having some of the lowest per-view earnings on YouTube, entertainment is also the highest-volume niche on the platform — the top entertainment creators regularly generate tens of millions of views per video. The business model fundamentally differs from high-CPM niches: instead of earning $20+ per 1,000 views from a niche audience, entertainment creators earn $1–$2 per 1,000 views from a massive, broad audience. This calculator uses entertainment-specific RPM data for accurate projections.\n\nCPM variation within entertainment is more pronounced than many creators realize. Reaction and commentary content earns toward the higher end of the range because it attracts an older, more engaged audience — particularly when reacting to news, culture, or educational topics. Challenge and experiment content (think MrBeast-style videos) earns mid-range CPMs but generates enormous view counts that compensate for the lower rate. Prank videos and random comedy sketches tend to earn the lowest CPMs due to younger viewer demographics and advertiser brand-safety concerns — some advertisers actively exclude prank and controversial content. Movie and TV commentary and pop culture analysis occupy a growing premium sub-niche with above-average CPMs and strong audience loyalty.\n\nEntertainment content has the weakest seasonal CPM pattern of any niche because consumer brand advertising is relatively steady year-round. That said, Q4 still brings a noticeable CPM increase (15–25%) as all advertisers increase spending for the holiday season. Summer months (June through August) see slightly elevated viewership as younger audiences have more free time, but CPMs remain flat. The biggest traffic drivers for entertainment channels are trending moments — viral challenges, celebrity events, and cultural phenomena create unpredictable but massive traffic spikes. Creators who can capitalize on trends within 24–48 hours see the largest view count surges.\n\nEntertainment creators rely more heavily on non-ad revenue than any other niche. Merchandise sales are often the single largest income source for established entertainment YouTubers — a loyal fanbase that watches for personality-driven content is far more likely to buy creator merch than viewers on a tutorial channel. Fan funding through Super Chats, channel memberships, and Patreon provides significant recurring revenue, especially for creators with strong community engagement. Brand sponsorships in entertainment pay $8–$20 per 1,000 views for integrated mentions, with mobile games, food and beverage brands, and consumer apps being the most common sponsors. Live appearances, touring, and event partnerships represent additional revenue streams that entertainment creators are uniquely positioned to leverage due to their personal brand recognition.',
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
    title: 'YouTube Gaming Money & Earnings Calculator 2026',
    metaDescription:
      'Free YouTube gaming money calculator. Estimate how much gaming YouTubers make with CPM rates of $1.50–$5. Calculate daily, monthly, and yearly gaming channel earnings.',
    ogTitle: 'YouTube Gaming Money Calculator',
    ogDescription: 'Estimate gaming YouTube channel earnings. CPM: $1.50–$5.',
    pageDescription:
      'Estimate your YouTube gaming channel earnings based on daily views. Gaming content earns CPM rates of $1.50–$5 per 1,000 impressions.',
    howItWorks:
      'Gaming content attracts advertisers from game publishers, hardware manufacturers, energy drink brands, and peripheral companies. With CPMs of $1.50–$5, gaming channels earn lower-than-average ad rates, but gaming is one of the largest content categories on YouTube by total watch time. The lower CPM reflects two factors: gaming audiences skew younger with less disposable income, and the enormous volume of gaming content on YouTube creates abundant ad inventory that drives down prices. However, the sheer scale of gaming viewership means that even modest-sized gaming channels can generate substantial total revenue. This calculator uses gaming-specific RPM data for accurate projections.\n\nGaming has wider CPM variance across sub-niches than most creators expect. PC hardware reviews, build guides, and component comparisons earn the highest CPMs — often $8–$15, rivaling tech content — because viewers are actively researching expensive purchases and hardware advertisers bid aggressively for these viewers. Game reviews and "best games" ranking videos earn above-average gaming CPMs because viewers are in a purchasing mindset. Esports commentary and competitive gaming analysis attract premium sponsors and mid-to-high CPMs. Let\'s Play videos and live stream highlights earn the lowest CPMs but can be produced at very high volume with minimal editing overhead. Retro gaming and niche game content has a smaller but highly engaged audience with moderate CPM rates.\n\nGaming CPMs follow a release-cycle pattern more than a traditional seasonal one. Major game launches (especially AAA titles) create CPM spikes as game publishers pour advertising budgets into launch windows — creators covering these games during the first week see elevated ad rates. Holiday season (November through December) is the strongest period overall, combining game release season with holiday gift advertising for consoles, games, and peripherals. Back-to-school period (August through September) brings moderate CPM increases as hardware advertisers target students. Summer can be surprisingly strong when major gaming events (E3, Summer Game Fest, Gamescom) drive industry-wide advertiser spending. January through March is typically the lowest CPM period, sitting between major release cycles.\n\nGaming creators have a uniquely multi-platform monetization advantage. Live streaming on Twitch or YouTube simultaneously provides income through subscriptions, donations, and bits/Super Chats — many gaming creators earn more from streaming than from YouTube ad revenue. Game publisher sponsorships are highly lucrative, paying $5,000–$50,000+ per sponsored video depending on channel size and the game\'s marketing budget. Affiliate links for gaming peripherals (mice, keyboards, headsets, monitors) generate steady commissions through Amazon and manufacturer-direct programs. Gaming merch sells well to loyal fanbases. Some creators earn additional income through tournament participation, coaching services, and game key reselling affiliate programs. The combination of YouTube ads, streaming revenue, sponsorships, and affiliate income makes gaming one of the most diversified niches for total creator income despite its lower CPM.',
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
