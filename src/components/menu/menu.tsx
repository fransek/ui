import * as BaseUI from "@base-ui/react/menu";
import * as BaseUISeparator from "@base-ui/react/separator";
import { Check, ChevronRight, Circle } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";

export type MenuPortalProps = BaseUI.MenuPortalProps;
export type MenuPositionerProps = BaseUI.MenuPositionerProps;
export type MenuPopupProps = BaseUI.MenuPopupProps;
export type MenuSubmenuTriggerProps = BaseUI.MenuSubmenuTriggerProps;

/** Shared styles for the popup of a menu and of any of its submenus. */
export const menuPopupStyles = tw(
  "popup popup-transition max-h-(--available-height) min-w-40 overflow-y-auto py-1",
);

/** Shared styles for every kind of menu item, including the submenu trigger. */
export const menuItemStyles = tw(
  "data-disabled:text-muted-fg data-highlighted:data-disabled:before:bg-muted data-highlighted:data-disabled:text-on-muted relative z-0 flex cursor-default items-center gap-3 px-2.5 py-2 text-sm leading-4 outline-none select-none before:absolute before:inset-x-1 before:inset-y-0 before:z-[-1] before:rounded-sm data-disabled:cursor-not-allowed pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
);

/**
 * Colors of a menu item per variant, for its idle, highlighted and (for a
 * submenu trigger) open state.
 */
export const menuItemVariantStyles = {
  default: tw(
    "data-highlighted:before:bg-primary data-highlighted:text-on-primary data-popup-open:before:bg-primary data-popup-open:text-on-primary",
  ),
  danger: tw(
    "text-danger-fg data-highlighted:before:bg-danger data-highlighted:text-on-danger data-popup-open:before:bg-danger data-popup-open:text-on-danger",
  ),
};

export type MenuItemVariant = keyof typeof menuItemVariantStyles;

/** Composes the classes of a menu item of the given variant. */
export const menuItemClassName = ({
  variant = "default",
  extend,
}: {
  variant?: MenuItemVariant;
  extend?: string;
} = {}) => cn(menuItemStyles, menuItemVariantStyles[variant], extend);

/** Spacing for items whose content is an icon followed by a label. */
const plainItemStyles = tw("gap-1.5");

/** Fixed-size slot that keeps the labels of indicator items aligned. */
const indicatorSlotStyles = tw(
  "flex size-4 shrink-0 items-center justify-center",
);

export interface MenuProps
  extends
    BaseUI.MenuRootProps,
    Omit<
      BaseUI.MenuTriggerProps,
      "children" | "render" | "handle" | "payload" | "disabled"
    > {
  /** The element rendered as the trigger that opens the menu. */
  trigger?: BaseUI.MenuTriggerProps["render"];
  portalProps?: MenuPortalProps;
  positionerProps?: MenuPositionerProps;
  popupProps?: MenuPopupProps;
}

export function Menu(props: MenuProps) {
  const {
    trigger,
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
    className,
    ...restProps
  } = props;

  /**
   * Kept outside of the render function below so that its element identity is
   * stable: `Menu.Root` re-renders its children whenever the menu's state
   * changes, and re-creating the trigger on every one of those renders makes it
   * register itself again, which renders `Menu.Root` again, and so on.
   */
  const triggerElement = trigger && (
    <BaseUI.Menu.Trigger
      render={trigger}
      className={className}
      {...restProps}
    />
  );

  return (
    <BaseUI.Menu.Root
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
          <BaseUI.Menu.Portal {...portalProps}>
            <BaseUI.Menu.Positioner
              sideOffset={8}
              {...mergeProps(positionerProps, {
                className: tw("z-10 outline-none"),
              })}
            >
              <BaseUI.Menu.Popup
                {...mergeProps(popupProps, { className: menuPopupStyles })}
              >
                {typeof children === "function"
                  ? children(renderProps)
                  : children}
              </BaseUI.Menu.Popup>
            </BaseUI.Menu.Positioner>
          </BaseUI.Menu.Portal>
        </>
      )}
    </BaseUI.Menu.Root>
  );
}

export interface MenuItemProps extends BaseUI.MenuItemProps {
  variant?: MenuItemVariant;
}

export function MenuItem(props: MenuItemProps) {
  const { variant, ...restProps } = props;

  return (
    <BaseUI.Menu.Item
      {...mergeProps(restProps, {
        className: menuItemClassName({ variant, extend: plainItemStyles }),
      })}
    />
  );
}

export interface MenuLinkItemProps extends BaseUI.MenuLinkItemProps {
  variant?: MenuItemVariant;
}

export function MenuLinkItem(props: MenuLinkItemProps) {
  const { variant, ...restProps } = props;

  return (
    <BaseUI.Menu.LinkItem
      {...mergeProps(restProps, {
        className: menuItemClassName({ variant, extend: plainItemStyles }),
      })}
    />
  );
}

export interface MenuCheckboxItemProps extends BaseUI.MenuCheckboxItemProps {
  variant?: MenuItemVariant;
  indicatorProps?: BaseUI.MenuCheckboxItemIndicatorProps;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
}

