import * as BaseUI from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";
import { ArrowSvg, ArrowSvgProps } from "../popover";

export type NavigationMenuListProps = BaseUI.NavigationMenuListProps;
export type NavigationMenuPortalProps = BaseUI.NavigationMenuPortalProps;
export type NavigationMenuBackdropProps = BaseUI.NavigationMenuBackdropProps;
export type NavigationMenuPositionerProps =
  BaseUI.NavigationMenuPositionerProps;
export type NavigationMenuPopupProps = BaseUI.NavigationMenuPopupProps;
export type NavigationMenuViewportProps = BaseUI.NavigationMenuViewportProps;
export type NavigationMenuArrowProps = BaseUI.NavigationMenuArrowProps;

export interface NavigationMenuProps extends BaseUI.NavigationMenuRootProps {
  /** Renders an arrow on the popup pointing at the open trigger. */
  arrow?: boolean;
  /** Renders a backdrop behind the popup while it is open. */
  backdrop?: boolean;
  listProps?: NavigationMenuListProps;
  portalProps?: NavigationMenuPortalProps;
  backdropProps?: NavigationMenuBackdropProps;
  positionerProps?: NavigationMenuPositionerProps;
  popupProps?: NavigationMenuPopupProps;
  viewportProps?: NavigationMenuViewportProps;
  arrowProps?: NavigationMenuArrowProps;
  arrowElement?: React.ReactNode;
  arrowSvgProps?: ArrowSvgProps;
}

/**
 * A collection of links and menus for website navigation. Its children are
 * rendered inside the list, so compose it from `NavigationMenu.Item`s; the
 * `Content` of the open item is shown in a shared popup that morphs between
 * items.
 */
export function NavigationMenu(props: NavigationMenuProps) {
  const {
    arrow,
    backdrop,
    children,
    listProps,
    portalProps,
    backdropProps,
    positionerProps,
    popupProps,
    viewportProps,
    arrowProps,
    arrowElement,
    arrowSvgProps,
    ...restProps
  } = props;

  return (
    <BaseUI.NavigationMenu.Root
      // Base UI sets no orientation attribute, so expose one for the list and
      // the trigger icons to style against.
      data-orientation={restProps.orientation ?? "horizontal"}
      {...mergeProps(restProps, {
        className: tw("group/navigation-menu min-w-max"),
      })}
    >
      <BaseUI.NavigationMenu.List
        {...mergeProps(listProps, {
          className: tw(
            "relative flex gap-1 group-data-[orientation=vertical]/navigation-menu:flex-col",
          ),
        })}
      >
        {children}
      </BaseUI.NavigationMenu.List>
      <BaseUI.NavigationMenu.Portal {...portalProps}>
        {backdrop && (
          <BaseUI.NavigationMenu.Backdrop
            {...mergeProps(backdropProps, {
              className: tw(
                "pointer-events-none fixed inset-0 bg-black/20 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
              ),
            })}
          />
        )}
        <BaseUI.NavigationMenu.Positioner
          side={restProps.orientation === "vertical" ? "right" : "bottom"}
          sideOffset={8}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: "none" }}
          {...mergeProps(positionerProps, {
            className: tw(
              // The `before` element bridges the gap between the trigger and
              // the popup so that moving the pointer across it keeps it open.
              "z-10 box-border h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--duration) ease-(--easing) outline-none before:absolute before:content-[''] data-instant:transition-none data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:-top-2 data-[side=bottom]:before:h-2 data-[side=left]:before:inset-y-0 data-[side=left]:before:-right-2 data-[side=left]:before:w-2 data-[side=right]:before:inset-y-0 data-[side=right]:before:-left-2 data-[side=right]:before:w-2 data-[side=top]:before:inset-x-0 data-[side=top]:before:-bottom-2 data-[side=top]:before:h-2",
            ),
            style: {
              ["--duration" as string]: "0.35s",
              ["--easing" as string]: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
          })}
        >
          <BaseUI.NavigationMenu.Popup
            {...mergeProps(popupProps, {
              className: tw(
                "popup relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) transition-[opacity,transform,width,height,scale,translate] duration-(--duration) ease-(--easing) data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-[ease] data-starting-style:scale-90 data-starting-style:opacity-0",
              ),
            })}
          >
            {arrow && (
              <BaseUI.NavigationMenu.Arrow
                {...mergeProps(arrowProps, {
                  className: tw(
                    "flex transition-[left,top] duration-(--duration) ease-(--easing) data-[side=bottom]:-top-2 data-[side=left]:-right-3.25 data-[side=left]:rotate-90 data-[side=right]:-left-3.25 data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
                  ),
                })}
              >
                {arrowElement ?? <ArrowSvg {...arrowSvgProps} />}
              </BaseUI.NavigationMenu.Arrow>
            )}
            <BaseUI.NavigationMenu.Viewport
              {...mergeProps(viewportProps, {
                className: tw("relative size-full overflow-hidden"),
              })}
            />
          </BaseUI.NavigationMenu.Popup>
        </BaseUI.NavigationMenu.Positioner>
      </BaseUI.NavigationMenu.Portal>
    </BaseUI.NavigationMenu.Root>
  );
}

