import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Box, Bot, Cpu, Shield, Zap, FileCheck, BarChart3, MessageSquare, Search, Database, ArrowRightLeft, CheckCircle2, HelpCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Section";
import { ServiceCard, DemoCard } from "@/components/ui/Cards";
import { HeroSpline } from "@/components/hero/HeroSpline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: Box,
    title: "3D & AR Modelling",
    description: "Photoreal assets & AR-ready models for modern product experiences.",
    href: "/services/3d-ar-modelling",
  },
  {
    icon: Cpu,
    title: "LangChain / LangGraph Agents",
    description: "Automate workflows with tool-use agents and robust eval-driven iterations.",
    href: "/services/ai-agents-langgraph",
  },
  {
    icon: Bot,
    title: "Custom AI Chatbots",
    description: "On-site assistants that qualify leads, answer questions, and route requests.",
    href: "/services/custom-ai-chatbots",
  },
];

const trustPillars = [
  { icon: Zap, label: "Production-first delivery" },
  { icon: BarChart3, label: "Measurable performance" },
  { icon: Shield, label: "Secure-by-design" },
  { icon: FileCheck, label: "Clear documentation & handoff" },
];

const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "We analyze your requirements, define success metrics, and scope the project.",
  },
  {
    step: "02",
    title: "Build",
    description: "Our team develops production-ready solutions with continuous feedback loops.",
  },
  {
    step: "03",
    title: "Validate",
    description: "Rigorous testing, evals, and quality assurance ensure reliability.",
  },
  {
    step: "04",
    title: "Launch & Optimize",
    description: "Smooth deployment with monitoring, documentation, and ongoing support.",
  },
];

const demos = [
  {
    title: "AR Product Preview",
    description: "Interactive 3D models with AR placement for e-commerce products.",
    deliverables: ["Web-ready 3D models", "AR viewer integration", "Performance optimization"],
    timeline: "4-6 weeks",
  },
  {
    title: "Support Chatbot",
    description: "AI-powered customer support with knowledge base integration.",
    deliverables: ["Custom trained model", "Human handoff system", "Analytics dashboard"],
    timeline: "3-5 weeks",
  },
  {
    title: "LangGraph Automation",
    description: "Multi-step agent workflow for document processing and analysis.",
    deliverables: ["Agent pipeline", "Tool integrations", "Evaluation framework"],
    timeline: "5-8 weeks",
  },
];

const faqs = [
  {
    question: "What are typical project timelines?",
    answer: "Most projects range from 3-8 weeks depending on complexity. 3D/AR models typically take 4-6 weeks, AI chatbots 3-5 weeks, and complex agent workflows 5-8 weeks. We provide detailed timelines during the discovery phase.",
  },
  {
    question: "What is the pricing range for your services?",
    answer: "Projects typically start at $15,000 for focused deliverables. Complex enterprise solutions range from $50,000-$150,000+. We provide detailed quotes based on your specific requirements after an initial consultation.",
  },
  {
    question: "How do you handle data privacy and security?",
    answer: "We follow industry best practices including encryption at rest and in transit, secure API integrations, and compliance with GDPR and CCPA where applicable. For AI systems, we implement guardrails and content filtering.",
  },
  {
    question: "Who owns the final deliverables and code?",
    answer: "You retain full ownership of all custom code, models, and assets we create for your project. We provide complete documentation and source files upon project completion.",
  },
  {
    question: "What ongoing support do you offer?",
    answer: "We offer flexible support packages including bug fixes, model retraining, performance monitoring, and feature updates. Support terms are defined during project scoping.",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left content */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  3D • AR • AI
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-display mb-6"
              >
                Build production-ready{" "}
                <span className="gradient-text">3D, AR & AI</span>{" "}
                systems.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-body-lg max-w-xl mb-8"
              >
                HxY Services delivers immersive 3D/AR assets, LangGraph agents, and custom AI chatbots—designed for performance, reliability, and real business outcomes.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Request a Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/services">Explore Services</Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Right - Spline */}
            <div className="relative lg:h-[600px]">
              <HeroSpline />
            </div>
          </div>
        </div>
        
        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      </section>

      {/* Trust Pillars */}
      <Section className="section-sm border-y border-border/30">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {trustPillars.map((pillar) => (
            <StaggerItem key={pillar.label}>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{pillar.label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Services Section */}
      <Section>
        <SectionHeader
          eyebrow="Our Expertise"
          title="End-to-end solutions for modern digital products"
          description="From immersive 3D experiences to intelligent AI systems, we build technology that delivers measurable results."
        />
        
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard {...service} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Workflow Visualization */}
      <Section className="bg-card/30 border-y border-border/30">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="How It Works"
              title="Reliable AI agents with built-in safeguards"
              description="Our agent workflows include evaluation loops, guardrails, and monitoring—so you can trust the outputs."
              centered={false}
            />
            
            <div className="mt-8 space-y-4">
              <Reveal delay={0.3}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Evaluation-driven</span>
                    <p className="text-sm text-muted-foreground">Continuous testing ensures quality responses</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Guardrails & filtering</span>
                    <p className="text-sm text-muted-foreground">Prevent harmful or off-topic outputs</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.5}>
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Observability</span>
                    <p className="text-sm text-muted-foreground">Full logging and performance monitoring</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          
          {/* Workflow diagram */}
          <Reveal>
            <div className="relative p-6 sm:p-8 rounded-2xl bg-card border border-border/50">
              <div className="space-y-4">
                {/* Nodes */}
                {[
                  { icon: MessageSquare, label: "User Input", color: "primary" },
                  { icon: Search, label: "Retrieval", color: "accent" },
                  { icon: Cpu, label: "Tool Use", color: "primary" },
                  { icon: Database, label: "Logging", color: "accent" },
                  { icon: ArrowRightLeft, label: "Response", color: "primary" },
                ].map((node, i) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${node.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                      <node.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                    <span className="text-sm font-medium text-foreground">{node.label}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Connection line */}
              <div className="absolute left-[2.25rem] top-[4.5rem] bottom-[4.5rem] w-px bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Demos Section */}
      <Section>
        <SectionHeader
          eyebrow="Concept Demos"
          title="See what's possible"
          description="Explore representative project examples showing the types of solutions we deliver."
        />
        
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {demos.map((demo) => (
            <StaggerItem key={demo.title}>
              <DemoCard {...demo} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Process Section */}
      <Section className="bg-card/30 border-y border-border/30">
        <SectionHeader
          eyebrow="Our Process"
          title="From concept to production"
          description="A structured approach that ensures clarity, quality, and on-time delivery."
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.1}>
              <div className="relative">
                <span className="text-6xl font-bold text-muted/30">{step.step}</span>
                <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions"
          description="Answers to the questions we hear most often."
        />
        
        <div className="max-w-3xl mx-auto mt-12">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/50 rounded-xl px-6 bg-card/50 data-[state=open]:bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium">{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border/50 text-center overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <Reveal>
              <h2 className="text-headline mb-4">Ready to scope your project?</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body-lg max-w-2xl mx-auto mb-8">
                Let's discuss your requirements and create a roadmap for success.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Request a Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
