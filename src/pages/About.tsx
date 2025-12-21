import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Section, Reveal } from "@/components/ui/Section";
import { ArrowRight, Target, Zap, Shield, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Production-First",
    description: "We build for real-world deployment from day one. Every solution is optimized for performance, reliability, and maintainability.",
  },
  {
    icon: Zap,
    title: "Speed Without Compromise",
    description: "Fast delivery cycles with rigorous quality standards. We move quickly while maintaining attention to detail.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Security is built in, not bolted on. We follow best practices for data protection and system integrity.",
  },
  {
    icon: Users,
    title: "Collaborative Partnership",
    description: "We work closely with your team, ensuring knowledge transfer and empowering you to iterate independently.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-main">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                About HYRX
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-display mb-6">
                Building production AI systems for{" "}
                <span className="gradient-text">modern teams</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg">
                HYRX is a specialized AI studio that helps teams ship production-ready agents, automations, and chat systems. We partner with ambitious companies to turn high-impact workflows into reliable software—secure, measurable, and built to scale.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Approach - Centered */}
      <Section className="bg-card/30 border-y border-border/30">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-headline mb-6 text-center">Our Approach</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-body">
              <p>
                We believe AI should solve real operational problems—not just demo well. That's why we focus on production-grade delivery: clear scope, reliable behavior, and measurable outcomes.
              </p>
              <p>
                Our work combines strong engineering with practical business context. We design agent workflows with guardrails, evaluation, and observability so your team can trust results and iterate safely.
              </p>
              <p>
                Every engagement starts with your goals, constraints, and data reality. From there we build, validate, and deploy—then hand off clean documentation so you can own the system long-term.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <Reveal>
          <h2 className="text-headline mb-12 text-center">Our Values</h2>
        </Reveal>
        
        <div className="grid sm:grid-cols-2 gap-8">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1}>
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <Reveal>
            <h2 className="text-headline mb-4">Ready to work together?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-2xl mx-auto mb-8">
              Let's discuss your project and explore how we can help.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <GradientButton to="/contact">
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </GradientButton>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </Layout>
  );
}
