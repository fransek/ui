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

export type ToastType = "info" | "success" | "warning" | "error";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Responsive `position` map. Values are applied mobile-first: each breakpoint
 * inherits the previous one until overridden, so `{ base: "bottom-center",
 * md: "top-right" }` is `bottom-center` below `md` and `top-right` from `md` up.
 * Positions may freely mix top/bottom anchors across breakpoints.
 */
export interface ResponsiveToastPosition {
  base: ToastPosition;
  sm?: ToastPosition;
  md?: ToastPosition;
  lg?: ToastPosition;
  xl?: ToastPosition;
  "2xl"?: ToastPosition;
}

export type ToastPositionProp = ToastPosition | ResponsiveToastPosition;

export interface ToastProviderProps extends BaseUIToastProviderProps {
  /**
   * Where toasts are anchored on the screen. Accepts a single position or a
   * responsive map keyed by Tailwind breakpoint (`base`, `sm`, `md`, `lg`,
   * `xl`, `2xl`).
   * @default "bottom-right"
   */
  position?: ToastPositionProp;
  portalProps?: ToastPortalProps;
  viewportProps?: ToastViewportProps;
  toastProps?: Omit<ToastRootProps, "toast">;
}

const typeIcons: Record<ToastType, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
};

const typeIconStyles: Record<ToastType, string> = {
  info: "text-primary-foreground",
  success: "text-success-foreground",
  warning: "text-warning-foreground",
  error: "text-error-foreground",
};

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

const orderedBreakpoints: Breakpoint[] = [
  "base",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];

// Viewport vertical anchor. Besides its own on-screen placement, each option
// sets the direction variables that every toast inherits (toasts are DOM
// children of the viewport), which is what lets the top/bottom stacking flip
// responsively without breakpoint-prefixing the heavy transform classes.
const viewportEdgeStyles: Record<
  Breakpoint,
  Record<"top" | "bottom", string>
> = {
  base: {
    top: "top-4 bottom-auto [--dir-y:1] [--origin-y:top] [--edge-top:0] [--edge-bottom:auto] [--bridge-top:auto] [--bridge-bottom:100%]",
    bottom:
      "bottom-4 top-auto [--dir-y:-1] [--origin-y:bottom] [--edge-top:auto] [--edge-bottom:0] [--bridge-top:100%] [--bridge-bottom:auto]",
  },
  sm: {
    top: "sm:top-4 sm:bottom-auto sm:[--dir-y:1] sm:[--origin-y:top] sm:[--edge-top:0] sm:[--edge-bottom:auto] sm:[--bridge-top:auto] sm:[--bridge-bottom:100%]",
    bottom:
      "sm:bottom-4 sm:top-auto sm:[--dir-y:-1] sm:[--origin-y:bottom] sm:[--edge-top:auto] sm:[--edge-bottom:0] sm:[--bridge-top:100%] sm:[--bridge-bottom:auto]",
  },
  md: {
    top: "md:top-4 md:bottom-auto md:[--dir-y:1] md:[--origin-y:top] md:[--edge-top:0] md:[--edge-bottom:auto] md:[--bridge-top:auto] md:[--bridge-bottom:100%]",
    bottom:
      "md:bottom-4 md:top-auto md:[--dir-y:-1] md:[--origin-y:bottom] md:[--edge-top:auto] md:[--edge-bottom:0] md:[--bridge-top:100%] md:[--bridge-bottom:auto]",
  },
  lg: {
    top: "lg:top-4 lg:bottom-auto lg:[--dir-y:1] lg:[--origin-y:top] lg:[--edge-top:0] lg:[--edge-bottom:auto] lg:[--bridge-top:auto] lg:[--bridge-bottom:100%]",
    bottom:
      "lg:bottom-4 lg:top-auto lg:[--dir-y:-1] lg:[--origin-y:bottom] lg:[--edge-top:auto] lg:[--edge-bottom:0] lg:[--bridge-top:100%] lg:[--bridge-bottom:auto]",
  },
  xl: {
    top: "xl:top-4 xl:bottom-auto xl:[--dir-y:1] xl:[--origin-y:top] xl:[--edge-top:0] xl:[--edge-bottom:auto] xl:[--bridge-top:auto] xl:[--bridge-bottom:100%]",
    bottom:
      "xl:bottom-4 xl:top-auto xl:[--dir-y:-1] xl:[--origin-y:bottom] xl:[--edge-top:auto] xl:[--edge-bottom:0] xl:[--bridge-top:100%] xl:[--bridge-bottom:auto]",
  },
  "2xl": {
    top: "2xl:top-4 2xl:bottom-auto 2xl:[--dir-y:1] 2xl:[--origin-y:top] 2xl:[--edge-top:0] 2xl:[--edge-bottom:auto] 2xl:[--bridge-top:auto] 2xl:[--bridge-bottom:100%]",
    bottom:
      "2xl:bottom-4 2xl:top-auto 2xl:[--dir-y:-1] 2xl:[--origin-y:bottom] 2xl:[--edge-top:auto] 2xl:[--edge-bottom:0] 2xl:[--bridge-top:100%] 2xl:[--bridge-bottom:auto]",
  },
};

