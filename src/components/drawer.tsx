import {
  Drawer as BaseUIDrawer,
  DrawerBackdropProps,
  DrawerCloseProps,
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerPopupProps,
  DrawerPortalProps,
  DrawerRootProps,
  DrawerTitleProps,
  DrawerTriggerProps,
  DrawerViewportProps,
} from "@base-ui/react/drawer";
import { X } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../lib/utils";
import { CloseButton, CloseButtonProps } from "./close-button";

export type DrawerDirection = "top" | "right" | "bottom" | "left";

export interface DrawerProps
  extends DrawerRootProps, Omit<DrawerTriggerProps, "children" | "render"> {
  trigger?: DrawerTriggerProps["render"];
  /**
   * The edge of the screen the drawer slides in from. Also determines the
   * default `swipeDirection` (`"right"` → right, `"left"` → left, `"top"` →
   * up, `"bottom"` → down) unless `swipeDirection` is set explicitly.
   * @default "right"
   */
  direction?: DrawerDirection;
  /**
   * The width of the drawer, as any CSS length (e.g. `"24rem"`, `"480px"`,
   * `"50vw"`). Sets the `--drawer-width` custom property on the popup. Only
   * applies when `direction` is `"left"` or `"right"`.
   * @default "30rem"
   */
  width?: string;
  /**
   * The height of the drawer, as any CSS length (e.g. `"20rem"`, `"320px"`,
   * `"50vh"`). Sets the `--drawer-height` custom property on the popup. Only
   * applies when `direction` is `"top"` or `"bottom"`.
   * @default "auto"
   */
  height?: string;
  portalProps?: DrawerPortalProps;
  backdropProps?: DrawerBackdropProps;
  viewportProps?: DrawerViewportProps;
  popupProps?: DrawerPopupProps;
  contentProps?: DrawerContentProps;
  closeProps?: DrawerCloseProps;
  closeButtonProps?: CloseButtonProps;
  closeButtonIconProps?: React.ComponentProps<typeof X>;
}

const drawerSwipeDirections: Record<
  DrawerDirection,
  NonNullable<DrawerRootProps["swipeDirection"]>
> = {
  top: "up",
  right: "right",
  bottom: "down",
  left: "left",
};

const drawerViewportStyles: Record<DrawerDirection, string> = {
  top: "flex-col justify-start",
  right: "justify-end",
  bottom: "flex-col justify-end",
  left: "justify-start",
};

const drawerPopupStyles: Record<DrawerDirection, string> = {
  top: "h-(--drawer-height) max-h-[calc(100vh-3rem)] w-full transform-[translateY(var(--drawer-swipe-movement-y))] border-b px-6 py-8 data-ending-style:transform-[translateY(calc(-100%-var(--viewport-padding)-2px))] data-starting-style:transform-[translateY(calc(-100%-var(--viewport-padding)-2px))]",
  right:
    "h-full w-(--drawer-width) max-w-[calc(100vw-3rem)] transform-[translateX(var(--drawer-swipe-movement-x))] border-l px-6 py-8 data-ending-style:transform-[translateX(calc(100%+var(--viewport-padding)+2px))] data-starting-style:transform-[translateX(calc(100%+var(--viewport-padding)+2px))]",
  bottom:
    "h-(--drawer-height) max-h-[calc(100vh-3rem)] w-full transform-[translateY(var(--drawer-swipe-movement-y))] border-t px-6 py-8 data-ending-style:transform-[translateY(calc(100%+var(--viewport-padding)+2px))] data-starting-style:transform-[translateY(calc(100%+var(--viewport-padding)+2px))]",
  left: "h-full w-(--drawer-width) max-w-[calc(100vw-3rem)] transform-[translateX(var(--drawer-swipe-movement-x))] border-r px-6 py-8 data-ending-style:transform-[translateX(calc(-100%-var(--viewport-padding)-2px))] data-starting-style:transform-[translateX(calc(-100%-var(--viewport-padding)-2px))]",
};

export function Drawer(props: DrawerProps) {
  const {
    trigger,
    direction = "right",
    width = "30rem",
    height = "auto",
    actionsRef,
    children,
    defaultOpen,
    defaultSnapPoint,
    defaultTriggerId,
    disablePointerDismissal,
    handle,
    modal = true,
    onOpenChange,
    onOpenChangeComplete,
    onSnapPointChange,
    open,
    snapPoint,
    snapPoints,
    snapToSequentialPoints,
    swipeDirection = drawerSwipeDirections[direction],
    triggerId,
    portalProps,
    backdropProps,
    viewportProps,
    popupProps,
    contentProps,
    closeProps,
    closeButtonProps,
    closeButtonIconProps,
    ...restProps
  } = props;

  const drawerVars = {
    "--drawer-width": width,
    "--drawer-height": height,
  } as React.CSSProperties;

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
              hidden={modal === false}
              {...mergeProps(backdropProps, {
                className: tw(
                  "fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.2] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]",
                ),
              })}
            />
            <BaseUIDrawer.Viewport
              {...mergeProps(viewportProps, {
                className: cn(
                  "pointer-events-none fixed inset-0 flex items-stretch p-(--viewport-padding) [--viewport-padding:0px]",
                  drawerViewportStyles[direction],
                ),
              })}
            >
              <BaseUIDrawer.Popup
                {...mergeProps(popupProps, {
                  className: cn(
                    "bg-background pointer-events-auto touch-auto overflow-y-auto overscroll-contain shadow transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-swiping:select-none",
                    drawerPopupStyles[direction],
                  ),
                  style: drawerVars,
                })}
              >
                <DrawerClose
                  render={
                    <CloseButton
                      position="top-right"
                      iconProps={closeButtonIconProps}
                      {...closeButtonProps}
                    />
                  }
                  {...closeProps}
                />
                <BaseUIDrawer.Content
                  {...mergeProps(contentProps, {
                    className: tw("mx-auto flex w-full flex-col gap-2"),
                  })}
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

export function DrawerTitle(props: DrawerTitleProps) {
  return (
    <BaseUIDrawer.Title
      {...mergeProps(props, { className: tw("heading-sm") })}
    />
  );
}

export function DrawerDescription(props: DrawerDescriptionProps) {
  return (
    <BaseUIDrawer.Description
      {...mergeProps(props, { className: tw("body-sm text-body") })}
    />
  );
}

export function DrawerClose(props: DrawerCloseProps) {
  return <BaseUIDrawer.Close {...props} />;
}
