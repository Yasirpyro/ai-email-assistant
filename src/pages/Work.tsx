import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Section";
import { DemoCard } from "@/components/ui/Cards";
import { ArrowRight } from "lucide-react";

const demos = [
  {
    title: "AR Product Configurator",
    description: "Interactive 3D product customization with real-time AR preview for e-commerce.",
    deliverables: ["Web-optimized 3D models", "Color/material variants", "AR placement feature", "Performance optimization"],
    timeline: "5-7 weeks",
  },
  {
    title: "Customer Support Agent",
    description: "AI-powered support bot with RAG-based knowledge retrieval and human handoff.",
    deliverables: ["Custom knowledge base", "Intent classification", "Conversation analytics", "Slack/Zendesk integration"],
    timeline: "4-6 weeks",
  },
  {
    title: "Document Analysis Pipeline",
    description: "LangGraph workflow for automated document extraction and structured data output.",
    deliverables: ["Multi-format parsing", "Entity extraction", "Validation rules", "API endpoints"],
    timeline: "6-8 weeks",
  },
  {
    title: "Interactive Product Viewer",
    description: "360° web-based 3D viewer with annotations and zoom functionality.",
    deliverables: ["Optimized 3D models", "Hotspot annotations", "Mobile optimization", "Embed widget"],
    timeline: "3-5 weeks",
  },
  {
    title: "Sales Qualification Bot",
    description: "Chatbot that engages visitors, qualifies leads, and schedules meetings.",
    deliverables: ["Qualification logic", "CRM integration", "Calendar booking", "Lead scoring"],
    timeline: "4-5 weeks",
  },
  {
    title: "Research Assistant Agent",
    description: "Multi-step agent for research tasks with web search and summarization.",
    deliverables: ["Search integration", "Summarization pipeline", "Source citations", "Export formats"],
    timeline: "5-7 weeks",
  },
];

export default function Work() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-main">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                Our Work
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-display mb-6">
                Concept demos &{" "}
                <span className="gradient-text">case studies</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg">
                Explore representative project examples showing the types of solutions we deliver. Each demo illustrates our approach to real-world problems.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Demos Grid */}
      <Section>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {demos.map((demo) => (
            <StaggerItem key={demo.title}>
              <DemoCard {...demo} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border/50 text-center">
          <Reveal>
            <h2 className="text-headline mb-4">Have a project in mind?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-2xl mx-auto mb-8">
              Let's discuss how we can bring your vision to life with production-ready solutions.
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
