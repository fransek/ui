import {
  Popover as BasePopover,
  PopoverCloseProps,
  PopoverDescriptionProps,
  PopoverPopupProps,
  PopoverPortalProps,
  PopoverPositionerProps,
  PopoverRootProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from "@base-ui/react/popover";
import React from "react";
import { cn } from "../lib/utils";

export interface PopoverProps
  extends PopoverRootProps, Omit<PopoverTriggerProps, "children" | "render"> {
  trigger?: PopoverTriggerProps["render"];
  portalProps?: PopoverPortalProps;
  positionerProps?: PopoverPositionerProps;
  popupProps?: PopoverPopupProps;
}

export function Popover({
  trigger,
  actionsRef,
  children,
  defaultOpen,
  defaultTriggerId,
  handle,
  modal,
  onOpenChange,
  onOpenChangeComplete,
  open,
  triggerId,
  portalProps,
  positionerProps: { className: positionerClassName, ...positionerProps } = {},
  popupProps: { className: popupClassName, ...popupProps } = {},
  className,
  ...props
}: PopoverProps) {
  return (
    <BasePopover.Root
      actionsRef={actionsRef}
      defaultOpen={defaultOpen}
      defaultTriggerId={defaultTriggerId}
      handle={handle}
      modal={modal}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      triggerId={triggerId}
    >
      {(renderProps) => (
        <>
          <BasePopover.Trigger
            render={trigger}
            className={className}
            {...props}
          />
          <BasePopover.Portal {...portalProps}>
            <BasePopover.Positioner
              className={cn("z-10 outline-none", positionerClassName)}
              sideOffset={8}
              {...positionerProps}
            >
              <BasePopover.Popup
                className={cn(
                  "bg-background outline-border min-w-(--anchor-width) origin-(--transform-origin) rounded-lg bg-clip-padding p-4 shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
                  popupClassName,
                )}
                {...popupProps}
              >
                {typeof children === "function"
                  ? children(renderProps)
                  : children}
              </BasePopover.Popup>
            </BasePopover.Positioner>
          </BasePopover.Portal>
        </>
      )}
    </BasePopover.Root>
  );
}

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <BasePopover.Title className={cn("heading-6", className)} {...props} />
  );
}

export function PopoverDescription({
  className,
  ...props
}: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      className={cn("text-body body-2", className)}
      {...props}
    />
  );
}

export function PopoverClose(props: PopoverCloseProps) {
  return <BasePopover.Close {...props} />;
}
