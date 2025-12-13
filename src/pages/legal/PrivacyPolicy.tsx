import { Layout } from "@/components/layout/Layout";
import { Section, Reveal } from "@/components/ui/Section";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-main">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                Legal
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-display mb-6">Privacy Policy</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground">Last updated: December 2024</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Section className="section-sm">
        <div className="max-w-3xl prose prose-invert prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
          <Reveal>
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you fill out our contact form, request a quote, or communicate with us via email.
            </p>
            <p>This may include:</p>
            <ul>
              <li>Name and email address</li>
              <li>Company name</li>
              <li>Project details and requirements</li>
              <li>Any other information you choose to provide</li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide requested services</li>
              <li>Send you project updates and communications</li>
              <li>Improve our services and website</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties except as necessary to provide our services or as required by law.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </Reveal>

          <Reveal delay={0.5}>
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:hello@example.com">hello@example.com</a>.
            </p>
          </Reveal>
        </div>
      </Section>
    </Layout>
  );
}
