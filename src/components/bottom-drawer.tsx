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
   * The height of the drawer, as any CSS length (e.g. `"32rem"`, `"480px"`,
   * `"80dvh"`). By default the drawer grows with its content, capped at the
   * viewport height minus 3rem; content beyond that scrolls.
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
                "fixed inset-0 flex items-end justify-center p-(--viewport-padding) [--viewport-padding:0px]",
                viewportClassName,
              )}
              {...viewportProps}
            >
              <BaseUIDrawer.Popup
                className={cnBaseUI(
                  "bg-card -mb-[3rem] flex max-h-[calc(100dvh-3rem+3rem)] w-full transform-[translateY(var(--drawer-swipe-movement-y))] touch-auto flex-col rounded-t-lg border-t pb-[3rem] shadow-[0_-0.25rem_0] shadow-black/12 transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none [--bleed:3rem] data-ending-style:transform-[translateY(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-[translateY(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-swiping:select-none",
                  popupClassName,
                )}
                {...popupProps}
                style={
                  {
                    ...popupProps.style,
                    ...(height ? { height: `calc(${height} + 3rem)` } : {}),
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
                <div className="min-h-0 overflow-y-auto overscroll-contain px-6 pt-4 pb-8">
                  <BaseUIDrawer.Content
                    className={cnBaseUI(
                      "mx-auto flex w-full flex-col gap-2",
                      contentClassName,
                    )}
                    {...contentProps}
                  >
                    {typeof children === "function"
                      ? children(renderProps)
                      : children}
                  </BaseUIDrawer.Content>
                </div>
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
