import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, href, className }: ServiceCardProps) {
  return (
    <Link to={href} className={cn("group block", className)}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="relative h-full p-6 sm:p-8 rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/40"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          
          <h3 className="text-title mb-3 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-body mb-5">{description}</p>
          
          <span className="inline-flex items-center gap-2 text-primary text-sm font-medium">
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
        
        {/* Corner accent */}
        <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </Link>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn("p-6 rounded-xl bg-card/50 border border-border/30", className)}>
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

interface DemoCardProps {
  title: string;
  description: string;
  deliverables: string[];
  timeline: string;
  className?: string;
}

export function DemoCard({ title, description, deliverables, timeline, className }: DemoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative p-6 sm:p-8 rounded-2xl bg-card border border-border/50 overflow-hidden group",
        className
      )}
    >
      {/* Badge */}
      <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full mb-4">
        Concept Demo
      </span>
      
      <h3 className="text-title mb-3 text-foreground">{title}</h3>
      <p className="text-body mb-5">{description}</p>
      
      <div className="space-y-3">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Deliverables</span>
          <ul className="mt-2 space-y-1">
            {deliverables.map((item, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Timeline</span>
          <p className="mt-1 text-sm text-foreground/80">{timeline}</p>
        </div>
      </div>
      
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
