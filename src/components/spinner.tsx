import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export interface SpinnerProps extends React.ComponentProps<"svg"> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  /** Accessible label announced to screen readers. Defaults to "Loading". */
  label?: string;
  /** Optional caption rendered alongside the spinner. */
  text?: React.ReactNode;
  /**
   * Optional list of captions cycled through at `interval` milliseconds.
   * Takes precedence over `text` when non-empty.
   */
  texts?: React.ReactNode[];
  /** Milliseconds between `texts` transitions. Defaults to 2000. */
  interval?: number;
  /**
   * Whether to restart from the first caption after the last one.
   * When false, cycling stops on the last caption. Defaults to true.
   */
  loopTexts?: boolean;
  /**
   * Milliseconds to wait before rendering the spinner. Avoids a flash of the
   * spinner when loading usually resolves quickly. Defaults to 0.
   */
  delay?: number;
  /** Where to place the caption relative to the spinner. Defaults to "bottom". */
  textPosition?: SpinnerTextPosition;
  /** Props forwarded to the wrapper element rendered when `text` is set. */
  containerProps?: React.ComponentProps<"div">;
}

export function Spinner(props: SpinnerProps) {
  const {
    size = "md",
    variant = "primary",
    label = "Loading",
    text,
    texts,
    interval = 2000,
    loopTexts = true,
    delay = 0,
    textPosition = "bottom",
    containerProps: { className: containerClassName, ...containerProps } = {},
    className,
    ...restProps
  } = props;

  const [visible, setVisible] = useState(delay <= 0);

  useEffect(() => {
    if (delay <= 0) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const id = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  const textCount = texts?.length ?? 0;
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (!visible || textCount < 2) {
      return;
    }
    // Start each visible run from the first caption so the delay window never
    // silently advances the text.
    setTextIndex(0);
    const id = setInterval(() => {
      setTextIndex((current) => {
        if (!loopTexts && current >= textCount - 1) {
          clearInterval(id);
          return current;
        }
        return (current + 1) % textCount;
      });
    }, interval);
    return () => clearInterval(id);
  }, [visible, textCount, interval, loopTexts]);

  const currentText = textCount > 0 ? texts![textIndex % textCount] : text;
  const hasText = currentText != null;

  if (!visible) {
    return null;
  }

  const spinner = (
    <svg
      role={hasText ? undefined : "status"}
      aria-label={hasText ? undefined : label}
      aria-hidden={hasText ? true : undefined}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={spinnerStyles({ size, variant, extend: className })}
      {...restProps}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );

  if (!hasText) {
    return spinner;
  }

  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "flex items-center",
        size === "sm" ? "gap-1.5" : "gap-2",
        textPosition === "bottom" ? "flex-col" : "flex-row",
        containerClassName,
      )}
      {...containerProps}
    >
      {spinner}
      <span
        className={cn(
          "text-muted-fg text-center",
          size === "sm" ? "text-xs" : "text-sm",
        )}
      >
        {currentText}
      </span>
    </div>
  );
}

const baseSpinnerStyles =
  "animate-spin shrink-0 motion-reduce:[animation-duration:2s]";

const sizeStyles = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

const variantStyles = {
  primary: "text-primary",
  secondary: "text-secondary-fg",
  muted: "text-muted-fg",
  danger: "text-danger",
  success: "text-success",
  current: "text-current",
};

export const spinnerStyles = ({
  size = "md",
  variant = "primary",
  extend,
}: {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  extend?: string;
}) => cn(baseSpinnerStyles, sizeStyles[size], variantStyles[variant], extend);

export type SpinnerSize = keyof typeof sizeStyles;
export type SpinnerVariant = keyof typeof variantStyles;
export type SpinnerTextPosition = "bottom" | "right";
