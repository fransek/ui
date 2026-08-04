import {
  Button as BaseUIButton,
  ButtonProps as BaseUIButtonProps,
} from "@base-ui/react/button";
import React from "react";
import { cn, mergeProps } from "../lib/utils";
import { Tooltip, TooltipProps } from "./tooltip";

export interface ButtonProps extends BaseUIButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
    ...restProps
  } = props;

  const button = (
    <BaseUIButton
      focusableWhenDisabled
      aria-label={
        typeof tooltip === "string" && size === "icon" ? tooltip : undefined
      }
      {...mergeProps(restProps, { className: buttonStyles({ variant, size }) })}
    >
      {children}
    </BaseUIButton>
  );

  if (tooltip)
    return (
      <Tooltip trigger={button} {...tooltipProps}>
        {tooltip}
      </Tooltip>
    );

  return button;
}

const baseButtonStyles =
  "transition-colors font-inherit m-0 flex items-center justify-center gap-2 rounded-lg select-none outline-highlight focus-visible:focus-outline data-disabled:cursor-not-allowed data-disabled:opacity-60";

const variantStyles = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "bg-secondary text-on-secondary hover:bg-secondary-hover",
  muted: "bg-muted text-on-muted hover:bg-muted-hover",
  danger: "bg-danger text-on-danger hover:bg-danger-hover outline-foreground",
  warning:
    "bg-warning text-on-warning hover:bg-warning-hover outline-foreground",
  success:
    "bg-success text-on-success hover:bg-success-hover outline-foreground",
  outline:
    "bg-transparent border hover:border-muted-fg text-foreground hover:bg-muted/10",
  ghost: "bg-transparent text-foreground hover:text-primary-fg",
  link: "bg-transparent text-link not-hover:underline underline-offset-4",
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
  extend,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  extend?: string;
}) => cn(baseButtonStyles, variantStyles[variant], sizeStyles[size], extend);

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;
