import {
  Menu as BaseUIMenu,
  MenuArrowProps as BaseUIMenuArrowProps,
  MenuCheckboxItemIndicatorProps as BaseUIMenuCheckboxItemIndicatorProps,
  MenuCheckboxItemProps as BaseUIMenuCheckboxItemProps,
  MenuGroupLabelProps as BaseUIMenuGroupLabelProps,
  MenuGroupProps as BaseUIMenuGroupProps,
  MenuItemProps as BaseUIMenuItemProps,
  MenuLinkItemProps as BaseUIMenuLinkItemProps,
  MenuPopupProps as BaseUIMenuPopupProps,
  MenuPortalProps as BaseUIMenuPortalProps,
  MenuPositionerProps as BaseUIMenuPositionerProps,
  MenuRadioGroupProps as BaseUIMenuRadioGroupProps,
  MenuRadioItemIndicatorProps as BaseUIMenuRadioItemIndicatorProps,
  MenuRadioItemProps as BaseUIMenuRadioItemProps,
  MenuRootProps as BaseUIMenuRootProps,
  MenuSubmenuRootProps as BaseUIMenuSubmenuRootProps,
  MenuSubmenuTriggerProps as BaseUIMenuSubmenuTriggerProps,
  MenuTriggerProps as BaseUIMenuTriggerProps,
} from "@base-ui/react/menu";
import { SeparatorProps as BaseUISeparatorProps } from "@base-ui/react/separator";
import { Check, ChevronRight, Circle } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../lib/utils";
import { ArrowSvg, ArrowSvgProps } from "./popover";

export type MenuPortalProps = BaseUIMenuPortalProps;
export type MenuPositionerProps = BaseUIMenuPositionerProps;
export type MenuPopupProps = BaseUIMenuPopupProps;
export type MenuArrowProps = BaseUIMenuArrowProps;
export type MenuSubmenuTriggerProps = BaseUIMenuSubmenuTriggerProps;

/** Shared styles for the popup of a menu and of any of its submenus. */
export const menuPopupStyles =
  "bg-background outline-border max-h-(--available-height) min-w-40 origin-(--transform-origin) overflow-y-auto rounded-lg bg-clip-padding py-1 shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0";

/** Shared styles for every kind of menu item, including the submenu trigger. */
export const menuItemStyles =
  "data-highlighted:before:bg-primary data-highlighted:text-on-primary data-disabled:text-muted-fg relative z-0 flex cursor-default items-center gap-3 px-2.5 py-2 text-sm leading-4 outline-none select-none before:absolute before:inset-x-1 before:inset-y-0 before:z-[-1] before:rounded-sm data-disabled:cursor-not-allowed pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]";

/** Fixed-size slot that keeps the labels of indicator items aligned. */
const indicatorSlotStyles = "flex size-4 shrink-0 items-center justify-center";

export interface MenuProps
  extends
    BaseUIMenuRootProps,
    Omit<
      BaseUIMenuTriggerProps,
      "children" | "render" | "handle" | "payload" | "disabled"
    > {
  /** The element rendered as the trigger that opens the menu. */
  trigger?: BaseUIMenuTriggerProps["render"];
  /** Whether to render an arrow pointing at the trigger. */
  arrow?: boolean;
  portalProps?: MenuPortalProps;
  positionerProps?: MenuPositionerProps;
  popupProps?: MenuPopupProps;
  arrowProps?: MenuArrowProps;
  arrowElement?: React.ReactNode;
  arrowSvgProps?: ArrowSvgProps;
}

