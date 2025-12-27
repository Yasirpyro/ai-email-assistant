import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Workflow, Shield, BarChart3, Check, Zap, FileSearch, Database, Minus, Plus } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Section, SectionHeader, Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Cards";

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

function ROICalculatorSection() {
  const [supportReps, setSupportReps] = useState(1);
  const [salesResearchers, setSalesResearchers] = useState(1);

  const manualCost = supportReps * 40000 + salesResearchers * 55000;
  const aiCost = 5000;
  const savings = Math.max(manualCost - aiCost, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Section className="bg-card/30 border-y border-border/30">
      <SectionHeader
        eyebrow="ROI Calculator"
        title="How much is manual work costing you?"
      />
      
      <div className="max-w-4xl mx-auto mt-12">
        <Reveal>
          <div className="relative rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-card/80 p-6 sm:p-8 backdrop-blur-sm overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.02] pointer-events-none" />
            
            <div className="relative grid lg:grid-cols-2 gap-8">
              {/* Left: Pain Points & Inputs */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-foreground">
                    <span className="text-primary">→</span>
                    <span className="text-sm sm:text-base">1 Support Rep = <strong>$40k/year</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <span className="text-primary">→</span>
                    <span className="text-sm sm:text-base">1 Sales Researcher = <strong>$55k/year</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <span className="text-primary">→</span>
                    <span className="text-sm sm:text-base">Our AI Agent = <strong>$5k setup + maintenance</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-primary font-medium">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm sm:text-base">ROI achieved in &lt; 2 months</span>
                  </div>
                </div>

                {/* Mini Calculator Inputs */}
                <div className="pt-4 border-t border-border/30 space-y-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Estimate Your Savings</p>
                  
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm text-muted-foreground">Support Reps</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSupportReps(Math.max(0, supportReps - 1))}
                        className="w-8 h-8 rounded-lg bg-background/50 border border-border/50 flex items-center justify-center hover:bg-background/80 transition-colors"
                        aria-label="Decrease support reps"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium tabular-nums">{supportReps}</span>
                      <button
                        onClick={() => setSupportReps(Math.min(10, supportReps + 1))}
                        className="w-8 h-8 rounded-lg bg-background/50 border border-border/50 flex items-center justify-center hover:bg-background/80 transition-colors"
                        aria-label="Increase support reps"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm text-muted-foreground">Sales Researchers</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSalesResearchers(Math.max(0, salesResearchers - 1))}
                        className="w-8 h-8 rounded-lg bg-background/50 border border-border/50 flex items-center justify-center hover:bg-background/80 transition-colors"
                        aria-label="Decrease sales researchers"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium tabular-nums">{salesResearchers}</span>
                      <button
                        onClick={() => setSalesResearchers(Math.min(10, salesResearchers + 1))}
                        className="w-8 h-8 rounded-lg bg-background/50 border border-border/50 flex items-center justify-center hover:bg-background/80 transition-colors"
                        aria-label="Increase sales researchers"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Calculated Results */}
              <div className="flex flex-col justify-center lg:pl-8 lg:border-l border-border/30">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Manual Cost / Year</span>
                    <span className="text-lg font-semibold text-foreground tabular-nums">{formatCurrency(manualCost)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">AI Agent Setup</span>
                    <span className="text-lg font-semibold text-foreground tabular-nums">{formatCurrency(aiCost)}</span>
                  </div>
                  <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">First-Year Savings</span>
                    <span className="text-2xl font-bold text-primary tabular-nums">{formatCurrency(savings)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-8 text-xs text-muted-foreground/70 text-center">
              Estimates are directional. Final ROI depends on scope, data readiness, and adoption.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

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
                  AI Agents & automations
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
                We build production-grade AI agents with tool-use capabilities, robust evaluations, and monitoring designed for reliability and real business impact.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <ROICalculatorSection />

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
{`# Agent Orchestration Structure
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
                <span className="text-5xl font-bold text-foreground/[0.18]">{step.step}</span>
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
          <Reveal delay={0.2} className="flex justify-center">
            <GradientButton to="/contact">
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </GradientButton>
          </Reveal>
        </div>
      </Section>
    </Layout>
  );
}
