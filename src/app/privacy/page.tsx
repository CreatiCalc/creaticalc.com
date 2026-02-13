import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — CreatiCalc',
  description:
    'CreatiCalc privacy policy. Learn how we handle your data, use cookies, and work with advertising partners. No account required — your calculator data stays in your browser.',
  openGraph: {
    title: 'Privacy Policy — CreatiCalc',
    description:
      'How CreatiCalc handles your data, cookies, and advertising. No sign-up required and no personal data collected.',
    url: '/privacy',
  },
  alternates: {
    canonical: '/privacy',
  },
};

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use-data', label: 'How We Use Your Data' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'advertising', label: 'Advertising' },
  { id: 'third-party-services', label: 'Third-Party Services' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'gdpr', label: 'Your Rights Under GDPR' },
  { id: 'ccpa', label: 'Your Rights Under CCPA' },
  { id: 'do-not-track', label: 'Do Not Track Signals' },
  { id: 'international-transfers', label: 'International Data Transfers' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'third-party-links', label: 'Third-Party Links' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact' },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">
        Effective date: February 1, 2026 &middot; Last updated: February 2026
      </p>

      {/* Table of Contents */}
      <nav className="mt-8 rounded-lg border border-border bg-surface p-5">
        <p className="mb-3 text-sm font-semibold text-foreground">On this page</p>
        <ol className="columns-2 gap-x-8 space-y-1.5 text-sm">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-muted transition-colors hover:text-primary">
                {i + 1}. {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10 leading-relaxed text-muted">
        {/* 1. Overview */}
        <section id="overview">
          <h2 className="mb-2 text-xl font-semibold text-foreground">1. Overview</h2>
          <p>
            CreatiCalc (
            <Link href="/" className="text-primary underline">
              creaticalc.com
            </Link>
            ) provides{' '}
            <Link href="/about" className="text-primary underline">
              free calculators
            </Link>{' '}
            for content creators on YouTube, Instagram, and TikTok. We are committed to protecting
            your privacy and being transparent about our data practices. This policy explains what
            data we collect, why we collect it, how we use it, and your rights.
          </p>
          <p className="mt-3">
            <strong className="text-foreground">The short version:</strong> We don&apos;t require an
            account, we don&apos;t collect personal information, and all calculator inputs are
            processed entirely in your browser. The one exception is an optional YouTube URL lookup
            that sends a URL to our server to fetch public stats — no data is stored. Beyond that,
            the only data collection comes from standard advertising services, which we describe in
            detail below.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section id="information-we-collect">
          <h2 className="mb-2 text-xl font-semibold text-foreground">2. Information We Collect</h2>
          <p>
            CreatiCalc does not require registration, login, or any form of account creation. You
            can use every calculator on the site without providing any personal information.
          </p>

          <h3 className="mt-4 mb-1 font-semibold text-foreground">Calculator Data</h3>
          <p>
            All calculations — including earnings estimates, engagement rates, and growth
            projections — are performed entirely in your browser using JavaScript. No calculator
            inputs or results are stored on our servers. Your data stays on your device.
          </p>

          <h3 className="mt-4 mb-1 font-semibold text-foreground">YouTube URL Lookup</h3>
          <p>
            Our{' '}
            <Link href="/youtube-money-calculator" className="text-primary underline">
              YouTube Money Calculator
            </Link>{' '}
            includes an optional URL lookup feature. When you use it, the YouTube URL you enter is
            sent to our server, which queries the YouTube Data API to retrieve public channel or
            video statistics. We do not store the URLs you look up. Your IP address is temporarily
            held in memory for rate limiting purposes and is not persisted to disk or shared with
            third parties.
          </p>

          <h3 className="mt-4 mb-1 font-semibold text-foreground">Automatically Collected Data</h3>
          <p>
            When you visit CreatiCalc, our hosting provider and advertising partners may
            automatically collect standard technical information, including:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary">
            <li>IP address (anonymized where possible)</li>
            <li>Browser type and version</li>
            <li>Operating system and device type (desktop, mobile, tablet)</li>
            <li>Pages visited, time spent on each page, and navigation path</li>
            <li>Referring URL (the page that linked you to our site)</li>
            <li>Approximate geographic location (country/region level, derived from IP)</li>
            <li>Screen resolution and viewport size</li>
          </ul>
          <p className="mt-3">
            This data is collected in aggregate to understand traffic patterns and improve the site.
            It is not linked to any identifiable individual.
          </p>

          <h3 className="mt-4 mb-1 font-semibold text-foreground">
            Information We Do <em>Not</em> Collect
          </h3>
          <p>We want to be explicit about what we don&apos;t do:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary">
            <li>We do not collect names, email addresses, or phone numbers</li>
            <li>We do not require or offer user accounts</li>
            <li>
              We do not store calculator inputs or results on our servers (see the YouTube URL
              Lookup section above for the one exception)
            </li>
            <li>We do not use fingerprinting to identify individual users</li>
            <li>We do not sell personal information to anyone</li>
          </ul>
        </section>

        {/* 3. How We Use Your Data */}
        <section id="how-we-use-data">
          <h2 className="mb-2 text-xl font-semibold text-foreground">3. How We Use Your Data</h2>
          <p>The limited data collected through our hosting and advertising services is used to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary">
            <li>Understand which calculators are most popular and improve them</li>
            <li>Identify and fix technical issues and broken pages</li>
            <li>Analyze traffic sources to understand how users find our site</li>
            <li>Make informed decisions about new features and content</li>
            <li>Display relevant advertisements to support the free service</li>
          </ul>

          <h3 className="mt-4 mb-1 font-semibold text-foreground">Legal Basis for Processing</h3>
          <p>Under GDPR, we process data on the following legal bases:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary">
            <li>
              <strong className="text-foreground">Legitimate interest</strong> — for server logs and
              usage data that help us maintain and improve the site
            </li>
            <li>
              <strong className="text-foreground">Consent</strong> — for advertising cookies and
              personalized ads. You can manage these through your browser settings and the opt-out
              tools listed in the{' '}
              <a href="#advertising" className="text-primary underline">
                Advertising section
              </a>{' '}
              below
            </li>
          </ul>
        </section>

        {/* 4. Cookies */}
        <section id="cookies">
          <h2 className="mb-2 text-xl font-semibold text-foreground">4. Cookies</h2>
          <p>
            Cookies are small text files stored on your device by your browser. CreatiCalc and its
            partners may use the following types:
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold text-foreground">Type</th>
                  <th className="pb-2 pr-4 font-semibold text-foreground">Purpose</th>
                  <th className="pb-2 font-semibold text-foreground">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-2 pr-4 font-medium text-foreground">Essential</td>
                  <td className="py-2 pr-4">
                    Required for basic site functionality and remembering your preferences (e.g.,
                    theme or display settings)
                  </td>
                  <td className="py-2 whitespace-nowrap">Up to 1 year</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-foreground">Analytics</td>
                  <td className="py-2 pr-4">
                    Help us understand how visitors use the site — which pages are visited, how long
                    users stay, and where traffic comes from
                  </td>
                  <td className="py-2 whitespace-nowrap">Up to 2 years</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-foreground">Advertising</td>
                  <td className="py-2 pr-4">
                    Used by third-party ad networks to serve relevant ads and measure ad performance
                    across websites
                  </td>
                  <td className="py-2 whitespace-nowrap">Up to 2 years</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            You can control or delete cookies through your browser settings. Most browsers allow you
            to block third-party cookies while still accepting first-party cookies. Note that
            disabling essential cookies may affect site functionality.
          </p>
        </section>

        {/* 5. Advertising */}
        <section id="advertising">
          <h2 className="mb-2 text-xl font-semibold text-foreground">5. Advertising</h2>
          <p>
            CreatiCalc is a free service supported by advertising. We display ads through
            third-party ad networks, which may include Google AdSense and other programmatic
            advertising partners. These services may use cookies and similar technologies to serve
            ads based on your browsing activity across websites.
          </p>
          <p className="mt-3">
            We do not provide ad networks with any personal information you have given us (because
            we don&apos;t collect any). However, ad networks may independently collect device
            identifiers, browsing data, and interaction data through their own cookies and tracking
            pixels.
          </p>
          <p className="mt-3">You can manage your ad preferences through these resources:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary">
            <li>
              <a
                href="https://www.google.com/settings/ads"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ad Settings
              </a>{' '}
              — Opt out of personalized Google ads
            </li>
            <li>
              <a
                href="https://optout.aboutads.info/"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                DAA Opt-Out Tool
              </a>{' '}
              — Opt out of interest-based advertising from participating companies
            </li>
            <li>
              <a
                href="https://optout.networkadvertising.org/"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                NAI Opt-Out Tool
              </a>{' '}
              — Opt out of targeted advertising from NAI member networks
            </li>
            <li>
              <a
                href="https://youradchoices.com/appchoices"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                AppChoices
              </a>{' '}
              — Opt out of interest-based ads on mobile devices
            </li>
          </ul>
        </section>

        {/* 6. Third-Party Services */}
        <section id="third-party-services">
          <h2 className="mb-2 text-xl font-semibold text-foreground">6. Third-Party Services</h2>
          <p>
            CreatiCalc uses the following third-party services that may process data as part of
            providing their service:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-primary">
            <li>
              <strong className="text-foreground">Netlify</strong> — Hosting, content delivery, and
              edge functions (
              <a
                href="https://www.netlify.com/privacy/"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Netlify Privacy Policy
              </a>
              )
            </li>
            <li>
              <strong className="text-foreground">Google AdSense</strong> — Advertising and ad
              serving (
              <a
                href="https://policies.google.com/privacy"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
              )
            </li>
            <li>
              <strong className="text-foreground">YouTube Data API</strong> — Used by the optional
              URL lookup feature to retrieve public video and channel statistics (
              <a
                href="https://developers.google.com/youtube/terms/api-services-terms-of-service"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube API Terms of Service
              </a>
              )
            </li>
          </ul>
          <p className="mt-3">
            Each service operates under its own privacy policy. We encourage you to review these
            policies to understand how your data may be processed by each provider.
          </p>
        </section>

        {/* 7. Data Retention */}
        <section id="data-retention">
          <h2 className="mb-2 text-xl font-semibold text-foreground">7. Data Retention</h2>
          <p>
            Since CreatiCalc does not collect personal information or require accounts, there is no
            personal data stored on our servers to retain.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary">
            <li>
              <strong className="text-foreground">Server logs</strong> maintained by our hosting
              provider (Netlify) are retained according to their data retention policy, typically 30
              days.
            </li>
            <li>
              <strong className="text-foreground">Advertising data</strong> is managed by the
              respective ad networks according to their own retention policies.
            </li>
          </ul>
        </section>

        {/* 8. Data Security */}
        <section id="data-security">
          <h2 className="mb-2 text-xl font-semibold text-foreground">8. Data Security</h2>
          <p>
            We take reasonable measures to protect the limited data associated with your visits:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary">
            <li>All connections to CreatiCalc are encrypted using HTTPS/TLS</li>
            <li>Our site is served through Netlify&apos;s global CDN with DDoS protection</li>
            <li>
              No personal data or calculator inputs are stored on our servers (YouTube URL lookups
              are processed in memory and not persisted)
            </li>
            <li>Third-party services we use maintain their own security certifications</li>
          </ul>
          <p className="mt-3">
            While no method of transmission over the Internet is 100% secure, the minimal data we
            collect significantly reduces risk. Since calculator data never leaves your browser,
            your financial estimates and channel data remain entirely private.
          </p>
        </section>

        {/* 9. GDPR */}
        <section id="gdpr">
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            9. Your Rights Under GDPR (European Users)
          </h2>
          <p>
            If you are located in the European Economic Area (EEA) or the United Kingdom, you have
            the following rights under the General Data Protection Regulation:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary">
            <li>
              <strong className="text-foreground">Right of access</strong> — request a copy of any
              personal data we hold about you
            </li>
            <li>
              <strong className="text-foreground">Right to rectification</strong> — request
              correction of inaccurate data
            </li>
            <li>
              <strong className="text-foreground">Right to erasure</strong> — request deletion of
              your personal data
            </li>
            <li>
              <strong className="text-foreground">Right to restrict processing</strong> — request
              that we limit how we use your data
            </li>
            <li>
              <strong className="text-foreground">Right to data portability</strong> — request your
              data in a machine-readable format
            </li>
            <li>
              <strong className="text-foreground">Right to object</strong> — object to data
              processing based on legitimate interest
            </li>
            <li>
              <strong className="text-foreground">Right to withdraw consent</strong> — withdraw
              consent for advertising cookies at any time
            </li>
          </ul>
          <p className="mt-3">
            Since CreatiCalc does not collect personal information or require accounts, there is
            typically no personal data to request. However, you may exercise any of these rights by
            contacting us using the details in the Contact section below. We will respond within 30
            days.
          </p>
        </section>

        {/* 10. CCPA */}
        <section id="ccpa">
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            10. Your Rights Under CCPA (California Users)
          </h2>
          <p>
            If you are a California resident, the California Consumer Privacy Act (CCPA) grants you
            the following rights:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-primary">
            <li>
              <strong className="text-foreground">Right to know</strong> — what personal information
              is collected, used, shared, or sold
            </li>
            <li>
              <strong className="text-foreground">Right to delete</strong> — request deletion of
              personal information we hold
            </li>
            <li>
              <strong className="text-foreground">Right to opt out</strong> — opt out of the sale or
              sharing of personal information
            </li>
            <li>
              <strong className="text-foreground">Right to non-discrimination</strong> — we will not
              treat you differently for exercising your rights
            </li>
          </ul>
          <p className="mt-3">
            <strong className="text-foreground">
              CreatiCalc does not sell your personal information.
            </strong>{' '}
            Ad networks we work with may collect device identifiers and browsing data for targeted
            advertising, which may be considered &quot;sharing&quot; under the CCPA. You can opt out
            of this at any time using the tools listed in the{' '}
            <a href="#advertising" className="text-primary underline">
              Advertising section
            </a>{' '}
            above.
          </p>
        </section>

        {/* 11. Do Not Track */}
        <section id="do-not-track">
          <h2 className="mb-2 text-xl font-semibold text-foreground">11. Do Not Track Signals</h2>
          <p>
            Some browsers send a &quot;Do Not Track&quot; (DNT) signal with each request. There is
            currently no industry standard for how websites should respond to DNT signals. At this
            time, CreatiCalc does not alter its data collection practices based on DNT signals.
            However, you can use the cookie and ad opt-out tools described above to control
            tracking.
          </p>
        </section>

        {/* 12. International Transfers */}
        <section id="international-transfers">
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            12. International Data Transfers
          </h2>
          <p>
            CreatiCalc is hosted on Netlify&apos;s global CDN, which means your requests may be
            processed by servers in different countries. Our third-party service providers
            (including Google) may also process data outside your country of residence. These
            providers maintain appropriate safeguards for international data transfers, including
            Standard Contractual Clauses where required by GDPR.
          </p>
        </section>

        {/* 13. Children */}
        <section id="children">
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            13. Children&apos;s Privacy
          </h2>
          <p>
            CreatiCalc is not directed at children under the age of 13 (or 16 in the EEA). We do not
            knowingly collect personal information from children. If you are a parent or guardian
            and believe your child has provided us with personal data, please contact us using the
            details below and we will take steps to remove it promptly.
          </p>
        </section>

        {/* 14. Third-Party Links */}
        <section id="third-party-links">
          <h2 className="mb-2 text-xl font-semibold text-foreground">14. Third-Party Links</h2>
          <p>
            Our site may contain links to external websites and services that are not operated by
            us. We have no control over the content, privacy policies, or practices of third-party
            sites. We encourage you to review the privacy policy of any external site you visit. A
            link from CreatiCalc does not imply endorsement of that site&apos;s content or
            practices.
          </p>
        </section>

        {/* 15. Changes */}
        <section id="changes">
          <h2 className="mb-2 text-xl font-semibold text-foreground">15. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time to reflect changes in our practices,
            technology, or legal requirements. When we make changes, we will update the &quot;Last
            updated&quot; date at the top of this page. For significant changes, we may also add a
            notice on our homepage. We encourage you to review this policy periodically.
          </p>
        </section>

        {/* 16. Contact */}
        <section id="contact">
          <h2 className="mb-2 text-xl font-semibold text-foreground">16. Contact</h2>
          <p>
            If you have questions about this privacy policy, want to exercise your data rights, or
            have concerns about how your data is handled, you can reach us through:
          </p>
          <p className="mt-2">
            Email us at{' '}
            <a href="mailto:privacy@creaticalc.com" className="text-primary underline">
              privacy@creaticalc.com
            </a>
          </p>
          <p className="mt-3">We aim to respond to all privacy-related inquiries within 30 days.</p>
        </section>
      </div>
    </div>
  );
}