export function Menu(props: MenuProps) {
  const {
    trigger,
    arrow,
    actionsRef,
    children,
    closeParentOnEsc,
    defaultOpen,
    defaultTriggerId,
    disabled,
    handle,
    highlightItemOnHover,
    loopFocus,
    modal,
    onOpenChange,
    onOpenChangeComplete,
    open,
    orientation,
    triggerId,
    portalProps,
    positionerProps,
    popupProps,
    arrowProps,
    arrowElement,
    arrowSvgProps,
    className,
    ...restProps
  } = props;

  /**
   * Kept outside of the render function below so that its element identity is
   * stable: `Menu.Root` re-renders its children whenever the menu's state
   * changes, and re-creating the trigger on every one of those renders makes it
   * register itself again, which renders `Menu.Root` again, and so on.
   */
  const triggerElement = (
    <BaseUIMenu.Trigger render={trigger} className={className} {...restProps} />
  );

  return (
    <BaseUIMenu.Root
      actionsRef={actionsRef}
      closeParentOnEsc={closeParentOnEsc}
      defaultOpen={defaultOpen}
      defaultTriggerId={defaultTriggerId}
      disabled={disabled}
      handle={handle}
      highlightItemOnHover={highlightItemOnHover}
      loopFocus={loopFocus}
      modal={modal}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      orientation={orientation}
      triggerId={triggerId}
    >
      {(renderProps) => (
        <>
          {triggerElement}
          <BaseUIMenu.Portal {...portalProps}>
            <BaseUIMenu.Positioner
              sideOffset={8}
              {...mergeProps(positionerProps, {
                className: tw("z-10 outline-none"),
              })}
            >
              <BaseUIMenu.Popup
                {...mergeProps(popupProps, { className: menuPopupStyles })}
              >
                {arrow && (
                  <BaseUIMenu.Arrow
                    {...mergeProps(arrowProps, {
                      className: tw(
                        "data-[side=bottom]:-top-2 data-[side=left]:-right-3.25 data-[side=left]:rotate-90 data-[side=right]:-left-3.25 data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
                      ),
                    })}
                  >
                    {arrowElement ?? <ArrowSvg {...arrowSvgProps} />}
                  </BaseUIMenu.Arrow>
                )}
                {typeof children === "function"
                  ? children(renderProps)
                  : children}
              </BaseUIMenu.Popup>
            </BaseUIMenu.Positioner>
          </BaseUIMenu.Portal>
        </>
      )}
    </BaseUIMenu.Root>
  );
}

export type MenuItemProps = BaseUIMenuItemProps;

export function MenuItem(props: MenuItemProps) {
  return (
    <BaseUIMenu.Item {...mergeProps(props, { className: menuItemStyles })} />
  );
}

export type MenuLinkItemProps = BaseUIMenuLinkItemProps;

export function MenuLinkItem(props: MenuLinkItemProps) {
  return (
    <BaseUIMenu.LinkItem
      {...mergeProps(props, { className: menuItemStyles })}
    />
  );
}

export interface MenuCheckboxItemProps extends BaseUIMenuCheckboxItemProps {
  indicatorProps?: BaseUIMenuCheckboxItemIndicatorProps;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
}

export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  const { children, indicatorProps, iconProps, ...restProps } = props;

  return (
    <BaseUIMenu.CheckboxItem
      {...mergeProps(restProps, { className: menuItemStyles })}
    >
      <span className={indicatorSlotStyles}>
        <BaseUIMenu.CheckboxItemIndicator
          {...mergeProps(indicatorProps, { className: tw("flex") })}
        >
          <Check {...mergeProps(iconProps, { className: tw("size-4") })} />
        </BaseUIMenu.CheckboxItemIndicator>
      </span>
      <span className="flex-1">{children}</span>
    </BaseUIMenu.CheckboxItem>
  );
}

export type MenuRadioGroupProps = BaseUIMenuRadioGroupProps;

export function MenuRadioGroup(props: MenuRadioGroupProps) {
  return <BaseUIMenu.RadioGroup {...props} />;
}

export interface MenuRadioItemProps extends BaseUIMenuRadioItemProps {
  indicatorProps?: BaseUIMenuRadioItemIndicatorProps;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
}

