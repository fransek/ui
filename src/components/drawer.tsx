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
import { cn, cnBaseUI } from "../lib/utils";
import { Button } from "./button";
import { ScrollArea, ScrollAreaProps } from "./scroll-area";

export interface DrawerProps
  extends DrawerRootProps, Omit<DrawerTriggerProps, "children" | "render"> {
  trigger?: DrawerTriggerProps["render"];
  /**
   * The width of the drawer, as any CSS length (e.g. `"24rem"`, `"480px"`,
   * `"50vw"`). Sets the `--drawer-width` custom property on the popup.
   * @default "30rem"
   */
  width?: string;
  portalProps?: DrawerPortalProps;
  backdropProps?: DrawerBackdropProps;
  viewportProps?: DrawerViewportProps;
  popupProps?: DrawerPopupProps;
  scrollAreaProps?: ScrollAreaProps;
  contentProps?: DrawerContentProps;
  closeProps?: DrawerCloseProps;
  closeButtonProps?: DrawerCloseProps;
  closeButtonIconProps?: React.ComponentProps<typeof X>;
}

export function Drawer(props: DrawerProps) {
  const {
    trigger,
    width,
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
    swipeDirection = "right",
    triggerId,
    portalProps,
    backdropProps: { className: backdropClassName, ...backdropProps } = {},
    viewportProps: { className: viewportClassName, ...viewportProps } = {},
    popupProps: { className: popupClassName, ...popupProps } = {},
    scrollAreaProps: {
      className: scrollAreaClassName,
      ...scrollAreaProps
    } = {},
    contentProps: { className: contentClassName, ...contentProps } = {},
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
                "fixed inset-0 flex items-stretch justify-end p-(--viewport-padding) [--viewport-padding:0px]",
                viewportClassName,
              )}
              {...viewportProps}
            >
              <BaseUIDrawer.Popup
                className={cnBaseUI(
                  "bg-card -mr-[3rem] flex h-full w-[calc(var(--drawer-width)+3rem)] max-w-[calc(100vw-3rem+3rem)] transform-[translateX(var(--drawer-swipe-movement-x))] touch-auto flex-col border-l px-6 py-8 pr-[calc(1.5rem+3rem)] shadow-[0.25rem_0.25rem_0] shadow-black/12 transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none [--bleed:3rem] [--drawer-width:30rem] data-ending-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-swiping:select-none",
                  popupClassName,
                )}
                {...popupProps}
                style={
                  {
                    ...popupProps.style,
                    ...(width ? { "--drawer-width": width } : {}),
                  } as React.CSSProperties
                }
              >
                {!disablePointerDismissal && (
                  <DrawerClose
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cnBaseUI(
                          "absolute top-2 right-[calc(var(--spacing)*2+3rem)]",
                          closeButtonClassName,
                        )}
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
                )}
                <ScrollArea
                  className={cnBaseUI("min-h-0 flex-1", scrollAreaClassName)}
                  {...scrollAreaProps}
                >
                  <BaseUIDrawer.Content
                    className={cnBaseUI(
                      "mx-auto flex w-full flex-col gap-4",
                      contentClassName,
                    )}
                    {...contentProps}
                  >
                    {typeof children === "function"
                      ? children(renderProps)
                      : children}
                  </BaseUIDrawer.Content>
                </ScrollArea>
              </BaseUIDrawer.Popup>
            </BaseUIDrawer.Viewport>
          </BaseUIDrawer.Portal>
        </>
      )}
    </BaseUIDrawer.Root>
  );
}

export function DrawerTitle(props: DrawerTitleProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUIDrawer.Title
      className={cnBaseUI("heading-5", className)}
      {...restProps}
    />
  );
}

export function DrawerDescription(props: DrawerDescriptionProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUIDrawer.Description
      className={cnBaseUI("body-2 text-body", className)}
      {...restProps}
    />
  );
}

export function DrawerClose(props: DrawerCloseProps) {
  return <BaseUIDrawer.Close {...props} />;
}
