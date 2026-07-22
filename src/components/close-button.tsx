import { X } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../lib/utils";
import { Button, ButtonProps } from "./button";

export interface CloseButtonProps extends ButtonProps {
  /** The icon rendered inside the button. Defaults to a lucide `X`. */
  icon?: React.ReactNode;
  /** Props forwarded to the default `X` icon. Ignored when `icon` is set. */
  iconProps?: React.ComponentProps<typeof X>;
  position?: CloseButtonPosition;
}

export function CloseButton(props: CloseButtonProps) {
  const {
    size = "icon",
    variant = "ghost",
    position,
    iconProps,
    icon = (
      <X
        {...mergeProps(iconProps, {
          className: tw(
            "text-muted-fg group-hover:text-foreground size-4 transition-colors",
          ),
        })}
      />
    ),
    children,
    ...restProps
  } = props;

  return (
    <Button
      size={size}
      variant={variant}
      aria-label="Close"
      {...mergeProps(restProps, {
        className: cn(
          "group hover:bg-muted/10 rounded-full",
          position && "absolute",
          position && positionStyles[position],
        ),
      })}
    >
      {children ?? icon}
    </Button>
  );
}

export type CloseButtonPosition =
  "top-right" | "top-left" | "bottom-right" | "bottom-left";

const positionStyles: Record<CloseButtonPosition, string> = {
  "top-right": "top-2 right-2",
  "top-left": "top-2 left-2",
  "bottom-right": "right-2 bottom-2",
  "bottom-left": "bottom-2 left-2",
};
