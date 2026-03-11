import {
  Button as BaseUIButton,
  ButtonProps as BaseUIButtonProps,
} from "@base-ui/react/button";
import React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps extends BaseUIButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    children,
    className,
    focusableWhenDisabled = true,
    ...restProps
  } = props;

  return (
    <BaseUIButton
      className={(state) =>
        buttonStyles({
          variant,
          size,
          extend:
            typeof className === "function" ? className(state) : className,
        })
      }
      focusableWhenDisabled={focusableWhenDisabled}
      {...restProps}
    >
      {children}
    </BaseUIButton>
  );
}

const baseButtonStyles =
  "transition-colors font-inherit m-0 flex items-center justify-center gap-2 rounded-lg select-none outline-highlight focus-visible:focus-outline data-disabled:cursor-not-allowed data-disabled:opacity-60";

const variantStyles = {
  primary:
    "bg-primary text-on-primary hover:bg-primary/90 active:bg-primary/80",
  secondary:
    "bg-secondary text-on-secondary hover:bg-secondary/90 active:bg-secondary/80",
  muted: "bg-muted text-on-muted hover:bg-muted/90 active:bg-muted/80",
  error:
    "bg-error text-on-error hover:bg-error/90 active:bg-error/80 outline-foreground",
  success:
    "bg-success text-on-success hover:bg-success/90 active:bg-success/80 outline-foreground",
  outline:
    "bg-transparent border text-foreground hover:bg-muted/10 active:bg-muted/20",
  ghost: "bg-transparent text-foreground hover:bg-muted/10 active:bg-muted/20",
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
