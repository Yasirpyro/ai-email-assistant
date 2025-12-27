import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Box, Cpu, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";

const serviceLinks = [
  { 
    href: "/services/ai-agents", 
    label: "AI Agents & Automations",
    description: "Automate workflows with tool-use agents",
    icon: Cpu
  },
  { 
    href: "/services/custom-ai-chatbots", 
    label: "Custom AI Chatbots",
    description: "On-site assistants that qualify leads",
    icon: Bot
  },
  { 
    href: "/services/3d-ar-modelling", 
    label: "3D & AR Modelling",
    description: "Photoreal assets & AR-ready models",
    icon: Box
  },
];

const navLinks = [
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-strong py-3 shadow-lg shadow-background/50" : "bg-transparent py-5"
      )}
    >
      <nav className="container-main flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/brandlogo.webp"
            alt="HYRX Logo"
            className="w-10 h-10 rounded-lg object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground leading-tight">
              HYRX
            </span>
            <span className="text-[10px] font-light text-foreground/70 tracking-[0.2em] uppercase leading-tight">
              AI studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            link.hasDropdown ? (
              <div 
                key={link.href} 
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none focus:outline-none focus-visible:outline-none flex items-center gap-1",
                    location.pathname === link.href || location.pathname.startsWith(link.href + "/")
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isServicesOpen && "rotate-180"
                  )} />
                </button>

                {/* Services Dropdown */}
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[320px]"
                    >
                      <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl shadow-black/20 overflow-hidden">
                        <div className="p-2">
                          {serviceLinks.map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                <service.icon className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                  {service.label}
                                </span>
                                <span className="text-xs text-muted-foreground mt-0.5">
                                  {service.description}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-border/50 p-2">
                          <Link
                            to="/services"
                            className="flex items-center justify-center gap-2 p-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                          >
                            View all services
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none focus:outline-none focus-visible:outline-none",
                  location.pathname === link.href || location.pathname.startsWith(link.href + "/")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <GradientButton
            to="/contact"
            height="38px"
            className="hidden sm:inline-flex text-sm"
          >
            Request a Quote
          </GradientButton>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-strong border-t border-border/50 overflow-hidden"
          >
            <div className="container-main py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div key={link.href} className="flex flex-col">
                    <Link
                      to={link.href}
                      className={cn(
                        "px-4 py-3 text-base font-medium transition-colors duration-200",
                        location.pathname === link.href || location.pathname.startsWith(link.href + "/")
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                    <div className="ml-4 border-l border-border/50 pl-4 flex flex-col gap-1">
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <service.icon className="w-4 h-4 text-primary" />
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "px-4 py-3 text-base font-medium transition-colors duration-200 outline-none focus:outline-none focus-visible:outline-none",
                      location.pathname === link.href || location.pathname.startsWith(link.href + "/")
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <GradientButton to="/contact" className="mt-4">
                Request a Quote
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}