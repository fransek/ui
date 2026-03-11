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