// Viewport horizontal alignment.
const viewportAlignStyles: Record<
  Breakpoint,
  Record<"left" | "center" | "right", string>
> = {
  base: {
    left: "left-4 right-auto mx-0",
    center: "left-0 right-0 mx-auto",
    right: "right-4 left-auto mx-0",
  },
  sm: {
    left: "sm:left-4 sm:right-auto sm:mx-0",
    center: "sm:left-0 sm:right-0 sm:mx-auto",
    right: "sm:right-4 sm:left-auto sm:mx-0",
  },
  md: {
    left: "md:left-4 md:right-auto md:mx-0",
    center: "md:left-0 md:right-0 md:mx-auto",
    right: "md:right-4 md:left-auto md:mx-0",
  },
  lg: {
    left: "lg:left-4 lg:right-auto lg:mx-0",
    center: "lg:left-0 lg:right-0 lg:mx-auto",
    right: "lg:right-4 lg:left-auto lg:mx-0",
  },
  xl: {
    left: "xl:left-4 xl:right-auto xl:mx-0",
    center: "xl:left-0 xl:right-0 xl:mx-auto",
    right: "xl:right-4 xl:left-auto xl:mx-0",
  },
  "2xl": {
    left: "2xl:left-4 2xl:right-auto 2xl:mx-0",
    center: "2xl:left-0 2xl:right-0 2xl:mx-auto",
    right: "2xl:right-4 2xl:left-auto 2xl:mx-0",
  },
};

const baseViewportStyles =
  "fixed z-50 flex w-[calc(100vw-2rem)] sm:max-w-90 outline-none";

// Every toast is styled statically and reads its stacking direction from the
// CSS variables the viewport sets per breakpoint: `--dir-y` (-1 bottom / +1
// top) drives the transform maths, `--origin-y` the transform origin,
// `--edge-*` the absolute anchor, and `--bridge-*` the invisible hover bridge
// that keeps the stack expanded while the pointer travels between toasts.
const baseToastStyles =
  "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-swipe-movement-y)+var(--dir-y)*(var(--toast-offset-y)+var(--toast-index)*var(--gap)))] absolute left-0 right-0 top-(--edge-top) bottom-(--edge-bottom) z-[calc(1000-var(--toast-index))] mx-auto w-full origin-[center_var(--origin-y)] rounded-lg border bg-card bg-clip-padding p-4 pr-10 text-foreground shadow-lg select-none data-expanded:h-(--toast-height) h-(--height) data-limited:opacity-0 data-ending-style:opacity-0 [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+var(--dir-y)*(var(--toast-index)*var(--peek)+var(--shrink)*var(--height))))_scale(var(--scale))] data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))] data-starting-style:transform-[translateY(calc(var(--dir-y)*-150%))] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(calc(var(--dir-y)*-150%))] data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))] data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] after:absolute after:left-0 after:top-(--bridge-top) after:bottom-(--bridge-bottom) after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']";

