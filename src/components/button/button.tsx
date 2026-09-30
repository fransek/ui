import * as BaseUI from "@base-ui/react/button";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";
import { Tooltip, TooltipProps } from "../tooltip";

export interface ButtonProps extends BaseUI.ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  compact?: boolean;
  tooltip?: React.ReactNode;
  tooltipProps?: TooltipProps;
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    children,
    tooltip,
    tooltipProps,
    compact,
    ...restProps
  } = props;

  const button = (
    <BaseUI.Button
      focusableWhenDisabled
      aria-label={
        typeof tooltip === "string" && size === "icon" ? tooltip : undefined
      }
      {...mergeProps(restProps, {
        className: buttonStyles({ variant, size, compact }),
      })}
    >
      {children}
    </BaseUI.Button>
  );

  if (tooltip)
    return (
      <Tooltip trigger={button} {...tooltipProps}>
        {tooltip}
      </Tooltip>
    );

  return button;
}

const baseButtonStyles = tw(
  "font-inherit outline-highlight focus-visible:focus-outline m-0 flex cursor-pointer items-center justify-center gap-2 rounded-lg transition-[color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,scale] select-none focus-visible:outline-offset-1 aria-disabled:cursor-not-allowed data-disabled:cursor-not-allowed data-disabled:opacity-60",
);

// Disabled buttons stay focusable (no native `disabled`), so :active still
// matches. Base UI marks them with data-disabled, react-day-picker's nav
// buttons with aria-disabled.
const pressStyles = tw("not-data-disabled:not-aria-disabled:active:scale-97");

const variantStyles = {
  primary: tw("bg-primary text-on-primary hover:bg-primary-hover"),
  secondary: tw("bg-secondary text-on-secondary hover:bg-secondary-hover"),
  muted: tw("bg-muted text-on-muted hover:bg-muted-hover"),
  danger: tw("bg-danger text-on-danger hover:bg-danger-hover"),
  "danger-subtle": tw(
    "bg-danger-subtle text-on-danger-subtle hover:bg-danger-subtle-hover",
  ),
  warning: tw("bg-warning text-on-warning hover:bg-warning-hover"),
  "warning-subtle": tw(
    "bg-warning-subtle text-on-warning-subtle hover:bg-warning-subtle-hover",
  ),
  success: tw("bg-success hover:bg-success-hover text-on-success"),
  "success-subtle": tw(
    "bg-success-subtle text-on-success-subtle hover:bg-success-subtle-hover",
  ),
  outline: tw(
    "text-foreground hover:border-muted-fg hover:bg-muted/10 border bg-transparent",
  ),
  ghost: tw("text-foreground hover:bg-muted/10 bg-transparent"),
  link: tw(
    "text-link decoration-link/50 hover:decoration-link/75 active:decoration-link bg-transparent underline underline-offset-2",
  ),
};

const sizeStyles = {
  icon: "p-1.5",
  sm: "text-xs min-w-16 px-2.5 py-1.5 font-normal",
  md: "text-sm min-w-20 px-3 py-2 font-semibold",
  lg: "text-base min-w-24 px-4 py-2 font-semibold",
};

export const buttonStyles = ({
  variant = "primary",
  size = "md",
  compact,
  extend,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  compact?: boolean;
  extend?: string;
}) =>
  cn(
    baseButtonStyles,
    variant !== "link" && pressStyles,
    variantStyles[variant],
    sizeStyles[size],
    compact && "min-w-0 px-1.5 py-0",
    extend,
  );

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;
