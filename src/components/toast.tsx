import {
  Toast as BaseUIToast,
  ToastProviderProps as BaseUIToastProviderProps,
  ToastPortalProps,
  ToastRootProps,
  ToastViewportProps,
} from "@base-ui/react/toast";
import {
  CircleCheck,
  CircleX,
  Info,
  LucideIcon,
  TriangleAlert,
  X,
} from "lucide-react";
import React from "react";
import { cn, cnBaseUI } from "../lib/utils";
import { Button } from "./button";

export type ToastType = "info" | "success" | "warning" | "danger";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProviderProps extends BaseUIToastProviderProps {
  /**
   * Where toasts are anchored on the screen.
   * @default "bottom-right"
   */
  position?: ToastPosition;
  portalProps?: ToastPortalProps;
  viewportProps?: ToastViewportProps;
  toastProps?: Omit<ToastRootProps, "toast">;
}

const typeIcons: Record<ToastType, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleX,
};

const typeIconStyles: Record<ToastType, string> = {
  info: "text-primary-fg",
  success: "text-success-fg",
  warning: "text-warning-fg",
  danger: "text-danger-fg",
};

const viewportPositionStyles: Record<ToastPosition, string> = {
  "top-left": "top-4 bottom-auto left-4 right-auto",
  "top-center": "top-4 bottom-auto left-0 right-0 mx-auto",
  "top-right": "top-4 bottom-auto right-4 left-auto",
  "bottom-left": "bottom-4 top-auto left-4 right-auto",
  "bottom-center": "bottom-4 top-auto left-0 right-0 mx-auto",
  "bottom-right": "bottom-4 top-auto right-4 left-auto",
};

const baseViewportStyles =
  "fixed z-50 flex w-[calc(100vw-2rem)] xs:max-w-90 outline-none";

// Shared stacking/animation variables and layout for every toast.
const baseToastStyles =
  "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] absolute left-0 right-0 z-[calc(1000-var(--toast-index))] mx-auto w-full origin-center rounded-lg border bg-card bg-clip-padding p-4 pr-10 text-foreground shadow-lg select-none data-expanded:h-(--toast-height) h-(--height) data-limited:opacity-0 data-ending-style:opacity-0 [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] focus-visible:focus-outline outline-highlight";

// Bottom-anchored stacking maths (toasts grow upward from the bottom edge).
const bottomToastStyles =
  "bottom-0 top-auto origin-bottom [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))] data-starting-style:transform-[translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)] data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]";

// Top-anchored stacking maths (toasts grow downward from the top edge).
const topToastStyles =
  "top-0 bottom-auto origin-top [--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))] transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))] after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))] data-starting-style:transform-[translateY(-150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(-150%)] data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))] data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]";

export function ToastProvider(props: ToastProviderProps) {
  const {
    position = "bottom-right",
    portalProps,
    viewportProps: { className: viewportClassName, ...viewportProps } = {},
    toastProps: { className: toastClassName, ...toastProps } = {},
    children,
    ...providerProps
  } = props;

  const isTop = position.startsWith("top");
  const swipeDirection: ("up" | "down" | "right")[] = isTop
    ? ["up", "right"]
    : ["down", "right"];

  return (
    <BaseUIToast.Provider {...providerProps}>
      {children}
      <BaseUIToast.Portal {...portalProps}>
        <BaseUIToast.Viewport
          className={cnBaseUI(
            baseViewportStyles,
            viewportPositionStyles[position],
            viewportClassName,
          )}
          {...viewportProps}
        >
          <ToastList
            isTop={isTop}
            swipeDirection={swipeDirection}
            className={toastClassName}
            {...toastProps}
          />
        </BaseUIToast.Viewport>
      </BaseUIToast.Portal>
    </BaseUIToast.Provider>
  );
}

function ToastList({
  isTop,
  className,
  ...toastProps
}: Omit<ToastRootProps, "toast"> & { isTop: boolean }) {
  const { toasts } = BaseUIToast.useToastManager();

  return toasts.map((toast) => {
    const type = toast.type as ToastType | undefined;
    const Icon = type ? typeIcons[type] : undefined;

    return (
      <BaseUIToast.Root
        key={toast.id}
        toast={toast}
        className={cnBaseUI(
          baseToastStyles,
          isTop ? topToastStyles : bottomToastStyles,
          className,
        )}
        {...toastProps}
      >
        <BaseUIToast.Content className="flex gap-3 overflow-hidden transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100">
          {Icon && type && (
            <Icon
              className={cn("mt-0.5 size-5 shrink-0", typeIconStyles[type])}
            />
          )}
          <div className="flex min-w-0 flex-col gap-1">
            <BaseUIToast.Title className="body-sm font-semibold empty:hidden" />
            <BaseUIToast.Description className="text-body body-sm empty:hidden" />
          </div>
        </BaseUIToast.Content>
        <BaseUIToast.Close
          render={
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              aria-label="Close"
            />
          }
        >
          <X className="text-muted-fg size-4" />
        </BaseUIToast.Close>
      </BaseUIToast.Root>
    );
  });
}

export const useToast = BaseUIToast.useToastManager;
export const createToastManager = BaseUIToast.createToastManager;