function normalizePosition(
  position: ToastPositionProp,
): ResponsiveToastPosition {
  return typeof position === "string" ? { base: position } : position;
}

function parsePosition(position: ToastPosition): {
  edge: "top" | "bottom";
  align: "left" | "center" | "right";
} {
  const separator = position.indexOf("-");
  return {
    edge: position.slice(0, separator) as "top" | "bottom",
    align: position.slice(separator + 1) as "left" | "center" | "right",
  };
}

// Emit viewport classes only for breakpoints that define a position; the
// undefined ones inherit via Tailwind's mobile-first cascade.
function buildViewportPositionClasses(
  position: ResponsiveToastPosition,
): string {
  const classes: string[] = [];
  for (const breakpoint of orderedBreakpoints) {
    const value = position[breakpoint];
    if (!value) continue;
    const { edge, align } = parsePosition(value);
    classes.push(
      viewportEdgeStyles[breakpoint][edge],
      viewportAlignStyles[breakpoint][align],
    );
  }
  return classes.join(" ");
}

// Allow swiping toward whichever edges the toast can be anchored to across all
// breakpoints; `right` is always dismissible.
function buildSwipeDirection(
  position: ResponsiveToastPosition,
): ("up" | "down" | "right")[] {
  const edges = new Set<"top" | "bottom">();
  for (const breakpoint of orderedBreakpoints) {
    const value = position[breakpoint];
    if (value) edges.add(parsePosition(value).edge);
  }

  const swipeDirection: ("up" | "down" | "right")[] = [];
  if (edges.has("top")) swipeDirection.push("up");
  if (edges.has("bottom")) swipeDirection.push("down");
  swipeDirection.push("right");
  return swipeDirection;
}

export function ToastProvider(props: ToastProviderProps) {
  const {
    position = "bottom-right",
    portalProps,
    viewportProps: { className: viewportClassName, ...viewportProps } = {},
    toastProps: { className: toastClassName, ...toastProps } = {},
    children,
    ...providerProps
  } = props;

  const normalizedPosition = normalizePosition(position);
  const swipeDirection = buildSwipeDirection(normalizedPosition);

  return (
    <BaseUIToast.Provider {...providerProps}>
      {children}
      <BaseUIToast.Portal {...portalProps}>
        <BaseUIToast.Viewport
          className={cnBaseUI(
            baseViewportStyles,
            buildViewportPositionClasses(normalizedPosition),
            viewportClassName,
          )}
          {...viewportProps}
        >
          <ToastList
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
  className,
  ...toastProps
}: Omit<ToastRootProps, "toast">) {
  const { toasts } = BaseUIToast.useToastManager();

  return toasts.map((toast) => {
    const type = toast.type as ToastType | undefined;
    const Icon = type ? typeIcons[type] : undefined;

    return (
      <BaseUIToast.Root
        key={toast.id}
        toast={toast}
        className={cnBaseUI(baseToastStyles, className)}
        {...toastProps}
      >
        <BaseUIToast.Content className="flex gap-3 overflow-hidden transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100">
          {Icon && type && (
            <Icon
              className={cn("mt-0.5 size-5 shrink-0", typeIconStyles[type])}
            />
          )}
          <div className="flex min-w-0 flex-col gap-1">
            <BaseUIToast.Title className="body-2 font-semibold empty:hidden" />
            <BaseUIToast.Description className="text-body body-2 empty:hidden" />
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
          <X className="text-muted-foreground size-4" />
        </BaseUIToast.Close>
      </BaseUIToast.Root>
    );
  });
}

export const useToast = BaseUIToast.useToastManager;
export const createToastManager = BaseUIToast.createToastManager;
