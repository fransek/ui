import * as BaseUI from "@base-ui/react/context-menu";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";
import {
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  menuPopupStyles,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenu,
} from "../menu";

export type ContextMenuPortalProps = BaseUI.ContextMenuPortalProps;
export type ContextMenuPositionerProps = BaseUI.ContextMenuPositionerProps;
export type ContextMenuPopupProps = BaseUI.ContextMenuPopupProps;

export interface ContextMenuProps
  extends
    BaseUI.ContextMenuRootProps,
    Omit<BaseUI.ContextMenuTriggerProps, "children" | "render"> {
  /**
   * The area that opens the menu on right click or long press. Rendered in
   * place of the trigger's default `<div>`, keeping its own children.
   */
  trigger?: BaseUI.ContextMenuTriggerProps["render"];
  portalProps?: ContextMenuPortalProps;
  positionerProps?: ContextMenuPositionerProps;
  popupProps?: ContextMenuPopupProps;
}

/**
 * A menu that opens at the pointer on right click or long press of its
 * trigger area. Its items are the same as `Menu`'s, also reachable as
 * `ContextMenu.Item`, `ContextMenu.Submenu`, etc.
 */
export function ContextMenu(props: ContextMenuProps) {
  const {
    trigger,
    actionsRef,
    children,
    closeParentOnEsc,
    defaultOpen,
    disabled,
    highlightItemOnHover,
    loopFocus,
    onOpenChange,
    onOpenChangeComplete,
    open,
    orientation,
    portalProps,
    positionerProps,
    popupProps,
    ...restProps
  } = props;

  return (
    <BaseUI.ContextMenu.Root
      actionsRef={actionsRef}
      closeParentOnEsc={closeParentOnEsc}
      defaultOpen={defaultOpen}
      disabled={disabled}
      highlightItemOnHover={highlightItemOnHover}
      loopFocus={loopFocus}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      orientation={orientation}
    >
      <BaseUI.ContextMenu.Trigger render={trigger} {...restProps} />
      <BaseUI.ContextMenu.Portal {...portalProps}>
        <BaseUI.ContextMenu.Positioner
          {...mergeProps(positionerProps, {
            className: tw("z-10 outline-none"),
          })}
        >
          <BaseUI.ContextMenu.Popup
            {...mergeProps(popupProps, { className: menuPopupStyles })}
          >
            {children}
          </BaseUI.ContextMenu.Popup>
        </BaseUI.ContextMenu.Positioner>
      </BaseUI.ContextMenu.Portal>
    </BaseUI.ContextMenu.Root>
  );
}

ContextMenu.Item = MenuItem;
ContextMenu.LinkItem = MenuLinkItem;
ContextMenu.CheckboxItem = MenuCheckboxItem;
ContextMenu.RadioGroup = MenuRadioGroup;
ContextMenu.RadioItem = MenuRadioItem;
ContextMenu.Group = MenuGroup;
ContextMenu.GroupLabel = MenuGroupLabel;
ContextMenu.Separator = MenuSeparator;
ContextMenu.Submenu = MenuSubmenu;