export type NavigationMenuItemProps = BaseUI.NavigationMenuItemProps;

export function NavigationMenuItem(props: NavigationMenuItemProps) {
  return <BaseUI.NavigationMenu.Item {...props} />;
}

/** Styles of a top-level trigger, shared with top-level links. */
export const navigationMenuTriggerStyles = tw(
  "text-foreground hover:bg-hover active:bg-active data-popup-open:bg-hover focus-visible:focus-outline m-0 box-border flex h-9 items-center justify-center gap-1.5 rounded-md bg-transparent px-3 text-sm font-medium no-underline transition-colors outline-none select-none",
);

export interface NavigationMenuTriggerProps
  extends BaseUI.NavigationMenuTriggerProps {
  /** Replaces the default chevron. Pass `null` to render no icon. */
  icon?: React.ReactNode;
  iconProps?: BaseUI.NavigationMenuIconProps;
}

export function NavigationMenuTrigger(props: NavigationMenuTriggerProps) {
  const { children, icon, iconProps, ...restProps } = props;

  return (
    <BaseUI.NavigationMenu.Trigger
      {...mergeProps(restProps, { className: navigationMenuTriggerStyles })}
    >
      {children}
      {icon !== null && (
        <BaseUI.NavigationMenu.Icon
          {...mergeProps(iconProps, {
            className: tw(
              "flex transition-transform duration-200 ease-in-out group-data-[orientation=vertical]/navigation-menu:-rotate-90 data-popup-open:rotate-180 group-data-[orientation=vertical]/navigation-menu:data-popup-open:-rotate-90",
            ),
          })}
        >
          {icon ?? <ChevronDown className="size-4" aria-hidden />}
        </BaseUI.NavigationMenu.Icon>
      )}
    </BaseUI.NavigationMenu.Trigger>
  );
}

export type NavigationMenuContentProps = BaseUI.NavigationMenuContentProps;

export function NavigationMenuContent(props: NavigationMenuContentProps) {
  return (
    <BaseUI.NavigationMenu.Content
      {...mergeProps(props, {
        className: tw(
          "xs:w-max xs:min-w-100 h-full w-[calc(100vw-40px)] p-2 transition-[opacity,transform,translate] duration-(--duration) ease-(--easing) data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:data-[activation-direction=left]:translate-x-1/2 data-starting-style:data-[activation-direction=left]:-translate-x-1/2 data-ending-style:data-[activation-direction=right]:-translate-x-1/2 data-starting-style:data-[activation-direction=right]:translate-x-1/2",
        ),
      })}
    />
  );
}

const linkVariantStyles = {
  /** A block link inside a `NavigationMenu.Content`. */
  default: tw(
    "text-foreground hover:bg-hover active:bg-active focus-visible:focus-outline data-active:bg-hover block rounded-md p-3 text-sm no-underline transition-colors outline-none",
  ),
  /** A top-level link that sits in the list next to the triggers. */
  trigger: navigationMenuTriggerStyles,
};

export type NavigationMenuLinkVariant = keyof typeof linkVariantStyles;

export const navigationMenuLinkStyles = ({
  variant = "default",
  extend,
}: {
  variant?: NavigationMenuLinkVariant;
  extend?: string;
} = {}) => cn(linkVariantStyles[variant], extend);

export interface NavigationMenuLinkProps
  extends BaseUI.NavigationMenuLinkProps {
  variant?: NavigationMenuLinkVariant;
}

/**
 * Renders an `<a>` by default. Use the `render` prop to render your router's
 * link component for client-side navigation.
 */
export function NavigationMenuLink(props: NavigationMenuLinkProps) {
  const { variant, ...restProps } = props;

  return (
    <BaseUI.NavigationMenu.Link
      {...mergeProps(restProps, {
        className: navigationMenuLinkStyles({ variant }),
      })}
    />
  );
}

export type NavigationMenuLinkTitleProps = React.ComponentProps<"span">;

/** The title of a block link, displayed above its description. */
export function NavigationMenuLinkTitle(props: NavigationMenuLinkTitleProps) {
  return (
    <span
      {...mergeProps(props, {
        className: tw("mb-1 block leading-5 font-medium"),
      })}
    />
  );
}

export type NavigationMenuLinkDescriptionProps = React.ComponentProps<"span">;

/** Secondary text of a block link, displayed below its title. */
export function NavigationMenuLinkDescription(
  props: NavigationMenuLinkDescriptionProps,
) {
  return (
    <span
      {...mergeProps(props, {
        className: tw("text-muted-fg block leading-5"),
      })}
    />
  );
}

NavigationMenu.Item = NavigationMenuItem;
NavigationMenu.Trigger = NavigationMenuTrigger;
NavigationMenu.Content = NavigationMenuContent;
NavigationMenu.Link = NavigationMenuLink;
NavigationMenu.LinkTitle = NavigationMenuLinkTitle;
NavigationMenu.LinkDescription = NavigationMenuLinkDescription;
