import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Workflow, Shield, BarChart3, Check, Zap, FileSearch, Database } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Cards";

const deliverables = [
  "Custom LangGraph agent architecture",
  "Tool integrations (APIs, databases, services)",
  "Retrieval-Augmented Generation (RAG) pipeline",
  "Evaluation framework with test cases",
  "Guardrails and content filtering",
  "Observability and logging setup",
];

const useCases = [
  {
    icon: FileSearch,
    title: "Document Processing",
    description: "Automated extraction, analysis, and summarization of documents.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Multi-step processes with decision logic and external integrations.",
  },
  {
    icon: Database,
    title: "Data Analysis",
    description: "Intelligent querying and insights from complex datasets.",
  },
  {
    icon: Zap,
    title: "Task Orchestration",
    description: "Coordinate multiple tools and services for complex operations.",
  },
];

const process = [
  { step: "01", title: "Requirements Analysis", description: "Define agent capabilities, tools needed, and success criteria." },
  { step: "02", title: "Architecture Design", description: "Design the agent graph, state management, and integration points." },
  { step: "03", title: "Development & Testing", description: "Build with continuous evaluation using real-world test cases." },
  { step: "04", title: "Deploy & Monitor", description: "Production deployment with observability and feedback loops." },
];

export default function ServiceAgents() {
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
                  <Cpu className="w-7 h-7 text-primary" />
                </div>
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                  LangChain / LangGraph Agents
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-display mb-6">
                Intelligent agents that{" "}
                <span className="gradient-text">automate workflows</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-body-lg">
                We build production-grade AI agents with tool-use capabilities, robust evaluations, and monitoring—designed for reliability and real business impact.
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
          description="End-to-end agent solutions ready for production."
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
              eyebrow="Built for Production"
              title="Reliable agents with safeguards"
              centered={false}
            />
            <div className="mt-8 space-y-4">
              <Reveal delay={0.1}>
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Evaluation-driven development</span>
                    <p className="text-sm text-muted-foreground">Continuous testing with diverse test cases ensures consistent quality.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Guardrails and filtering</span>
                    <p className="text-sm text-muted-foreground">Prevent harmful outputs and ensure appropriate responses.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex items-start gap-3">
                  <Workflow className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">Full observability</span>
                    <p className="text-sm text-muted-foreground">Comprehensive logging and monitoring for debugging and optimization.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          
          <Reveal>
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <pre className="text-sm text-muted-foreground overflow-x-auto">
{`# LangGraph Agent Structure
graph = StateGraph(AgentState)

graph.add_node("retrieve", retrieval_node)
graph.add_node("reason", reasoning_node)
graph.add_node("act", action_node)
graph.add_node("evaluate", eval_node)

graph.add_edge("retrieve", "reason")
graph.add_conditional_edges(
    "reason",
    route_decision,
    {"act": "act", "respond": END}
)
graph.add_edge("act", "evaluate")
graph.add_edge("evaluate", "reason")`}
              </pre>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Use Cases */}
      <Section className="bg-card/30 border-y border-border/30">
        <SectionHeader
          eyebrow="Use Cases"
          title="Automation across industries"
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
            <h2 className="text-headline mb-4">Ready to automate your workflows?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-2xl mx-auto mb-8">
              Let's discuss your automation needs and design a solution.
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
