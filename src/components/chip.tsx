import * as BaseUIButton from "@base-ui/react/button";
import * as BaseUI from "@base-ui/react/use-render";
import { X } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../lib/utils";

export interface ChipProps extends BaseUI.useRender.ComponentProps<"span"> {
  variant?: ChipVariant;
  size?: ChipSize;
  /** An icon rendered before the label. */
  icon?: React.ReactNode;
  /** When set, a remove button is rendered after the label. */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Accessible label for the remove button. Defaults to "Remove <children>"
   * when `children` is a string, otherwise "Remove".
   */
  removeLabel?: string;
  /** Props forwarded to the remove button. */
  removeButtonProps?: BaseUIButton.ButtonProps;
  /** Dims the chip and disables the remove button. */
  disabled?: boolean;
}

export function Chip(props: ChipProps) {
  const {
    render,
    variant = "primary",
    size = "md",
    icon,
    onRemove,
    removeLabel,
    removeButtonProps,
    disabled,
    children,
    ...restProps
  } = props;

  return BaseUI.useRender({
    defaultTagName: "span",
    render,
    props: {
      "data-disabled": disabled ? "" : undefined,
      ...mergeProps(restProps, {
        className: chipStyles({ variant, size, removable: !!onRemove }),
      }),
      children: (
        <>
          {icon}
          {children}
          {onRemove && (
            <BaseUIButton.Button
              disabled={disabled}
              aria-label={
                removeLabel ??
                (typeof children === "string" ? `Remove ${children}` : "Remove")
              }
              onClick={onRemove}
              {...mergeProps(removeButtonProps, {
                className: tw(
                  "outline-highlight focus-visible:focus-outline -my-1 flex cursor-pointer items-center justify-center rounded-full p-0.5 opacity-70 transition-[opacity,background-color] hover:bg-current/15 hover:opacity-100 data-disabled:cursor-not-allowed data-disabled:hover:bg-transparent",
                ),
              })}
            >
              <X className="size-3.5" aria-hidden />
            </BaseUIButton.Button>
          )}
        </>
      ),
    },
  });
}

const baseChipStyles = tw(
  "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full font-medium whitespace-nowrap transition-colors select-none data-disabled:opacity-60 [&>svg]:size-3.5 [&>svg]:shrink-0",
);

const variantStyles = {
  primary: tw("bg-primary text-on-primary"),
  secondary: tw("bg-secondary text-on-secondary"),
  muted: tw("bg-muted text-on-muted"),
  danger: tw("bg-danger text-on-danger"),
  "danger-subtle": tw("bg-danger-subtle text-on-danger-subtle"),
  warning: tw("bg-warning text-on-warning"),
  "warning-subtle": tw("bg-warning-subtle text-on-warning-subtle"),
  success: tw("bg-success text-on-success"),
  "success-subtle": tw("bg-success-subtle text-on-success-subtle"),
  outline: tw("text-foreground border bg-transparent"),
};

const sizeStyles = {
  sm: tw("h-6 px-2 text-xs"),
  md: tw("h-7 px-2.5 text-sm"),
};

const removableSizeStyles: Record<ChipSize, string> = {
  sm: tw("pr-1"),
  md: tw("pr-1.5"),
};

export const chipStyles = ({
  variant = "primary",
  size = "md",
  removable,
  extend,
}: {
  variant?: ChipVariant;
  size?: ChipSize;
  removable?: boolean;
  extend?: string;
}) =>
  cn(
    baseChipStyles,
    variantStyles[variant],
    sizeStyles[size],
    removable && removableSizeStyles[size],
    extend,
  );

export type ChipVariant = keyof typeof variantStyles;
export type ChipSize = keyof typeof sizeStyles;
