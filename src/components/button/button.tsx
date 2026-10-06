import * as BaseUI from "@base-ui/react/button";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";
import { useButtonGroupContext } from "../button-group";
import { Tooltip, TooltipProps } from "../tooltip";

export interface ButtonProps extends BaseUI.ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  compact?: boolean;
  tooltip?: React.ReactNode;
  tooltipProps?: TooltipProps;
}

export function Button(props: ButtonProps) {
  const group = useButtonGroupContext();
  const {
    variant = "primary",
    size = group.size ?? "md",
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
  "focus-visible:focus-outline m-0 flex cursor-pointer items-center justify-center gap-2 rounded-lg transition-[color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,scale] select-none focus-visible:outline-offset-1 aria-disabled:cursor-not-allowed data-disabled:cursor-not-allowed data-disabled:opacity-60",
);

// Disabled buttons stay focusable (no native `disabled`), so :active still
// matches. Base UI marks them with data-disabled, react-day-picker's nav
// buttons with aria-disabled. Grouped buttons skip it: scaling one segment
// would pull its shared border away from its neighbours.
const pressStyles = tw(
  "not-in-data-button-group:not-data-disabled:not-aria-disabled:active:scale-97",
);

const variantStyles = {
  primary: tw("primary hover:bg-primary-hover"),
  secondary: tw("secondary hover:bg-secondary-hover"),
  tertiary: tw("tertiary hover:bg-tertiary-hover"),
  muted: tw("muted hover:bg-muted-hover"),
  danger: tw("danger hover:bg-danger-hover"),
  "danger-subtle": tw("danger-subtle hover:bg-danger-subtle-hover"),
  warning: tw("warning hover:bg-warning-hover"),
  "warning-subtle": tw("warning-subtle hover:bg-warning-subtle-hover"),
  success: tw("success hover:bg-success-hover"),
  "success-subtle": tw("success-subtle hover:bg-success-subtle-hover"),
  outline: tw(
    "text-foreground hover:border-muted-fg hover:bg-hover border bg-transparent",
  ),
  ghost: tw("text-foreground hover:bg-hover bg-transparent"),
  link: tw("link bg-transparent"),
};

const sizeStyles = {
  icon: tw("p-1.5"),
  sm: tw("min-w-16 px-2.5 py-1.5 text-xs font-normal"),
  md: tw("min-w-20 px-3 py-2 text-sm font-semibold"),
  lg: tw("min-w-24 px-4 py-2 text-base font-semibold"),
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
