import * as BaseUI from "@base-ui/react/use-render";
import { cn, mergeProps, tw } from "../../lib/utils";

export interface KbdProps extends BaseUI.useRender.ComponentProps<"kbd"> {
  /**
   * `default` uses the secondary surface. `current` derives its colors from
   * the surrounding text, so it stays legible on any background (tooltips,
   * menus, colored buttons).
   */
  variant?: KbdVariant;
  size?: KbdSize;
}

/** A keyboard key or shortcut hint, rendered as a `<kbd>` element. */
export function Kbd(props: KbdProps) {
  const { render, variant = "default", size = "md", ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "kbd",
    render,
    props: mergeProps(restProps, {
      className: kbdStyles({ variant, size }),
    }),
  });
}

export type KbdGroupProps = BaseUI.useRender.ComponentProps<"kbd">;

/**
 * Groups several `Kbd` keys into one key combination. Renders an outer
 * `<kbd>`, which is how HTML marks up a combination of keys.
 */
export function KbdGroup(props: KbdGroupProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "kbd",
    render,
    props: mergeProps(restProps, {
      className: tw("inline-flex items-center gap-1 align-middle font-sans"),
    }),
  });
}

const baseKbdStyles = tw(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded font-sans font-medium whitespace-nowrap select-none [&>svg]:shrink-0",
);

const variantStyles = {
  default: tw("secondary"),
  current: tw("bg-current/15 text-current"),
};

const sizeStyles = {
  sm: tw("h-4.5 min-w-4.5 px-1 text-[0.6875rem] [&>svg]:size-3"),
  md: tw("h-5 min-w-5 px-1.5 text-xs [&>svg]:size-3"),
};

export const kbdStyles = ({
  variant = "default",
  size = "md",
  extend,
}: {
  variant?: KbdVariant;
  size?: KbdSize;
  extend?: string;
} = {}) => cn(baseKbdStyles, variantStyles[variant], sizeStyles[size], extend);

export type KbdVariant = keyof typeof variantStyles;
export type KbdSize = keyof typeof sizeStyles;