export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  const { children, variant, indicatorProps, iconProps, ...restProps } = props;

  return (
    <BaseUI.Menu.CheckboxItem
      {...mergeProps(restProps, { className: menuItemClassName({ variant }) })}
    >
      <span className={indicatorSlotStyles}>
        <BaseUI.Menu.CheckboxItemIndicator
          {...mergeProps(indicatorProps, { className: tw("flex") })}
        >
          <Check {...mergeProps(iconProps, { className: tw("size-4") })} />
        </BaseUI.Menu.CheckboxItemIndicator>
      </span>
      <span className="flex-1">{children}</span>
    </BaseUI.Menu.CheckboxItem>
  );
}

export type MenuRadioGroupProps = BaseUI.MenuRadioGroupProps;

export function MenuRadioGroup(props: MenuRadioGroupProps) {
  return <BaseUI.Menu.RadioGroup {...props} />;
}

export interface MenuRadioItemProps extends BaseUI.MenuRadioItemProps {
  variant?: MenuItemVariant;
  indicatorProps?: BaseUI.MenuRadioItemIndicatorProps;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
}

export function MenuRadioItem(props: MenuRadioItemProps) {
  const { children, variant, indicatorProps, iconProps, ...restProps } = props;

  return (
    <BaseUI.Menu.RadioItem
      {...mergeProps(restProps, { className: menuItemClassName({ variant }) })}
    >
      <span className={indicatorSlotStyles}>
        <BaseUI.Menu.RadioItemIndicator
          {...mergeProps(indicatorProps, { className: tw("flex") })}
        >
          <Circle
            {...mergeProps(iconProps, { className: tw("size-2 fill-current") })}
          />
        </BaseUI.Menu.RadioItemIndicator>
      </span>
      <span className="flex-1">{children}</span>
    </BaseUI.Menu.RadioItem>
  );
}

export interface MenuGroupProps extends BaseUI.MenuGroupProps {
  /** Heading rendered above the group's items. */
  label?: React.ReactNode;
  labelProps?: MenuGroupLabelProps;
}

export function MenuGroup(props: MenuGroupProps) {
  const { children, label, labelProps, ...restProps } = props;

  return (
    <BaseUI.Menu.Group
      {...mergeProps(restProps, { className: tw("not-last:mb-2") })}
    >
      {label != null && (
        <MenuGroupLabel {...labelProps}>{label}</MenuGroupLabel>
      )}
      {children}
    </BaseUI.Menu.Group>
  );
}

export type MenuGroupLabelProps = BaseUI.MenuGroupLabelProps;

export function MenuGroupLabel(props: MenuGroupLabelProps) {
  return (
    <BaseUI.Menu.GroupLabel
      {...mergeProps(props, {
        className: tw("text-muted-fg px-2.5 py-1 text-xs font-medium"),
      })}
    />
  );
}

export type MenuSeparatorProps = BaseUISeparator.SeparatorProps;

export function MenuSeparator(props: MenuSeparatorProps) {
  return (
    <BaseUI.Menu.Separator
      {...mergeProps(props, { className: tw("bg-border mx-2.5 my-1 h-px") })}
    />
  );
}

export interface MenuSubmenuProps extends BaseUI.MenuSubmenuRootProps {
  /** The content of the item that opens the submenu. */
  trigger?: React.ReactNode;
  /** The variant of the item that opens the submenu. */
  variant?: MenuItemVariant;
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
    variant,
    triggerProps,
    iconProps,
    portalProps,
    positionerProps,
    popupProps,
    ...restProps
  } = props;

  return (
    <BaseUI.Menu.SubmenuRoot {...restProps}>
      <BaseUI.Menu.SubmenuTrigger
        {...mergeProps(triggerProps, {
          className: menuItemClassName({ variant, extend: tw("w-full") }),
        })}
      >
        <span className="flex-1">{trigger}</span>
        <ChevronRight
          {...mergeProps(iconProps, { className: tw("size-4 shrink-0") })}
        />
      </BaseUI.Menu.SubmenuTrigger>
      <BaseUI.Menu.Portal {...portalProps}>
        <BaseUI.Menu.Positioner
          sideOffset={1}
          {...mergeProps(positionerProps, {
            className: tw("z-10 outline-none"),
          })}
        >
          <BaseUI.Menu.Popup
            {...mergeProps(popupProps, { className: menuPopupStyles })}
          >
            {children}
          </BaseUI.Menu.Popup>
        </BaseUI.Menu.Positioner>
      </BaseUI.Menu.Portal>
    </BaseUI.Menu.SubmenuRoot>
  );
}

Menu.Item = MenuItem;
Menu.LinkItem = MenuLinkItem;
Menu.CheckboxItem = MenuCheckboxItem;
Menu.RadioGroup = MenuRadioGroup;
Menu.RadioItem = MenuRadioItem;
Menu.Group = MenuGroup;
Menu.GroupLabel = MenuGroupLabel;
Menu.Separator = MenuSeparator;
Menu.Submenu = MenuSubmenu;
