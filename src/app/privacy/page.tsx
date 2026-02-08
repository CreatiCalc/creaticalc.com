import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'CreatiCalc privacy policy — how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: February 2026</p>

      <div className="mt-8 space-y-6 leading-relaxed text-muted">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">What We Collect</h2>
          <p>
            CreatiCalc does not require you to create an account or provide any personal
            information. All calculations are performed in your browser and no input data is sent to
            our servers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Analytics</h2>
          <p>
            We use privacy-friendly analytics to understand how visitors use our site. This may
            include anonymous data such as page views, browser type, and referring URLs. No
            personally identifiable information is collected.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Advertising</h2>
          <p>
            We may display advertisements through third-party ad networks such as Google AdSense.
            These services may use cookies to serve ads based on your browsing activity. You can opt
            out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s ad settings
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Cookies</h2>
          <p>
            Our site may use cookies for analytics and advertising purposes. You can control cookie
            settings through your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
          <p>
            If you have questions about this privacy policy, please reach out via our GitHub
            repository.
          </p>
        </section>
      </div>
    </div>
  );
}
