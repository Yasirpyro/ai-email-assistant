import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Section, Reveal } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";

const services = [
  { id: "3d-ar", label: "3D & AR Modelling" },
  { id: "ai-agents", label: "AI Agents (LangGraph)" },
  { id: "chatbots", label: "Custom AI Chatbots" },
];

const budgetRanges = [
  { value: "15k-30k", label: "$15,000 - $30,000" },
  { value: "30k-50k", label: "$30,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k+", label: "$100,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    services: [] as string[],
    budget: "",
    message: "",
  });

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 1-2 business days.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      services: [],
      budget: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-main">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                Contact
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-display mb-6">
                Let's build something{" "}
                <span className="gradient-text">great together</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg">
                Tell us about your project and we'll get back to you with a detailed proposal within 1-2 business days.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <Section className="section-sm">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <Reveal>
              <h2 className="text-title mb-6">Get in touch</h2>
            </Reveal>
            
            <div className="space-y-6">
              <Reveal delay={0.1}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email</h3>
                    <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hello@example.com
                    </a>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={0.2}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Remote-first, serving clients globally
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            
            <Reveal delay={0.3}>
              <div className="mt-10 p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-medium text-foreground mb-2">Response time</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 1-2 business days. For urgent inquiries, please mention it in your message.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Reveal>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="bg-card border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      required
                      className="bg-card border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company (optional)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company name"
                    className="bg-card border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Services of interest</Label>
                  <div className="flex flex-wrap gap-3">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                          formData.services.includes(service.id)
                            ? "bg-primary/10 border-primary text-foreground"
                            : "bg-card border-border/50 text-muted-foreground hover:border-border"
                        }`}
                      >
                        <Checkbox
                          checked={formData.services.includes(service.id)}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                          className="hidden"
                        />
                        <span className="text-sm">{service.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget range</Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                    <SelectTrigger className="bg-card border-border/50">
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Project details *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project, goals, and timeline..."
                    required
                    rows={6}
                    className="bg-card border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
