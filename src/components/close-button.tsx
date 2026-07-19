import { X } from "lucide-react";
import React from "react";
import { cnBaseUI } from "../lib/utils";
import { Button, ButtonProps } from "./button";

export interface CloseButtonProps extends ButtonProps {
  /** The icon rendered inside the button. Defaults to a lucide `X`. */
  icon?: React.ReactNode;
  position?: CloseButtonPosition;
}

export function CloseButton(props: CloseButtonProps) {
  const {
    size = "icon",
    variant = "ghost",
    position,
    className,
    icon = <X className="text-muted-fg size-4" />,
    children,
    ...restProps
  } = props;

  return (
    <Button
      size={size}
      variant={variant}
      aria-label="Close"
      className={cnBaseUI(
        "rounded-full",
        position && "absolute",
        position && positionStyles[position],
        className,
      )}
      {...restProps}
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
