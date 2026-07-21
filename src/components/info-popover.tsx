import { Info } from "lucide-react";
import React from "react";
import { cn, cnBaseUI } from "../lib/utils";
import { Button, ButtonProps } from "./button";
import { Popover, PopoverProps } from "./popover";
import { tooltipArrowStyles } from "./tooltip";

export interface InfoPopoverProps extends PopoverProps {
  children: React.ReactNode;
  fieldLabel?: React.ReactNode;
  buttonProps?: ButtonProps;
  infoIconProps?: React.ComponentProps<typeof Info>;
}

export function InfoPopover(props: InfoPopoverProps) {
  const {
    children,
    fieldLabel,
    popupProps: { className: popupClassName, ...popupProps } = {},
    positionerProps,
    buttonProps: { className: buttonClassName, ...buttonProps } = {},
    infoIconProps: { className: infoIconClassName, ...infoIconProps } = {},
    arrowProps: { className: arrowClassName, ...arrowProps } = {},
    ...restProps
  } = props;

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
          className={cnBaseUI("-m-1 p-1", buttonClassName)}
          {...buttonProps}
        >
          <Info
            className={cn("text-muted-fg size-4", infoIconClassName)}
            {...infoIconProps}
          />
        </Button>
      }
      popupProps={{
        "aria-label":
          typeof fieldLabel === "string"
            ? `Information about ${fieldLabel}`
            : "Information",
        className: cnBaseUI(
          "body-sm bg-foreground text-background max-w-[min(300px,calc(100vw-3rem))] rounded px-3 py-2 text-center outline-0",
          popupClassName,
        ),
        ...popupProps,
      }}
      positionerProps={{
        side: "top",
        ...positionerProps,
      }}
      arrowElement={<></>}
      arrowProps={{
        className: cn(tooltipArrowStyles, arrowClassName),
        ...arrowProps,
      }}
      {...restProps}
    >
      {children}
    </Popover>
  );
}
