import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Forward header mouse move to Spline only on homepage
  const handleHeaderMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (location.pathname !== "/") return;
    const canvas = window.__heroSplineCanvas;
    if (!canvas) return;

    const evt = new MouseEvent("mousemove", {
      bubbles: true,
      cancelable: true,
      clientX: e.clientX,
      clientY: e.clientY,
    });

    canvas.dispatchEvent(evt);
  };

  return (
    <header
      onMouseMove={handleHeaderMouseMove}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-strong py-3 shadow-lg shadow-background/50" : "bg-transparent py-5"
      )}
    >
      <nav className="container-main flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/brandlogo.png"
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
              ))
              }
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