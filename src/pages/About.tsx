import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
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
                About HxY
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-display mb-6">
                Building the future of{" "}
                <span className="gradient-text">digital experiences</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg">
                HxY Services is a premium technology studio specializing in 3D/AR experiences and AI systems. We partner with innovative companies worldwide to build production-ready solutions that drive real business outcomes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section className="bg-card/30 border-y border-border/30">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="text-headline mb-6">Our Approach</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-body">
                <p>
                  We believe technology should solve real problems, not just demonstrate technical capability. That's why we focus on production-ready solutions with measurable outcomes.
                </p>
                <p>
                  Our team combines deep technical expertise with practical business understanding. We've built 3D experiences for global e-commerce brands, AI agents for enterprise automation, and chatbots that handle thousands of conversations daily.
                </p>
                <p>
                  Every project starts with understanding your goals and constraints. We design solutions that not only work today but scale for tomorrow.
                </p>
              </div>
            </Reveal>
          </div>
          
          <Reveal delay={0.2}>
            <div className="p-8 rounded-2xl bg-card border border-border/50">
              <div className="space-y-6">
                <div>
                  <span className="text-5xl font-bold gradient-text">50+</span>
                  <p className="text-muted-foreground mt-2">Projects delivered</p>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <span className="text-5xl font-bold gradient-text">15+</span>
                  <p className="text-muted-foreground mt-2">Countries served</p>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <span className="text-5xl font-bold gradient-text">99%</span>
                  <p className="text-muted-foreground mt-2">On-time delivery</p>
                </div>
              </div>
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
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Request a Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
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
