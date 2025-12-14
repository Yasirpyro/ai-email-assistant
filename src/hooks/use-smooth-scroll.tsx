import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global Lenis instance for external access
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Premium smooth scrolling hook using Lenis + GSAP ScrollTrigger
 * Provides buttery-smooth inertia scrolling with proper ScrollTrigger integration
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Scroll to a specific target (element, number, or string selector)
  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        easing?: (t: number) => number;
        immediate?: boolean;
        lock?: boolean;
      }
    ) => {
      lenisRef.current?.scrollTo(target, options);
    },
    []
  );

  // Stop scrolling
  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  // Start scrolling
  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Still set up ScrollTrigger but skip Lenis for reduced motion
      ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
      });
      return;
    }

    // Create Lenis instance with premium settings
    const lenis = new Lenis({
      duration: 1.2, // Smooth duration - higher = smoother but slower
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's ticker for smooth RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lagSmooth for better Lenis integration
    gsap.ticker.lagSmoothing(0);

    // Configure ScrollTrigger defaults for premium feel
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    });

    // Handle anchor links smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -100, // Account for fixed header
              duration: 1.2,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("resize", handleResize);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;

      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo,
    stop,
    start,
  };
}
