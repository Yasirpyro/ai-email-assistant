import { Link } from "react-router-dom";
import { ArrowRight, Bot, MessageCircle, Users, ArrowRightLeft, Shield, Check, HelpCircle, Headphones, ShoppingBag } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Cards";

const deliverables = [
  "Custom-trained chatbot with your knowledge base",
  "Lead qualification and routing logic",
  "Human handoff integration",
  "Conversation analytics dashboard",
  "Multi-language support",
  "Widget customization and branding",
];

const useCases = [
  {
    icon: HelpCircle,
    title: "Customer Support",
    description: "Answer FAQs, troubleshoot issues, and escalate to humans when needed.",
  },
  {
    icon: Users,
    title: "Lead Qualification",
    description: "Engage visitors, gather information, and route qualified leads.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Assistant",
    description: "Product recommendations, order status, and purchase support.",
  },
  {
    icon: Headphones,
    title: "Internal Help Desk",
    description: "Employee self-service for IT, HR, and operational questions.",
  },
];

const process = [
  { step: "01", title: "Knowledge Mapping", description: "Gather documentation, FAQs, and conversational data to train the bot." },
  { step: "02", title: "Design & Training", description: "Build conversation flows, intents, and train on your content." },
  { step: "03", title: "Integration", description: "Deploy on your website, app, or messaging platforms." },
  { step: "04", title: "Optimize", description: "Monitor conversations, refine responses, and improve over time." },
];

export default function ServiceChatbots() {
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
                  <Bot className="w-7 h-7 text-primary" />
                </div>
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                  Custom AI Chatbots
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-display mb-6">
                Intelligent chatbots that{" "}
                <span className="gradient-text">convert and support</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-body-lg">
                Custom AI assistants that qualify leads, answer questions, and route requests—with built-in safety guardrails and seamless human handoff.
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
          description="Production-ready chatbot solutions with full customization."
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

      {/* Key Features */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              eyebrow="Smart & Safe"
              title="Chatbots you can trust"
              centered={false}
            />
            <div className="mt-8 space-y-4">
              <Reveal delay={0.1}>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Safety guardrails</span>
                    <p className="text-sm text-muted-foreground">Content filtering ensures appropriate, on-brand responses.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex items-start gap-3">
                  <ArrowRightLeft className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Human handoff</span>
                    <p className="text-sm text-muted-foreground">Seamless escalation to live agents when needed.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Knowledge-grounded</span>
                    <p className="text-sm text-muted-foreground">Answers based on your documentation, not hallucinations.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          
          <Reveal>
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              {/* Chat mockup */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-xl bg-muted max-w-[80%]">
                    <p className="text-sm">How does pricing work for your AI agent service?</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="p-3 rounded-xl bg-primary/10 max-w-[80%]">
                    <p className="text-sm">Our AI agent projects typically range from $50,000-$150,000 depending on complexity. This includes architecture design, development, testing, and deployment. Would you like to schedule a call to discuss your specific needs?</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-xl bg-muted max-w-[80%]">
                    <p className="text-sm">Yes, I'd like to speak with someone.</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="p-3 rounded-xl bg-accent/10 max-w-[80%]">
                    <p className="text-sm text-accent">Connecting you with a specialist...</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <ArrowRightLeft className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Use Cases */}
      <Section className="bg-card/30 border-y border-border/30">
        <SectionHeader
          eyebrow="Use Cases"
          title="Chatbots for every need"
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
      <Section>
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
            <h2 className="text-headline mb-4">Ready to deploy your AI assistant?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-2xl mx-auto mb-8">
              Let's discuss your requirements and build a chatbot that works for you.
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
