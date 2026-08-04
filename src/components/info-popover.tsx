import { Info } from "lucide-react";
import React from "react";
import { mergeProps, tw } from "../lib/utils";
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
    popupProps,
    positionerProps,
    buttonProps,
    infoIconProps,
    arrowProps,
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
          {...mergeProps(buttonProps, { className: tw("-m-1 p-1") })}
        >
          <Info
            {...mergeProps(infoIconProps, {
              className: tw("text-muted-fg size-4"),
            })}
          />
        </Button>
      }
      popupProps={mergeProps(popupProps, {
        "aria-label":
          typeof fieldLabel === "string"
            ? `Information about ${fieldLabel}`
            : "Information",
        className: tw(
          "body-sm bg-foreground text-background max-w-[min(300px,calc(100vw-3rem))] rounded px-3 py-2 text-center outline-0",
        ),
      })}
      positionerProps={{
        side: "top",
        ...positionerProps,
      }}
      arrowElement={<></>}
      arrowProps={mergeProps(arrowProps, { className: tooltipArrowStyles })}
      {...restProps}
    >
      {children}
    </Popover>
  );
}
