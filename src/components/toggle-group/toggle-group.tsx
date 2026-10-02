import * as BaseUI from "@base-ui/react/toggle-group";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";
import { Toggle, ToggleProps } from "../toggle";

export type ToggleGroupProps<T extends string = string> =
  BaseUI.ToggleGroupProps<T>;

export function ToggleGroup<T extends string = string>(
  props: ToggleGroupProps<T>,
) {
  return (
    <BaseUI.ToggleGroup
      {...mergeProps(props, {
        className: tw(
          "group/toggle-group flex w-fit data-[orientation=vertical]:flex-col",
        ),
      })}
    />
  );
}

export type ToggleGroupItemProps<T extends string = string> = ToggleProps<T>;

export function ToggleGroupItem<T extends string = string>(
  props: ToggleGroupItemProps<T>,
) {
  const { size = "md", ...restProps } = props;

  return (
    <Toggle
      size={size}
      {...mergeProps(restProps, {
        className: cn(itemStyles, itemSizeStyles[size]),
      })}
    />
  );
}

const itemStyles = cn(
  "relative min-w-0 rounded-none group-data-[orientation=vertical]/toggle-group:w-full group-data-[orientation=vertical]/toggle-group:justify-start group-data-[orientation=horizontal]/toggle-group:first:rounded-l-full group-data-[orientation=vertical]/toggle-group:first:rounded-t-lg group-data-[orientation=horizontal]/toggle-group:last:rounded-r-full group-data-[orientation=vertical]/toggle-group:last:rounded-b-lg focus-visible:-outline-offset-2 not-data-disabled:not-aria-disabled:active:scale-none",
  "after:absolute after:right-0 after:h-4 after:border-r after:opacity-20 group-data-[orientation=vertical]/toggle-group:after:inset-x-2 group-data-[orientation=vertical]/toggle-group:after:bottom-0 group-data-[orientation=vertical]/toggle-group:after:h-0 group-data-[orientation=vertical]/toggle-group:after:border-r-0 group-data-[orientation=vertical]/toggle-group:after:border-b last:after:hidden",
);

const itemSizeStyles = {
  icon: tw("py-2 group-data-[orientation=horizontal]/toggle-group:px-3"),
  sm: tw("py-1.5 group-data-[orientation=horizontal]/toggle-group:px-4"),
  md: tw(
    "py-2 font-medium group-data-[orientation=horizontal]/toggle-group:px-6",
  ),
  lg: tw(
    "py-2.5 font-medium group-data-[orientation=horizontal]/toggle-group:px-8",
  ),
};

ToggleGroup.Item = ToggleGroupItem;
