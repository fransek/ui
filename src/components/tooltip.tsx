import {
  Tooltip as BaseUITooltip,
  TooltipArrowProps,
  TooltipPopupProps,
  TooltipPortalProps,
  TooltipPositionerProps,
  TooltipProviderProps,
  TooltipRootProps,
  TooltipTriggerProps,
} from "@base-ui/react/tooltip";
import React from "react";
import { mergeProps, tw } from "../lib/utils";

export interface TooltipProps
  extends
    TooltipRootProps,
    Omit<
      TooltipTriggerProps,
      "children" | "render" | "handle" | "payload" | "disabled"
    > {
  trigger?: TooltipTriggerProps["render"];
  arrow?: boolean;
  portalProps?: TooltipPortalProps;
  positionerProps?: TooltipPositionerProps;
  popupProps?: TooltipPopupProps;
  arrowProps?: TooltipArrowProps;
}

export function Tooltip(props: TooltipProps) {
  const {
    trigger,
    arrow = true,
    actionsRef,
    children,
    defaultOpen,
    defaultTriggerId,
    disabled,
    disableHoverablePopup,
    handle,
    onOpenChange,
    onOpenChangeComplete,
    open,
    trackCursorAxis,
    triggerId,
    portalProps,
    positionerProps,
    popupProps,
    arrowProps,
    className,
    ...restProps
  } = props;

  return (
    <BaseUITooltip.Root
      actionsRef={actionsRef}
      defaultOpen={defaultOpen}
      defaultTriggerId={defaultTriggerId}
      disabled={disabled}
      disableHoverablePopup={disableHoverablePopup}
      handle={handle}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      trackCursorAxis={trackCursorAxis}
      triggerId={triggerId}
    >
      {(renderProps) => (
        <>
          <BaseUITooltip.Trigger
            render={trigger}
            className={className}
            {...restProps}
          />
          <BaseUITooltip.Portal {...portalProps}>
            <BaseUITooltip.Positioner
              sideOffset={8}
              {...mergeProps(positionerProps, {
                className: tw("z-10 outline-none"),
              })}
            >
              <BaseUITooltip.Popup
                {...mergeProps(popupProps, {
                  className: tw(
                    "body-sm bg-foreground text-background max-w-[min(300px,calc(100vw-3rem))] origin-(--transform-origin) rounded-md px-2 py-1 shadow-lg transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-90 data-starting-style:opacity-0",
                  ),
                })}
              >
                {arrow && (
                  <BaseUITooltip.Arrow
                    {...mergeProps(arrowProps, {
                      className: tooltipArrowStyles,
                    })}
                  />
                )}
                {typeof children === "function"
                  ? children(renderProps)
                  : children}
              </BaseUITooltip.Popup>
            </BaseUITooltip.Positioner>
          </BaseUITooltip.Portal>
        </>
      )}
    </BaseUITooltip.Root>
  );
}

export const tooltipArrowStyles =
  "before:bg-foreground relative block h-1.5 w-3 overflow-clip before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:transform-[translate(-50%,50%)_rotate(45deg)] before:content-[''] data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180";

export type { TooltipProviderProps };

export function TooltipProvider(props: TooltipProviderProps) {
  return <BaseUITooltip.Provider {...props} />;
}
