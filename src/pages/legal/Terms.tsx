import { Layout } from "@/components/layout/Layout";
import { Section, Reveal } from "@/components/ui/Section";

export default function Terms() {
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
              <h1 className="text-display mb-6">Terms of Service</h1>
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
            <h2>1. Services</h2>
            <p>
              HxY Services provides 3D modelling, AR development, and AI solutions. The specific scope of work for each project is defined in individual project agreements.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2>2. Intellectual Property</h2>
            <p>
              Upon full payment, clients receive full ownership of custom code, models, and assets created specifically for their project. We retain the right to use general methodologies and non-client-specific techniques in future projects.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h2>3. Payment Terms</h2>
            <p>
              Payment terms are specified in individual project agreements. Typical arrangements include a deposit upon project commencement with remaining balance due upon completion or at defined milestones.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <h2>4. Confidentiality</h2>
            <p>
              We maintain strict confidentiality of all client information, project details, and proprietary data. We do not disclose client relationships or project details without explicit permission.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <h2>5. Limitation of Liability</h2>
            <p>
              Our liability is limited to the fees paid for the specific services in question. We are not liable for indirect, incidental, or consequential damages arising from the use of our services.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <h2>6. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <h2>7. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:hello@example.com">hello@example.com</a>.
            </p>
          </Reveal>
        </div>
      </Section>
    </Layout>
  );
}
