import { useEffect, useState, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Task states
type TaskStatus = "queued" | "running" | "done";

interface Task {
  id: number;
  label: string;
  status: TaskStatus;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, label: "Analyzing requirements", status: "queued" },
  { id: 2, label: "Designing solution architecture", status: "queued" },
  { id: 3, label: "Building RAG knowledge base", status: "queued" },
  { id: 4, label: "Implementing automations", status: "queued" },
  { id: 5, label: "Deploying to production", status: "queued" },
  { id: 6, label: "Monitoring & optimizing", status: "queued" },
];

const LOG_LINES = [
  "[agent] Initializing workflow...",
  "[agent] tool: web_search → found 12 results",
  "[agent] tool: analyze_data → processing...",
  "[agent] tool: code_gen → generating module",
  "[agent] result: validation passed ✓",
  "[agent] tool: deploy → staging environment",
  "[agent] result: all tests passing",
  "[agent] status: workflow complete",
];

// Timing constants (ms)
const TASK_DURATION = 1800;
const LOG_INTERVAL = 900;

/**
 * Hook to detect if screen is desktop (>= 768px)
 */
function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 768px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

// ─────────────────────────────────────────────────────────────────────────────
// Icon Components (inline SVGs)
// ─────────────────────────────────────────────────────────────────────────────

function AgentIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function CircleIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function StatusPill({ isAnimating }: { isAnimating: boolean }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
      <span
        className={`w-2 h-2 rounded-full bg-emerald-400 ${
          isAnimating ? "animate-pulse-dot" : ""
        }`}
      />
      <span className="text-xs font-medium text-emerald-400">Running</span>
    </div>
  );
}

function TaskItem({ task, isAnimating }: { task: Task; isAnimating: boolean }) {
  const isRunning = task.status === "running";
  const isDone = task.status === "done";
  const isQueued = task.status === "queued";

  return (
    <div
      className={`
        relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300
        ${isRunning ? "bg-white/5" : ""}
      `}
    >
      {/* Progress bar for running state */}
      {isRunning && isAnimating && (
        <div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-transparent animate-progress-bar"
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <div
        className={`
          relative z-10 flex items-center justify-center w-5 h-5 shrink-0
          ${isDone ? "text-emerald-400" : ""}
          ${isRunning ? "text-cyan-400" : ""}
          ${isQueued ? "text-white/30" : ""}
        `}
      >
        {isDone && <CheckIcon />}
        {isRunning && isAnimating && <SpinnerIcon />}
        {isRunning && !isAnimating && <CheckIcon />}
        {isQueued && <CircleIcon />}
      </div>

      {/* Label */}
      <span
        className={`
          relative z-10 text-sm transition-colors duration-300
          ${isDone ? "text-white/80" : ""}
          ${isRunning ? "text-white" : ""}
          ${isQueued ? "text-white/40" : ""}
        `}
      >
        {task.label}
      </span>
    </div>
  );
}

function LogArea({
  logs,
  isAnimating,
}: {
  logs: string[];
  isAnimating: boolean;
}) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs appear
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="mt-4 pt-4 border-t border-white/5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium">
          Log
        </span>
        {isAnimating && (
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-dot" />
        )}
      </div>
      <div
        ref={logContainerRef}
        className="h-[72px] overflow-hidden rounded-lg bg-black/30 p-2 font-mono text-[11px] leading-relaxed"
      >
        {logs.map((log, i) => (
          <div
            key={i}
            className={`
              text-white/50 transition-opacity duration-300
              ${i === logs.length - 1 && isAnimating ? "animate-type-in" : ""}
            `}
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function HeroAgentRunner() {
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([LOG_LINES[0]]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  // Memoized reset function
  const resetAnimation = useCallback(() => {
    setTasks(INITIAL_TASKS);
    setCurrentTaskIndex(0);
    setLogs([LOG_LINES[0]]);
    setCurrentLogIndex(0);
  }, []);

  // Task progression
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentTaskIndex((prev) => {
        const next = prev + 1;
        // Reset when all tasks complete
        if (next > INITIAL_TASKS.length) {
          // Small delay before reset
          setTimeout(resetAnimation, 1500);
          return prev;
        }
        return next;
      });

      setTasks((prevTasks) =>
        prevTasks.map((task, index) => {
          if (index < currentTaskIndex) return { ...task, status: "done" };
          if (index === currentTaskIndex) return { ...task, status: "running" };
          return { ...task, status: "queued" };
        })
      );
    }, TASK_DURATION);

    return () => clearInterval(interval);
  }, [currentTaskIndex, prefersReducedMotion, resetAnimation]);

  // Log progression
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        const next = (prev + 1) % LOG_LINES.length;
        return next;
      });

      setLogs((prev) => {
        const newLogs = [...prev, LOG_LINES[(currentLogIndex + 1) % LOG_LINES.length]];
        // Keep only last 6 lines
        return newLogs.slice(-6);
      });
    }, LOG_INTERVAL);

    return () => clearInterval(interval);
  }, [currentLogIndex, prefersReducedMotion]);

  // If reduced motion, show completed static state
  const displayTasks = prefersReducedMotion
    ? INITIAL_TASKS.map((t) => ({ ...t, status: "done" as TaskStatus }))
    : tasks;

  const displayLogs = prefersReducedMotion
    ? ["[agent] Workflow completed successfully ✓"]
    : logs;

  // Don't render on mobile
  if (!isDesktop) {
    return null;
  }

  const isAnimating = !prefersReducedMotion;

  return (
    <div className="relative w-full max-w-[420px] lg:max-w-[440px]">
      {/* Subtle glow effect behind the card */}
      <div
        className="absolute inset-0 pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/4 right-0 w-[150px] h-[150px] bg-fuchsia-500/8 rounded-full blur-[60px]" />
      </div>

      {/* Glass Card */}
      <div
        className={`
          relative w-full
          rounded-2xl border border-white/10
          bg-white/[0.03] backdrop-blur-xl
          overflow-hidden
          z-10
          ${isAnimating ? "animate-fade-in" : ""}
        `}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-fuchsia-500/5 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Top edge glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center text-cyan-400">
                <AgentIcon />
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">
                HYRX Agent
              </span>
            </div>
            <StatusPill isAnimating={isAnimating} />
          </div>

          {/* Task List */}
          <div className="space-y-0.5">
            {displayTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isAnimating={isAnimating}
              />
            ))}
          </div>

          {/* Log Area */}
          <LogArea logs={displayLogs} isAnimating={isAnimating} />
        </div>
      </div>
    </div>
  );
}
