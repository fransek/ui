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

/**
 * Merges refs while keeping the result's identity stable across renders.
 *
 * `mergeRefs` builds a new function on every call, so handing its result
 * straight to an element gives React a different ref each render, and React
 * then detaches (calls with `null`) and reattaches it on every commit. Base UI
 * primitives register their trigger element from a callback ref and write that
 * registration into a store, so the churn re-renders the component and loops.
 *
 * Returns the lone ref when only one is present, and `undefined` when there is
 * none, so a component that has no ref of its own to add never fabricates one.
 *
 * Follows the rules of hooks: call it unconditionally at the top level of a
 * component. Use `mergeRefs` where that isn't possible.
 */
export function useMergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.Ref<T> | undefined {
  return React.useMemo(
    () => {
      const present = refs.filter((ref) => ref != null);

      if (present.length === 0) {
        return undefined;
      }
      if (present.length === 1) {
        return present[0];
      }
      return mergeRefs(...present);
    },
    // Rebuilt only when one of the refs it wraps changes identity. Call sites
    // pass a fixed number of refs, so the dependency list keeps its length.
    refs,
  );
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
  if (props?.ref != null && defaultProps?.ref != null) {
    merged.ref = mergeRefs(props.ref, defaultProps.ref);
  } else if (props?.ref != null || defaultProps?.ref != null) {
    // Forward a lone ref untouched. Wrapping it would hand the element a new
    // ref identity on every render, making React detach and reattach it — which
    // breaks Base UI primitives whose callback refs write to a store (they
    // register triggers there, so the writes loop back into another render).
    merged.ref = props?.ref ?? defaultProps?.ref;
  }

  return merged;
}

/**
 * `mergeProps` with a ref that keeps its identity across renders.
 *
 * Only differs from `mergeProps` when both sides carry a ref: `mergeProps`
 * merges those into a fresh callback each render, which React reattaches on
 * every commit. Reach for this whenever a component adds a ref of its own to
 * the default props; plain `mergeProps` stays correct when the caller's ref is
 * the only one, since it is then forwarded untouched.
 *
 * Follows the rules of hooks: call it unconditionally at the top level of a
 * component. Sub-props merged inside conditional JSX keep using `mergeProps`.
 */
export function useMergeProps<P extends ComponentProps | undefined>(
  props: P,
  defaultProps: DefaultProps<P>,
): P {
  const ref = useMergeRefs(props?.ref, defaultProps?.ref);
  const merged = mergeProps(props, defaultProps);

  if (ref != null && merged != null) {
    merged.ref = ref;
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