export function MenuRadioItem(props: MenuRadioItemProps) {
  const { children, indicatorProps, iconProps, ...restProps } = props;

  return (
    <BaseUIMenu.RadioItem
      {...mergeProps(restProps, { className: menuItemStyles })}
    >
      <span className={indicatorSlotStyles}>
        <BaseUIMenu.RadioItemIndicator
          {...mergeProps(indicatorProps, { className: tw("flex") })}
        >
          <Circle
            {...mergeProps(iconProps, { className: tw("size-2 fill-current") })}
          />
        </BaseUIMenu.RadioItemIndicator>
      </span>
      <span className="flex-1">{children}</span>
    </BaseUIMenu.RadioItem>
  );
}

export interface MenuGroupProps extends BaseUIMenuGroupProps {
  /** Heading rendered above the group's items. */
  label?: React.ReactNode;
  labelProps?: MenuGroupLabelProps;
}

export function MenuGroup(props: MenuGroupProps) {
  const { children, label, labelProps, ...restProps } = props;

  return (
    <BaseUIMenu.Group
      {...mergeProps(restProps, { className: tw("not-last:mb-2") })}
    >
      {label != null && (
        <MenuGroupLabel {...labelProps}>{label}</MenuGroupLabel>
      )}
      {children}
    </BaseUIMenu.Group>
  );
}

export type MenuGroupLabelProps = BaseUIMenuGroupLabelProps;

export function MenuGroupLabel(props: MenuGroupLabelProps) {
  return (
    <BaseUIMenu.GroupLabel
      {...mergeProps(props, {
        className: tw("text-muted-fg px-2.5 py-1 text-xs font-medium"),
      })}
    />
  );
}

export type MenuSeparatorProps = BaseUISeparatorProps;

export function MenuSeparator(props: MenuSeparatorProps) {
  return (
    <BaseUIMenu.Separator
      {...mergeProps(props, { className: tw("bg-border mx-2.5 my-1 h-px") })}
    />
  );
}

export interface MenuSubmenuProps extends BaseUIMenuSubmenuRootProps {
  /** The content of the item that opens the submenu. */
  trigger?: React.ReactNode;
  triggerProps?: Omit<MenuSubmenuTriggerProps, "children">;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
  portalProps?: MenuPortalProps;
  positionerProps?: MenuPositionerProps;
  popupProps?: MenuPopupProps;
}

export function MenuSubmenu(props: MenuSubmenuProps) {
  const {
    children,
    trigger,
    triggerProps,
    iconProps,
    portalProps,
    positionerProps,
    popupProps,
    ...restProps
  } = props;

  return (
    <BaseUIMenu.SubmenuRoot {...restProps}>
      <BaseUIMenu.SubmenuTrigger
        {...mergeProps(triggerProps, {
          className: cn(
            menuItemStyles,
            "data-popup-open:before:bg-primary data-popup-open:text-on-primary w-full",
          ),
        })}
      >
        <span className="flex-1">{trigger}</span>
        <ChevronRight
          {...mergeProps(iconProps, { className: tw("size-4 shrink-0") })}
        />
      </BaseUIMenu.SubmenuTrigger>
      <BaseUIMenu.Portal {...portalProps}>
        <BaseUIMenu.Positioner
          sideOffset={submenuOffset}
          alignOffset={submenuOffset}
          {...mergeProps(positionerProps, {
            className: tw("z-10 outline-none"),
          })}
        >
          <BaseUIMenu.Popup
            {...mergeProps(popupProps, { className: menuPopupStyles })}
          >
            {children}
          </BaseUIMenu.Popup>
        </BaseUIMenu.Positioner>
      </BaseUIMenu.Portal>
    </BaseUIMenu.SubmenuRoot>
  );
}

/**
 * Submenus sit right next to their trigger, so nudge them outwards when they are
 * placed on a side and inwards when they have to flip above or below it.
 */
function submenuOffset({ side }: { side: MenuPositionerProps["side"] }) {
  return side === "top" || side === "bottom" ? 4 : -4;
}
