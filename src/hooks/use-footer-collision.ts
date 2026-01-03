import { useState, useEffect, useCallback, useRef } from "react";

const BUTTON_HEIGHT = 56; // Fallback height
const BUTTON_MARGIN = 24; // Bottom margin (bottom-6 = 24px)
const LIFT_PADDING = 16; // Extra padding when lifting

export function useFooterCollision() {
  const [liftAmount, setLiftAmount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const calculateOverlap = useCallback(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Safe area inset (optional, default to 0)
    const rawInset = getComputedStyle(document.documentElement)
      .getPropertyValue("--safe-area-inset-bottom")
      .trim();
    const parsedInset = Number.parseInt(rawInset || "0", 10);
    const safeAreaInset = Number.isFinite(parsedInset) ? parsedInset : 0;

    const buttonHeight = buttonRef.current?.offsetHeight ?? BUTTON_HEIGHT;

    // Calculate button's bottom position (from viewport bottom)
    const buttonBottom = BUTTON_MARGIN + safeAreaInset;
    const buttonTop = viewportHeight - buttonBottom - buttonHeight;

    // Calculate overlap between the button area and footer top
    const overlap = buttonTop + buttonHeight - footerRect.top;

    if (overlap > 0) {
      setLiftAmount(overlap + LIFT_PADDING);
    } else {
      setLiftAmount(0);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(calculateOverlap);
  }, [calculateOverlap]);

  useEffect(() => {
    // Initial calculation
    calculateOverlap();

    // Set up scroll listener with passive option
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Set up IntersectionObserver for footer
    const footer = document.getElementById("site-footer");
    if (footer) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              calculateOverlap();
            } else {
              setLiftAmount(0);
            }
          });
        },
        { threshold: 0 }
      );
      observer.observe(footer);

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, calculateOverlap]);

  return { liftAmount, buttonRef };
}

