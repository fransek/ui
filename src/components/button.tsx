import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from "@base-ui/react/button";
import React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps extends BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        "font-inherit focus-visible:outline-highlight m-0 flex items-center justify-center gap-2 rounded-lg px-3 py-2 outline-0 select-none focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-60",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      focusableWhenDisabled
      {...props}
    >
      {children}
    </BaseButton>
  );
}

const baseButtonStyles =
  "font-inherit focus-visible:outline-highlight m-0 flex items-center justify-center gap-2 rounded-lg px-3 py-2 outline-0 select-none focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-60";

const variantStyles = {
  primary:
    "bg-primary text-on-primary hover:bg-primary/90 active:bg-primary/80",
  secondary:
    "bg-secondary text-on-secondary hover:bg-secondary/90 active:bg-secondary/80",
  muted: "bg-muted text-on-muted hover:bg-muted/90 active:bg-muted/80",
  error: "bg-error text-on-error hover:bg-error/90 active:bg-error/80",
  success:
    "bg-success text-on-success hover:bg-success/90 active:bg-success/80",
  outline:
    "bg-transparent border text-foreground hover:bg-muted/10 active:bg-muted/20",
  ghost: "bg-transparent text-foreground hover:bg-muted/10 active:bg-muted/20",
  link: "bg-transparent text-link-foreground hover:underline underline-offset-4",
};

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
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
