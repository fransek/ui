import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from "@base-ui/react/button";
import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      {...props}
      className={cn(
        "fransek-ui bg-primary text-on-primary py-2 px-3 rounded-lg cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    />
  );
}

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
  link: "bg-transparent text-link hover:underline underline-offset-4",
};

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;
