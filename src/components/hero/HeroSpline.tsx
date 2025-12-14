import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import robotPngUrl from "../../../robot.png";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SCENE_URL =
  "https://prod.spline.design/AIbqm8RibWJQVdFf/scene.splinecode";

function RobotLoadingFallback({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="hero-spline-fallback"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.995, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.01, filter: "blur(10px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={robotPngUrl}
            alt="Robot preview"
            className="hero-spline-fallback w-full h-full object-contain"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function StaticFallback({ reason }: { reason: "mobile" | "reduced-motion" }) {
  const message =
    reason === "mobile"
      ? "Interactive 3D demo available on desktop"
      : "3D demo disabled (reduced motion enabled)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full rounded-2xl flex items-center justify-center overflow-hidden relative bg-transparent"
    >
      <div className="relative z-10 flex flex-col items-center gap-4 p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-primary/80 to-accent shadow-xl shadow-primary/30" />
        <p className="text-sm text-muted-foreground max-w-[240px]">{message}</p>
      </div>
    </motion.div>
  );
}

function useInView(
  threshold: number = 0.1
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold, rootMargin: "250px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

export function HeroSpline() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [containerRef, isInView] = useInView(0.1);
  const [isLoaded, setIsLoaded] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Keep a reference to the canvas so other components (like SiteHeader) can forward events too
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const canvas = el.querySelector("canvas");
    window.__heroSplineCanvas = canvas;

    return () => {
      // only clear if it points to our canvas
      if (window.__heroSplineCanvas === canvas) {
        window.__heroSplineCanvas = null;
      }
    };
  }, []);

  const forwardMouseMoveToCanvas = (e: ReactMouseEvent<HTMLDivElement>) => {
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

  if (prefersReducedMotion) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full aspect-square max-w-[620px] rounded-2xl overflow-hidden">
          <StaticFallback reason="reduced-motion" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[600px] flex items-center justify-center lg:justify-end"
    >
      {/* Glowing light effect behind the Spline model */}
      <div className="hero-spline-glow absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div
        ref={wrapperRef}
        onMouseMove={forwardMouseMoveToCanvas}
        className="hero-spline-canvas w-full aspect-square max-w-[520px] lg:max-w-[620px] rounded-2xl overflow-hidden relative bg-transparent lg:ml-auto z-10"
        style={{ pointerEvents: isMobile ? "none" : "auto" }}
      >
        <RobotLoadingFallback visible={!isLoaded} />

        {isInView ? (
          <Suspense fallback={null}>
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, scale: 1.015, filter: "blur(10px)" }}
              animate={
                isLoaded
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 1.015, filter: "blur(10px)" }
              }
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Spline
                scene={SPLINE_SCENE_URL}
                onLoad={() => setIsLoaded(true)}
                style={{ width: "100%", height: "100%", background: "transparent" }}
              />
            </motion.div>
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}