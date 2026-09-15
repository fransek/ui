import {
  Button as BaseUIButton,
  ButtonProps as BaseUIButtonProps,
} from "@base-ui/react/button";
import {
  Menubar as BaseUIMenubar,
  MenubarProps as BaseUIMenubarProps,
} from "@base-ui/react/menubar";
import React from "react";
import { mergeProps, tw } from "../lib/utils";

export type MenubarProps = BaseUIMenubarProps;

export function Menubar(props: MenubarProps) {
  return (
    <BaseUIMenubar
      {...mergeProps(props, {
        className: tw(
          "bg-background flex rounded-lg border p-1 shadow data-[orientation=vertical]:flex-col",
        ),
      })}
    />
  );
}

export const menubarTriggerStyles =
  "font-inherit outline-highlight focus-visible:focus-outline data-disabled:text-muted-fg hover:bg-muted/10 data-popup-open:bg-muted/20 m-0 flex items-center justify-center rounded-md bg-transparent px-3 py-1.5 text-sm font-medium transition-colors outline-none select-none data-disabled:cursor-not-allowed";

export type MenubarTriggerProps = BaseUIButtonProps;

/**
 * A trigger styled to sit inside a `Menubar`. Pass it to a `Menu` through its
 * `trigger` prop: `<Menu trigger={<MenubarTrigger>File</MenubarTrigger>}>`.
 */
export function MenubarTrigger(props: MenubarTriggerProps) {
  return (
    <BaseUIButton
      focusableWhenDisabled
      {...mergeProps(props, { className: menubarTriggerStyles })}
    />
  );
}
