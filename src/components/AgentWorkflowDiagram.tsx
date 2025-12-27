import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AgentWorkflowDiagram() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative rounded-2xl border border-border/50 bg-card p-4 sm:p-6 overflow-hidden min-h-[320px] flex items-center justify-center">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* SVG Diagram */}
      <svg
        viewBox="0 0 480 200"
        className="w-full h-auto max-w-[480px] relative z-10"
        aria-label="Agent workflow diagram showing Input, Retrieve, Reason, Act, and Respond nodes connected in a flow"
        role="img"
      >
        <defs>
          {/* Gradient for node strokes */}
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(192, 132, 252)" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill="rgb(34, 211, 238)"
              opacity="0.7"
            />
          </marker>

          {/* Animated dot gradient */}
          <radialGradient id="dotGradient">
            <stop offset="0%" stopColor="rgb(34, 211, 238)" />
            <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Main flow edges */}
        <g className="edges" stroke="url(#nodeGradient)" strokeWidth="1.5" fill="none" opacity="0.6">
          {/* Input -> Retrieve */}
          <line x1="70" y1="140" x2="110" y2="140" markerEnd="url(#arrowhead)" />
          
          {/* Retrieve -> Reason */}
          <line x1="190" y1="140" x2="230" y2="140" markerEnd="url(#arrowhead)" />
          
          {/* Reason -> Act */}
          <line x1="310" y1="140" x2="350" y2="140" markerEnd="url(#arrowhead)" />
          
          {/* Act -> Respond (going right then up) */}
          <path d="M 430 140 L 450 140 L 450 60 L 420 60" markerEnd="url(#arrowhead)" />
          
        </g>

        {/* Nodes */}
        <g className="nodes">
          {/* Input Node */}
          <g transform="translate(20, 115)">
            <rect
              x="0" y="0" width="50" height="50" rx="8"
              fill="rgba(15, 23, 42, 0.8)"
              stroke="url(#nodeGradient)"
              strokeWidth="1.5"
            />
            <text x="25" y="30" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">
              Input
            </text>
          </g>

          {/* Retrieve Node */}
          <g transform="translate(110, 115)">
            <rect
              x="0" y="0" width="80" height="50" rx="8"
              fill="rgba(15, 23, 42, 0.8)"
              stroke="url(#nodeGradient)"
              strokeWidth="1.5"
            />
            <text x="40" y="30" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">
              Retrieve
            </text>
          </g>

          {/* Reason Node */}
          <g transform="translate(230, 115)">
            <rect
              x="0" y="0" width="80" height="50" rx="8"
              fill="rgba(15, 23, 42, 0.8)"
              stroke="url(#nodeGradient)"
              strokeWidth="1.5"
            />
            <text x="40" y="30" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">
              Reason
            </text>
          </g>

          {/* Act Node */}
          <g transform="translate(350, 115)">
            <rect
              x="0" y="0" width="80" height="50" rx="8"
              fill="rgba(15, 23, 42, 0.8)"
              stroke="url(#nodeGradient)"
              strokeWidth="1.5"
            />
            <text x="40" y="30" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">
              Act
            </text>
          </g>

          {/* Respond Node */}
          <g transform="translate(340, 35)">
            <rect
              x="0" y="0" width="80" height="50" rx="8"
              fill="rgba(15, 23, 42, 0.8)"
              stroke="url(#nodeGradient)"
              strokeWidth="1.5"
            />
            <text x="40" y="30" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">
              Respond
            </text>
          </g>

        </g>

        {/* Animated pulse dot - only shows when reduced motion is not preferred */}
        {!prefersReducedMotion && (
          <circle r="4" fill="url(#dotGradient)" filter="url(#glow)">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path="M 45 140 L 150 140 L 270 140 L 390 140 L 450 140 L 450 60 L 380 60"
            />
          </circle>
        )}

        {/* Node pulse animation - only when reduced motion is not preferred */}
        {!prefersReducedMotion && (
          <g className="node-pulse" opacity="0.3">
            <rect x="20" y="115" width="50" height="50" rx="8" fill="none" stroke="rgb(34, 211, 238)">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" begin="0s" />
            </rect>
            <rect x="110" y="115" width="80" height="50" rx="8" fill="none" stroke="rgb(34, 211, 238)">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" begin="0.5s" />
            </rect>
            <rect x="230" y="115" width="80" height="50" rx="8" fill="none" stroke="rgb(34, 211, 238)">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" begin="1s" />
            </rect>
            <rect x="350" y="115" width="80" height="50" rx="8" fill="none" stroke="rgb(34, 211, 238)">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" begin="1.5s" />
            </rect>
            <rect x="340" y="35" width="80" height="50" rx="8" fill="none" stroke="rgb(34, 211, 238)">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" begin="2.5s" />
            </rect>
          </g>
        )}
      </svg>
    </div>
  );
}
