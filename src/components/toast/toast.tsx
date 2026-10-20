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
import { Button, ButtonProps } from "../button";
import { CloseButton } from "../close-button";
import { Spinner } from "../spinner";

/**
 * Sets the toast's icon. `loading` shows a spinner and keeps the toast open
 * until it is updated; `toast.promise()` sets it (and `success` / `error`)
 * for you.
 */
export type ToastType = "info" | "success" | "warning" | "danger" | "loading";

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
  /**
   * Whether each toast renders a close button in its top-right corner. Turn
   * it off when toasts bring their own actions; a swipe or the timeout still
   * dismisses them.
   * @default true
   */
  closeButton?: boolean;
  portalProps?: BaseUI.ToastPortalProps;
  viewportProps?: BaseUI.ToastViewportProps;
  toastProps?: Omit<BaseUI.ToastRootProps, "toast">;
}

export interface ToastAction extends Omit<ButtonProps, "children"> {
  /** The button's text. */
  label: React.ReactNode;
  /**
   * Whether clicking the button closes the toast after its `onClick` runs.
   * @default true
   */
  closeOnClick?: boolean;
}

/** Design-system options accepted by `add`, `update` and `promise`. */
export interface ToastOptions {
  /**
   * Replaces the type's default icon. Pass `null` or `false` to render no
   * icon. The icon is decorative and hidden from assistive technology.
   */
  icon?: React.ReactNode;
  /**
   * Buttons rendered in a row below the description. They default to the
   * `outline` variant at size `sm`. Screen readers only announce the title
   * and description, so make sure each action can also be reached elsewhere.
   */
  actions?: ToastAction[];
  /**
   * Overrides the provider's `closeButton` for this toast.
   */
  closeButton?: boolean;
}

// Matches Base UI's default so untyped `toast.data` stays as loose as before.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyToastData = any;

export type ToastObject<Data extends object = AnyToastData> =
  BaseUI.ToastObject<Data> & ToastOptions;

export type ToastAddOptions<Data extends object = AnyToastData> =
  BaseUI.ToastManagerAddOptions<Data> & ToastOptions;

export type ToastUpdateOptions<Data extends object = AnyToastData> =
  BaseUI.ToastManagerUpdateOptions<Data> & ToastOptions;

export interface ToastPromiseOptions<
  Value,
  Data extends object = AnyToastData,
> {
  loading: string | ToastUpdateOptions<Data>;
  success:
    | string
    | ToastUpdateOptions<Data>
    | ((result: Value) => string | ToastUpdateOptions<Data>);
  error:
    | string
    | ToastUpdateOptions<Data>
    | ((error: unknown) => string | ToastUpdateOptions<Data>);
}

interface ToastMethods<Data extends object> {
  add: <T extends Data = Data>(options: ToastAddOptions<T>) => string;
  close: (toastId?: string) => void;
  update: <T extends Data = Data>(
    toastId: string,
    options:
      | ToastUpdateOptions<T>
      | ((prevToast: ToastObject<T>) => ToastUpdateOptions<T>),
  ) => void;
  promise: <Value, T extends Data = Data>(
    promise: Promise<Value>,
    options: ToastPromiseOptions<Value, T>,
  ) => Promise<Value>;
}

export interface UseToastReturnValue<
  Data extends object = AnyToastData,
> extends ToastMethods<Data> {
  toasts: ToastObject<Data>[];
}

export interface ToastManager<Data extends object = AnyToastData>
  extends
    Omit<BaseUI.ToastManager<Data>, keyof ToastMethods<Data>>,
    ToastMethods<Data> {}

const typeIcons: Record<Exclude<ToastType, "loading">, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleX,
};

const typeIconStyles: Record<Exclude<ToastType, "loading">, string> = {
  info: tw("text-primary-fg"),
  success: tw("text-success-fg"),
  warning: tw("text-warning-fg"),
  danger: tw("text-danger-fg"),
};

function defaultIcon(type: string | undefined) {
  // `toast.promise()` reports failures as `error`.
  if (type === "error") type = "danger";
  if (type === "loading") return <Spinner size="sm" />;
  if (type && type in typeIcons) {
    const Icon = typeIcons[type as keyof typeof typeIcons];
    return <Icon className={typeIconStyles[type as keyof typeof typeIcons]} />;
  }
  return null;
}

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
  "bg-card text-foreground focus-visible:focus-outline absolute right-0 left-0 z-[calc(1000-var(--toast-index))] mx-auto h-(--height) w-full origin-center rounded-lg border bg-clip-padding p-4 shadow-lg select-none [--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] data-ending-style:opacity-0 data-expanded:h-(--toast-height) data-limited:opacity-0",
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
    closeButton = true,
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
            closeButton={closeButton}
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
  closeButton,
  ...toastProps
}: Omit<BaseUI.ToastRootProps, "toast"> & {
  isTop: boolean;
  closeButton: boolean;
}) {
  const { toasts, close } = useToast();

  return toasts.map((toast) => {
    const icon =
      toast.icon === undefined ? defaultIcon(toast.type) : toast.icon;
    const hasCloseButton = toast.closeButton ?? closeButton;
    const hasActions = !!toast.actionProps || !!toast.actions?.length;

    return (
      <BaseUI.Toast.Root
        key={toast.id}
        toast={toast}
        {...mergeProps(toastProps, {
          className: cn(
            baseToastStyles,
            isTop ? topToastStyles : bottomToastStyles,
            hasCloseButton && "pr-10",
          ),
        })}
      >
        <BaseUI.Toast.Content className="flex gap-3 overflow-hidden transition-opacity duration-250 data-behind:pointer-events-none data-behind:opacity-0 data-expanded:pointer-events-auto data-expanded:opacity-100">
          {icon !== null && icon !== false && (
            <span
              aria-hidden="true"
              className="flex h-5 shrink-0 items-center [&>svg]:size-5"
            >
              {icon}
            </span>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <BaseUI.Toast.Title className="body-sm font-semibold empty:hidden" />
            <BaseUI.Toast.Description className="text-body body-sm empty:hidden" />
            {hasActions && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <BaseUI.Toast.Action
                  render={<Button variant="outline" size="sm" />}
                />
                {toast.actions?.map(
                  ({ label, closeOnClick = true, onClick, ...action }, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      {...action}
                      onClick={(event) => {
                        onClick?.(event);
                        if (closeOnClick) close(toast.id);
                      }}
                    >
                      {label}
                    </Button>
                  ),
                )}
              </div>
            )}
          </div>
        </BaseUI.Toast.Content>
        {hasCloseButton && (
          <BaseUI.Toast.Close render={<CloseButton position="top-right" />} />
        )}
      </BaseUI.Toast.Root>
    );
  });
}

/**
 * Returns the current toasts and the methods to add, update and close them.
 * Must be called inside a `ToastProvider`.
 */
export function useToast<Data extends object = AnyToastData>() {
  return BaseUI.Toast.useToastManager<Data>() as UseToastReturnValue<Data>;
}

/**
 * Creates a toast manager for adding toasts from outside React. Pass it to
 * `ToastProvider` through the `toastManager` prop.
 */
export function createToastManager<Data extends object = AnyToastData>() {
  return BaseUI.Toast.createToastManager<Data>() as ToastManager<Data>;
}
