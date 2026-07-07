import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cnBaseUI<T>(
  ...inputs: (ClassValue | ((state: T) => string | undefined))[]
) {
  return (state: T) =>
    cn(
      inputs.map((input) =>
        typeof input === "function" ? input(state) : input,
      ),
    );
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

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export function useMediaQuery(breakpoint: Breakpoint): boolean {
  return React.useSyncExternalStore(
    (callback) => {
      const mql = mediaQuery(breakpoint);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => mediaQuery(breakpoint).matches,
    () => mediaQuery(breakpoint).matches,
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
