import { X } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";
import { Button, ButtonProps } from "../button";

export interface CloseButtonProps extends Omit<ButtonProps, "variant"> {
  /** The icon rendered inside the button. Defaults to a lucide `X`. */
  icon?: React.ReactNode;
  /** Props forwarded to the default `X` icon. Ignored when `icon` is set. */
  iconProps?: React.ComponentProps<typeof X>;
  position?: CloseButtonPosition;
}

export function CloseButton(props: CloseButtonProps) {
  const {
    size = "icon-sm",
    position,
    iconProps,
    icon = (
      <X
        {...mergeProps(iconProps, {
          className: tw("size-4"),
        })}
      />
    ),
    children,
    ...restProps
  } = props;

  return (
    <Button
      size={size}
      variant={"ghost"}
      aria-label="Close"
      {...mergeProps(restProps, {
        className: cn(
          "text-muted-fg hover:text-foreground",
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
  "top-right": tw("top-2 right-2"),
  "top-left": tw("top-2 left-2"),
  "bottom-right": tw("right-2 bottom-2"),
  "bottom-left": tw("bottom-2 left-2"),
};
