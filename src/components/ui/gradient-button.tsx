import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?: ReactNode;
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?: boolean;
  /** When set, clicking the button navigates to this route */
  to?: string;
}

/**
 * A button with a rotating neon gradient border and inset dark background.
 * Supports keyboard accessibility (Enter/Space) and optional React Router navigation.
 */
const GradientButton = forwardRef<HTMLDivElement, GradientButtonProps>(
  (
    {
      children,
      width,
      height = "48px",
      className = "",
      onClick,
      disabled = false,
      to,
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate();

    const handleClick = () => {
      if (disabled) return;
      if (to) {
        navigate(to);
      }
      onClick?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "rotating-gradient-btn",
          "relative rounded-full cursor-pointer",
          "flex items-center justify-center",
          "transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        style={
          {
            "--btn-width": width,
            "--btn-height": height,
            minWidth: width,
            height,
          } as React.CSSProperties
        }
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
        {...props}
      >
        {/* Inset background (dark inner fill) */}
        <span className="absolute inset-[2px] rounded-full bg-background z-[1]" />

        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2 px-6 font-medium text-foreground">
          {children}
        </span>
      </div>
    );
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton };
export type { GradientButtonProps };
