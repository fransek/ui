import * as BaseUI from "@base-ui/react/toast";
import {
  CircleCheck,
  CircleX,
  Info,
  LucideIcon,
  TriangleAlert,
} from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";
import { CloseButton } from "../close-button";

export type ToastType = "info" | "success" | "warning" | "danger";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProviderProps extends BaseUI.ToastProviderProps {
  /**
   * Where toasts are anchored on the screen.
   * @default "bottom-right"
   */
  position?: ToastPosition;
  portalProps?: BaseUI.ToastPortalProps;
  viewportProps?: BaseUI.ToastViewportProps;
  toastProps?: Omit<BaseUI.ToastRootProps, "toast">;
}

const typeIcons: Record<ToastType, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleX,
};

const typeIconStyles: Record<ToastType, string> = {
  info: tw("text-primary-fg"),
  success: tw("text-success-fg"),
  warning: tw("text-warning-fg"),
  danger: tw("text-danger-fg"),
};

const viewportPositionStyles: Record<ToastPosition, string> = {
  "top-left": tw("top-4 right-auto bottom-auto left-4"),
  "top-center": tw("top-4 right-0 bottom-auto left-0 mx-auto"),
  "top-right": tw("top-4 right-4 bottom-auto left-auto"),
  "bottom-left": tw("top-auto right-auto bottom-4 left-4"),
  "bottom-center": tw("top-auto right-0 bottom-4 left-0 mx-auto"),
  "bottom-right": tw("top-auto right-4 bottom-4 left-auto"),
};

const baseViewportStyles = tw(
  "xs:max-w-90 fixed z-50 flex w-[calc(100vw-2rem)] outline-none",
);

// Shared stacking/animation variables and layout for every toast.
const baseToastStyles = tw(
  "bg-card text-foreground focus-visible:focus-outline absolute right-0 left-0 z-[calc(1000-var(--toast-index))] mx-auto h-(--height) w-full origin-center rounded-lg border bg-clip-padding p-4 pr-10 shadow-lg select-none [--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] data-ending-style:opacity-0 data-expanded:h-(--toast-height) data-limited:opacity-0",
);

// Bottom-anchored stacking maths (toasts grow upward from the bottom edge).
const bottomToastStyles = tw(
  "top-auto bottom-0 origin-bottom transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))] data-starting-style:transform-[translateY(150%)] data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]",
);

// Top-anchored stacking maths (toasts grow downward from the top edge).
const topToastStyles = tw(
  "top-0 bottom-auto origin-top transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))] [--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))] after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))] data-starting-style:transform-[translateY(-150%)] data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(-150%)]",
);

export function ToastProvider(props: ToastProviderProps) {
  const {
    position = "bottom-right",
    portalProps,
    viewportProps,
    toastProps,
    children,
    ...providerProps
  } = props;

  const isTop = position.startsWith("top");
  const swipeDirection: ("up" | "down" | "right")[] = isTop
    ? ["up", "right"]
    : ["down", "right"];

  return (
    <BaseUI.Toast.Provider {...providerProps}>
      {children}
      <BaseUI.Toast.Portal {...portalProps}>
        <BaseUI.Toast.Viewport
          {...mergeProps(viewportProps, {
            className: cn(baseViewportStyles, viewportPositionStyles[position]),
          })}
        >
          <ToastList
            isTop={isTop}
            swipeDirection={swipeDirection}
            {...toastProps}
          />
        </BaseUI.Toast.Viewport>
      </BaseUI.Toast.Portal>
    </BaseUI.Toast.Provider>
  );
}

function ToastList({
  isTop,
  ...toastProps
}: Omit<BaseUI.ToastRootProps, "toast"> & { isTop: boolean }) {
  const { toasts } = BaseUI.Toast.useToastManager();

  return toasts.map((toast) => {
    const type = toast.type as ToastType | undefined;
    const Icon = type ? typeIcons[type] : undefined;

    return (
      <BaseUI.Toast.Root
        key={toast.id}
        toast={toast}
        {...mergeProps(toastProps, {
          className: cn(
            baseToastStyles,
            isTop ? topToastStyles : bottomToastStyles,
          ),
        })}
      >
        <BaseUI.Toast.Content className="flex gap-3 overflow-hidden transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100">
          {Icon && type && (
            <Icon
              className={cn("mt-0.5 size-5 shrink-0", typeIconStyles[type])}
            />
          )}
          <div className="flex min-w-0 flex-col gap-1">
            <BaseUI.Toast.Title className="body-sm font-semibold empty:hidden" />
            <BaseUI.Toast.Description className="text-body body-sm empty:hidden" />
          </div>
        </BaseUI.Toast.Content>
        <BaseUI.Toast.Close render={<CloseButton position="top-right" />} />
      </BaseUI.Toast.Root>
    );
  });
}

export const useToast = BaseUI.Toast.useToastManager;
export const createToastManager = BaseUI.Toast.createToastManager;
