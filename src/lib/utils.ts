import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ClassName, ComponentProps, DefaultProps, Style } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** This function is purely for the tailwind plugin and prettier to work properly */
export function tw(className: string) {
  return className;
}

function mergeClassNames<T>(
  className: ClassName<T>,
  defaultClassName: ClassName<T>,
) {
  const isFn = typeof className === "function";
  const isDefaultFn = typeof defaultClassName === "function";

  if (isFn || isDefaultFn) {
    return (state: T) =>
      cn(
        isDefaultFn ? defaultClassName(state) : defaultClassName,
        isFn ? className(state) : className,
      );
  }
  return cn(defaultClassName, className);
}

function mergeStyles<T>(style: Style<T>, defaultStyle: Style<T>) {
  const isFn = typeof style === "function";
  const isDefaultFn = typeof defaultStyle === "function";

  if (isFn || isDefaultFn) {
    return (state: T) => ({
      ...(isDefaultFn ? defaultStyle(state) : defaultStyle),
      ...(isFn ? style(state) : style),
    });
  }
  return {
    ...defaultStyle,
    ...style,
  };
}

export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref) {
        ref.current = instance;
      }
    });
  };
}

export function mergeProps<P extends ComponentProps | undefined>(
  props: P,
  defaultProps: DefaultProps<P>,
): P {
  const merged = { ...defaultProps, ...props };

  if (props?.className != null || defaultProps?.className != null) {
    merged.className = mergeClassNames(
      props?.className,
      defaultProps?.className,
    );
  }
  if (props?.style != null || defaultProps?.style != null) {
    merged.style = mergeStyles(props?.style, defaultProps?.style);
  }
  if (props?.ref != null || defaultProps?.ref != null) {
    merged.ref = mergeRefs(props?.ref, defaultProps?.ref);
  }

  return merged;
}

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export function useMediaQuery(breakpoint: Breakpoint): boolean {
  return React.useSyncExternalStore(
    (callback) => {
      const mql = mediaQuery(breakpoint);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => mediaQuery(breakpoint).matches,
    () => false,
  );
}

const BREAKPOINT_VARS: Record<Breakpoint, string> = {
  xs: "--breakpoint-xs",
  sm: "--breakpoint-sm",
  md: "--breakpoint-md",
  lg: "--breakpoint-lg",
  xl: "--breakpoint-xl",
  "2xl": "--breakpoint-2xl",
};

function mediaQuery(breakpoint: Breakpoint) {
  return window.matchMedia(
    `(min-width: ${getComputedStyle(document.documentElement)
      .getPropertyValue(BREAKPOINT_VARS[breakpoint])
      .trim()})`,
  );
}
