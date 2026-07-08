import {
  Drawer as BaseUIDrawer,
  DrawerBackdropProps,
  DrawerCloseProps,
  DrawerContentProps,
  DrawerPopupProps,
  DrawerPortalProps,
  DrawerRootProps,
  DrawerTriggerProps,
  DrawerViewportProps,
} from "@base-ui/react/drawer";
import { X } from "lucide-react";
import React from "react";
import { cn, cnBaseUI } from "../lib/utils";
import { Button } from "./button";
import { DrawerClose } from "./drawer";

export interface BottomDrawerProps
  extends DrawerRootProps, Omit<DrawerTriggerProps, "children" | "render"> {
  trigger?: DrawerTriggerProps["render"];
  /**
   * The minimum height of the drawer, as any CSS length (e.g. `"32rem"`,
   * `"480px"`, `"80dvh"`). The drawer grows with its content; when it becomes
   * taller than the viewport, the entire drawer scrolls and its top edge
   * moves off the screen.
   */
  height?: string;
  portalProps?: DrawerPortalProps;
  backdropProps?: DrawerBackdropProps;
  viewportProps?: DrawerViewportProps;
  popupProps?: DrawerPopupProps;
  contentProps?: DrawerContentProps;
  handleProps?: React.ComponentPropsWithoutRef<"div">;
  closeProps?: DrawerCloseProps;
  closeButtonProps?: DrawerCloseProps;
  closeButtonIconProps?: React.ComponentProps<typeof X>;
}

export function BottomDrawer(props: BottomDrawerProps) {
  const {
    trigger,
    height,
    actionsRef,
    children,
    defaultOpen,
    defaultSnapPoint,
    defaultTriggerId,
    disablePointerDismissal,
    handle,
    modal,
    onOpenChange,
    onOpenChangeComplete,
    onSnapPointChange,
    open,
    snapPoint,
    snapPoints,
    snapToSequentialPoints,
    swipeDirection = "down",
    triggerId,
    portalProps,
    backdropProps: { className: backdropClassName, ...backdropProps } = {},
    viewportProps: { className: viewportClassName, ...viewportProps } = {},
    popupProps: { className: popupClassName, ...popupProps } = {},
    contentProps: { className: contentClassName, ...contentProps } = {},
    handleProps: { className: handleClassName, ...handleProps } = {},
    closeProps,
    closeButtonProps: {
      className: closeButtonClassName,
      ...closeButtonProps
    } = {},
    closeButtonIconProps: {
      className: closeButtonIconClassName,
      ...closeButtonIconProps
    } = {},
    ...restProps
  } = props;

  return (
    <BaseUIDrawer.Root
      actionsRef={actionsRef}
      defaultOpen={defaultOpen}
      defaultSnapPoint={defaultSnapPoint}
      defaultTriggerId={defaultTriggerId}
      disablePointerDismissal={disablePointerDismissal}
      handle={handle}
      modal={modal}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      onSnapPointChange={onSnapPointChange}
      open={open}
      snapPoint={snapPoint}
      snapPoints={snapPoints}
      snapToSequentialPoints={snapToSequentialPoints}
      swipeDirection={swipeDirection}
      triggerId={triggerId}
    >
      {(renderProps) => (
        <>
          <BaseUIDrawer.Trigger render={trigger} {...restProps} />
          <BaseUIDrawer.Portal {...portalProps}>
            <BaseUIDrawer.Backdrop
              className={cnBaseUI(
                "fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.2] [--bleed:3rem] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]",
                backdropClassName,
              )}
              {...backdropProps}
            />
            <BaseUIDrawer.Viewport
              className={cnBaseUI(
                "fixed inset-0 flex flex-col overflow-y-auto overscroll-contain p-(--viewport-padding) pt-[3rem] transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] [--viewport-padding:0px] data-ending-style:transform-[translateY(100%)] data-starting-style:transform-[translateY(100%)]",
                viewportClassName,
              )}
              {...viewportProps}
            >
              {/* The viewport carries the exit animation so the travel distance
                  stays one screen regardless of content height. The popup's 1px
                  ending transform keeps a transition running on the popup itself,
                  which Base UI waits for before unmounting. */}
              <BaseUIDrawer.Popup
                className={cnBaseUI(
                  "bg-card relative mt-auto -mb-[3rem] flex w-full transform-[translateY(var(--drawer-swipe-movement-y))] touch-auto flex-col rounded-t-lg border-t pb-[3rem] shadow-[0_-0.25rem_0] shadow-black/12 transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none data-ending-style:transform-[translateY(calc(var(--drawer-swipe-movement-y,0px)+1px))] data-swiping:select-none",
                  popupClassName,
                )}
                {...popupProps}
                style={
                  {
                    ...popupProps.style,
                    ...(height ? { minHeight: `calc(${height} + 3rem)` } : {}),
                  } as React.CSSProperties
                }
              >
                <div
                  aria-hidden
                  className={cn(
                    "bg-border mx-auto mt-3 h-1 w-10 shrink-0 rounded-full",
                    handleClassName,
                  )}
                  {...handleProps}
                />
                <DrawerClose
                  render={
                    <Button
                      className={cnBaseUI(
                        "absolute top-2 right-2",
                        closeButtonClassName,
                      )}
                      variant="ghost"
                      size="icon"
                      aria-label="Close"
                      {...closeButtonProps}
                    >
                      <X
                        className={cn(
                          "text-muted-foreground size-4",
                          closeButtonIconClassName,
                        )}
                        {...closeButtonIconProps}
                      />
                    </Button>
                  }
                  {...closeProps}
                />
                <BaseUIDrawer.Content
                  className={cnBaseUI(
                    "mx-auto flex w-full flex-col gap-2 px-6 pt-4 pb-8",
                    contentClassName,
                  )}
                  {...contentProps}
                >
                  {typeof children === "function"
                    ? children(renderProps)
                    : children}
                </BaseUIDrawer.Content>
              </BaseUIDrawer.Popup>
            </BaseUIDrawer.Viewport>
          </BaseUIDrawer.Portal>
        </>
      )}
    </BaseUIDrawer.Root>
  );
}

export {
  DrawerClose as BottomDrawerClose,
  DrawerDescription as BottomDrawerDescription,
  DrawerTitle as BottomDrawerTitle,
} from "./drawer";
