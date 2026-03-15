import { clsx, type ClassValue } from "clsx";
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
