import { Info } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { Button, ButtonProps } from "./button";
import { Popover, PopoverProps } from "./popover";

export interface InfoPopoverProps extends PopoverProps {
  children: React.ReactNode;
  fieldLabel?: React.ReactNode;
  buttonProps?: ButtonProps;
  infoIconProps?: React.ComponentProps<typeof Info>;
}

export function InfoPopover({
  children,
  fieldLabel,
  popupProps: { className: popupClassName, ...popupProps } = {},
  positionerProps,
  arrowSvgProps: { className: arrowSvgClassName, ...arrowSvgProps } = {},
  buttonProps: { className: buttonClassName, ...buttonProps } = {},
  infoIconProps: { className: infoIconClassName, ...infoIconProps } = {},
  ...props
}: InfoPopoverProps) {
  return (
    <Popover
      openOnHover
      arrow
      trigger={
        <Button
          aria-label={
            typeof fieldLabel === "string"
              ? `Show information about ${fieldLabel}`
              : "Show information"
          }
          variant="ghost"
          size="icon"
          className={cn("-m-1 p-1", buttonClassName)}
          {...buttonProps}
        >
          <Info
            className={cn("text-muted-foreground size-4", infoIconClassName)}
            {...infoIconProps}
          />
        </Button>
      }
      popupProps={{
        "aria-label":
          typeof fieldLabel === "string"
            ? `Information about ${fieldLabel}`
            : "Information",
        className: cn(
          "body-2 bg-secondary text-on-secondary px-3 py-2 text-center max-w-[min(300px,calc(100vw-3rem))]",
          popupClassName,
        ),
        ...popupProps,
      }}
      positionerProps={{
        side: "top",
        ...positionerProps,
      }}
      arrowSvgProps={{
        backgroundPathProps: {
          className: cn("fill-secondary", arrowSvgClassName),
        },
        ...arrowSvgProps,
      }}
      {...props}
    >
      {children}
    </Popover>
  );
}
