import { Link } from "react-router-dom";
import { ArrowRight, Box, Bot, Cpu } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, StaggerContainer, StaggerItem, Reveal } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/Cards";

const services = [
  {
    icon: Box,
    title: "3D & AR Modelling",
    description: "Photoreal assets & AR-ready models for modern product experiences. Web-optimized and AR-ready deliverables.",
    href: "/services/3d-ar-modelling",
  },
  {
    icon: Cpu,
    title: "LangChain / LangGraph Agents",
    description: "Automate complex workflows with intelligent agents, tool integrations, and evaluation frameworks.",
    href: "/services/ai-agents-langgraph",
  },
  {
    icon: Bot,
    title: "Custom AI Chatbots",
    description: "On-site assistants that qualify leads, answer questions, and route requests with human handoff.",
    href: "/services/custom-ai-chatbots",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-main">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                Services
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-display mb-6">
                Technology solutions that{" "}
                <span className="gradient-text">deliver results</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg">
                From immersive 3D experiences to intelligent AI systems, we build production-ready solutions designed for performance and reliability.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Section>
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard {...service} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative p-8 sm:p-12 rounded-3xl bg-card border border-border/50 text-center">
          <Reveal>
            <h2 className="text-headline mb-4">Not sure which service fits?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-2xl mx-auto mb-8">
              Let's discuss your project and find the right solution together.
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
