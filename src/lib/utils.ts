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

/**
 * Merges refs into a single callback ref, memoized on the refs it wraps so the
 * result keeps its identity across renders.
 *
 * Building that callback during render would hand the element a different ref
 * every render, and React then detaches it (calls it with `null`) and
 * reattaches it on every commit. Base UI primitives register their trigger
 * element from a callback ref and write that registration into a popup store,
 * so the churn re-renders the component and loops ("Maximum update depth
 * exceeded").
 *
 * Returns the lone ref when only one is present, and `undefined` when there is
 * none, so a component with no ref of its own never fabricates one.
 *
 * Follows the rules of hooks: call it unconditionally at the top level of a
 * component.
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
      return (instance: T | null) => {
        present.forEach((ref) => {
          if (typeof ref === "function") {
            ref(instance);
          } else {
            ref.current = instance;
          }
        });
      };
    },
    // Rebuilt only when one of the refs it wraps changes identity. Call sites
    // pass a fixed number of refs, so the dependency list keeps its length.
    refs,
  );
}

/**
 * Merges `className` and `style`, and spreads everything else, with the
 * caller's props winning.
 *
 * Refs are spread like any other prop and never combined: merging them means
 * building a callback during render, which React reattaches on every commit.
 * When two refs genuinely need to reach the same element, use `useMergeProps`.
 */
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

  return merged;
}

/**
 * `mergeProps` plus the ref merging it leaves out.
 *
 * Reach for it only when two or more refs actually have to reach the same
 * element — a component adding a ref of its own on top of the caller's.
 * Everywhere else `mergeProps` is the right call: it spreads a lone ref
 * untouched and, being no hook, stays usable inside conditional JSX.
 *
 * Follows the rules of hooks: call it unconditionally at the top level of a
 * component.
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
