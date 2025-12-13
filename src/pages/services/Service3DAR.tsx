import { Link } from "react-router-dom";
import { ArrowRight, Box, Eye, Smartphone, Gauge, FileCheck, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Cards";

const deliverables = [
  "Production-ready 3D models (glTF/GLB format)",
  "AR-optimized assets for WebAR/ARCore/ARKit",
  "PBR materials and textures",
  "Level-of-detail (LOD) variations",
  "Integration documentation",
  "Performance optimization report",
];

const useCases = [
  {
    icon: Smartphone,
    title: "E-commerce AR",
    description: "Let customers visualize products in their space before purchase.",
  },
  {
    icon: Eye,
    title: "Interactive Configurators",
    description: "Real-time product customization with 3D previews.",
  },
  {
    icon: Gauge,
    title: "Web-based 3D Viewers",
    description: "Embedded 3D experiences optimized for fast loading.",
  },
  {
    icon: FileCheck,
    title: "Digital Twins",
    description: "Accurate 3D representations for visualization and simulation.",
  },
];

const process = [
  { step: "01", title: "Asset Analysis", description: "Review reference materials, define specifications, and establish quality benchmarks." },
  { step: "02", title: "Modelling & Texturing", description: "Create high-fidelity 3D models with PBR materials and accurate details." },
  { step: "03", title: "Optimization", description: "Reduce polygon counts, compress textures, and ensure fast load times." },
  { step: "04", title: "AR Integration", description: "Export and test across target platforms and devices." },
];

export default function Service3DAR() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-main">
          <div className="max-w-3xl">
            <Reveal>
              <Link to="/services" className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
                ← Back to Services
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Box className="w-7 h-7 text-primary" />
                </div>
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                  3D & AR Modelling
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-display mb-6">
                Photoreal 3D assets ready for{" "}
                <span className="gradient-text">web & AR</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-body-lg">
                We create optimized 3D models and AR experiences that load fast, look stunning, and work seamlessly across devices.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <Section className="bg-card/30 border-y border-border/30">
        <SectionHeader
          eyebrow="Deliverables"
          title="What you get"
          description="Complete asset packages ready for production deployment."
        />
        
        <div className="max-w-3xl mx-auto mt-12">
          <div className="grid sm:grid-cols-2 gap-4">
            {deliverables.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Use Cases */}
      <Section>
        <SectionHeader
          eyebrow="Use Cases"
          title="Applications across industries"
          description="3D and AR solutions for global brands and innovative products."
        />
        
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {useCases.map((useCase) => (
            <StaggerItem key={useCase.title}>
              <FeatureCard {...useCase} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Process */}
      <Section className="bg-card/30 border-y border-border/30">
        <SectionHeader
          eyebrow="Our Process"
          title="How we work"
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {process.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.1}>
              <div>
                <span className="text-5xl font-bold text-muted/30">{step.step}</span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <Reveal>
            <h2 className="text-headline mb-4">Ready to create stunning 3D assets?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-2xl mx-auto mb-8">
              Tell us about your project and get a detailed quote.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </Section>
    </Layout>
  );
}
