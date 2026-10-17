import * as BaseUI from "@base-ui/react/use-render";
import { PanelLeft } from "lucide-react";
import React from "react";
import { Breakpoint, cn, mergeProps, tw, useMediaQuery } from "../../lib/utils";
import { Button, ButtonProps } from "../button";
import { Drawer, DrawerProps } from "../drawer";
import { Separator, SeparatorProps } from "../separator";
import { Tooltip, TooltipProps, TooltipProvider } from "../tooltip";

export type SidebarSide = "left" | "right";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";

interface SidebarContextValue {
  /** Whether the desktop sidebar is expanded. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Whether the mobile drawer is open. */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  /** Whether the viewport is below the provider's `breakpoint`. */
  isMobile: boolean;
  /** Toggles the drawer on mobile and the sidebar otherwise. */
  toggle: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

/** Reads the state of the nearest `SidebarProvider`. */
export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

// Lets menu buttons know whether they sit in a collapsed icon rail, which is
// when their tooltips should show.
const SidebarCollapsedContext = React.createContext<
  Exclude<SidebarCollapsible, "none"> | undefined
>(undefined);

export interface SidebarProviderProps extends BaseUI.useRender
  .ComponentProps<"div"> {
  /** Whether the sidebar is expanded (controlled). */
  open?: boolean;
  /**
   * Whether the sidebar is expanded initially (uncontrolled).
   * @default true
   */
  defaultOpen?: boolean;
  /** Called when the sidebar is expanded or collapsed. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Below this breakpoint the sidebar is rendered in a drawer instead of
   * beside the content. `false` keeps it beside the content at every width.
   * @default "md"
   */
  breakpoint?: Breakpoint | false;
  /**
   * The key that toggles the sidebar together with ⌘ (macOS) or Ctrl.
   * `false` disables the shortcut.
   * @default "b"
   */
  keyboardShortcut?: string | false;
}

/**
 * Holds the open state shared by a `Sidebar`, its `SidebarTrigger`s and
 * `useSidebar`, and lays the sidebar out beside a `SidebarInset`.
 */
export function SidebarProvider(props: SidebarProviderProps) {
  const {
    render,
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    breakpoint = "md",
    keyboardShortcut = "b",
    ...restProps
  } = props;

  const [openState, setOpenState] = React.useState(defaultOpen);
  const [openMobile, setOpenMobile] = React.useState(false);
  const aboveBreakpoint = useMediaQuery(breakpoint || "xs");
  const isMobile = breakpoint !== false && !aboveBreakpoint;
  const open = openProp ?? openState;

  const setOpen = React.useCallback(
    (value: boolean) => {
      setOpenState(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  const toggle = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((value) => !value);
    } else {
      setOpen(!open);
    }
  }, [isMobile, open, setOpen]);

  React.useEffect(() => {
    if (!keyboardShortcut) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== keyboardShortcut.toLowerCase() ||
        !(event.metaKey || event.ctrlKey) ||
        event.altKey ||
        event.shiftKey ||
        isEditable(event.target)
      ) {
        return;
      }
      event.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyboardShortcut, toggle]);

  const context = React.useMemo<SidebarContextValue>(
    () => ({ open, setOpen, openMobile, setOpenMobile, isMobile, toggle }),
    [open, setOpen, openMobile, isMobile, toggle],
  );

  const element = BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("flex min-h-svh w-full"),
    }),
  });

  return (
    <SidebarContext.Provider value={context}>{element}</SidebarContext.Provider>
  );
}

// Typing in a field or an editor should keep ⌘B / Ctrl+B for itself.
function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT")
  );
}

export interface SidebarProps extends React.ComponentPropsWithRef<"aside"> {
  /**
   * The edge the sidebar sits on. Place a right sidebar after the
   * `SidebarInset`.
   * @default "left"
   */
  side?: SidebarSide;
  /**
   * How the sidebar collapses: `offcanvas` hides it completely, `icon`
   * shrinks it to a rail of icons (with labels in tooltips), and `none`
   * keeps it expanded.
   * @default "offcanvas"
   */
  collapsible?: SidebarCollapsible;
  /**
   * The width of the expanded sidebar (and of the mobile drawer), as any CSS
   * length.
   * @default "16rem"
   */
  width?: string;
  /** Props forwarded to the inner element that holds the content. */
  innerProps?: React.ComponentPropsWithRef<"div">;
  /** Props forwarded to the `Drawer` used below the provider's breakpoint. */
  drawerProps?: Omit<DrawerProps, "open" | "onOpenChange" | "children">;
}

/**
 * A collapsible navigation panel beside the page content. Must be rendered
 * inside a `SidebarProvider`; below its breakpoint it moves into a drawer.
 */
export function Sidebar(props: SidebarProps) {
  const {
    side = "left",
    collapsible = "offcanvas",
    width = "16rem",
    innerProps,
    drawerProps,
    children,
    "aria-label": ariaLabel = "Sidebar",
    ...restProps
  } = props;
  const { open, openMobile, setOpenMobile, isMobile } = useSidebar();

  const widthVar = { "--sidebar-width": width } as React.CSSProperties;

  if (isMobile) {
    return (
      <Drawer
        direction={side}
        width={width}
        open={openMobile}
        onOpenChange={setOpenMobile}
        {...drawerProps}
        popupProps={mergeProps(drawerProps?.popupProps, {
          "aria-label": ariaLabel,
          className: tw("bg-card p-0"),
        })}
        // The close button comes before the content in the DOM, so a
        // full-width header item would cover it without a stacking order.
        closeButtonProps={mergeProps(drawerProps?.closeButtonProps, {
          className: tw("z-10"),
        })}
        contentProps={mergeProps(drawerProps?.contentProps, {
          className: tw("h-full gap-0"),
        })}
      >
        <div
          data-sidebar=""
          data-mobile=""
          className="group/sidebar flex h-full flex-col"
          // Following a link navigates away, so the drawer closes behind it.
          onClick={(event) => {
            if ((event.target as Element).closest("a[href]")) {
              setOpenMobile(false);
            }
          }}
        >
          {children}
        </div>
      </Drawer>
    );
  }

  const collapsed = collapsible !== "none" && !open ? collapsible : undefined;

  return (
    <SidebarCollapsedContext.Provider value={collapsed}>
      <aside
        data-sidebar=""
        data-side={side}
        data-state={collapsed ? "collapsed" : "expanded"}
        data-collapsed={collapsed}
        aria-label={ariaLabel}
        // An off-canvas sidebar is out of view when collapsed, so it leaves
        // the tab order and the accessibility tree with it.
        inert={collapsed === "offcanvas" || undefined}
        {...mergeProps(restProps, {
          className: cn(
            "group/sidebar bg-card sticky top-0 h-svh shrink-0 self-start overflow-hidden transition-[width] duration-200 ease-out motion-reduce:transition-none",
            "w-(--sidebar-width) data-[collapsed=icon]:w-12 data-[collapsed=offcanvas]:w-0",
            side === "left" ? "border-r" : "border-l",
            "data-[collapsed=offcanvas]:border-0",
          ),
          style: widthVar,
        })}
      >
        <div
          {...mergeProps(innerProps, {
            className: cn(
              // Animates in step with the aside, so the content isn't clipped
              // to the rail before the aside has finished shrinking.
              "flex h-full w-(--sidebar-width) flex-col transition-[width] duration-200 ease-out group-data-[collapsed=icon]/sidebar:w-12 motion-reduce:transition-none",
              side === "right" && "ml-auto",
            ),
          })}
        >
          {/* One provider for the rail's tooltips: once one is open, moving to
              the next item shows its tooltip without the opening delay. */}
          <TooltipProvider>{children}</TooltipProvider>
        </div>
      </aside>
    </SidebarCollapsedContext.Provider>
  );
}

export type SidebarInsetProps = BaseUI.useRender.ComponentProps<"main">;

/** The main content beside a `Sidebar`. Renders a `<main>` element. */
export function SidebarInset(props: SidebarInsetProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "main",
    render,
    props: mergeProps(restProps, {
      className: tw("bg-background flex min-w-0 flex-1 flex-col"),
    }),
  });
}

export type SidebarTriggerProps = ButtonProps;

/** A button that expands and collapses the sidebar (or opens its drawer). */
export function SidebarTrigger(props: SidebarTriggerProps) {
  const { onClick, children, ...restProps } = props;
  const { open, openMobile, isMobile, toggle } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle sidebar"
      aria-expanded={isMobile ? openMobile : open}
      onClick={(event) => {
        onClick?.(event);
        toggle();
      }}
      {...restProps}
    >
      {children ?? <PanelLeft className="size-4" />}
    </Button>
  );
}

export type SidebarHeaderProps = BaseUI.useRender.ComponentProps<"div">;

/** Sticks to the top of the sidebar, above the scrolling content. */
export function SidebarHeader(props: SidebarHeaderProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("flex flex-col gap-2 p-2"),
    }),
  });
}

export type SidebarFooterProps = BaseUI.useRender.ComponentProps<"div">;

/** Sticks to the bottom of the sidebar, below the scrolling content. */
export function SidebarFooter(props: SidebarFooterProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("flex flex-col gap-2 p-2"),
    }),
  });
}

export type SidebarContentProps = BaseUI.useRender.ComponentProps<"div">;

/** The scrollable middle of the sidebar, holding its groups. */
export function SidebarContent(props: SidebarContentProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto group-data-[collapsed=icon]/sidebar:overflow-hidden",
      ),
    }),
  });
}

export type SidebarSeparatorProps = SeparatorProps;

export function SidebarSeparator(props: SidebarSeparatorProps) {
  return (
    <Separator
      {...mergeProps(props, {
        className: tw("mx-2 data-[orientation=horizontal]:w-auto"),
      })}
    />
  );
}

export interface SidebarGroupProps extends BaseUI.useRender
  .ComponentProps<"div"> {
  /** A heading for the group, which also names it for screen readers. */
  label?: React.ReactNode;
  /** Props forwarded to the label element. */
  labelProps?: React.ComponentPropsWithRef<"div">;
}

/** A labelled section of the sidebar. */
export function SidebarGroup(props: SidebarGroupProps) {
  const { render, label, labelProps, children, ...restProps } = props;
  const generatedId = React.useId();
  const labelId = labelProps?.id ?? generatedId;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: {
      role: "group",
      "aria-labelledby": label ? labelId : undefined,
      ...mergeProps(restProps, {
        className: tw("flex w-full min-w-0 flex-col p-2"),
      }),
      children: (
        <>
          {label && (
            <div
              {...mergeProps(labelProps, {
                id: labelId,
                className: tw(
                  "text-muted-fg flex h-8 shrink-0 items-center px-2 text-xs font-medium whitespace-nowrap transition-[margin,opacity] duration-200 ease-out group-data-[collapsed=icon]/sidebar:-mt-8 group-data-[collapsed=icon]/sidebar:opacity-0 motion-reduce:transition-none",
                ),
              })}
            >
              {label}
            </div>
          )}
          {children}
        </>
      ),
    },
  });
}

export type SidebarMenuProps = BaseUI.useRender.ComponentProps<"ul">;

/** A list of `SidebarMenuItem`s. */
export function SidebarMenu(props: SidebarMenuProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "ul",
    render,
    props: mergeProps(restProps, {
      className: tw("flex w-full min-w-0 flex-col gap-1"),
    }),
  });
}

export type SidebarMenuItemProps = BaseUI.useRender.ComponentProps<"li">;

export function SidebarMenuItem(props: SidebarMenuItemProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "li",
    render,
    props: mergeProps(restProps, {
      className: tw("relative min-w-0"),
    }),
  });
}

const baseMenuButtonStyles = tw(
  "text-foreground hover:bg-hover active:bg-active focus-visible:focus-outline data-active:primary-subtle data-active:hover:bg-primary-subtle-hover flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-lg text-left text-sm whitespace-nowrap transition-[width,height,padding,background-color] select-none focus-visible:-outline-offset-1 aria-disabled:pointer-events-none aria-disabled:opacity-60 data-active:font-medium [&>span]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
);

export const sidebarMenuButtonStyles = ({
  size = "md",
  extend,
}: { size?: SidebarMenuButtonSize; extend?: string } = {}) =>
  cn(baseMenuButtonStyles, menuButtonSizeStyles[size], extend);

const menuButtonSizeStyles = {
  sm: tw(
    "h-7 px-2 text-xs group-data-[collapsed=icon]/sidebar:size-8 group-data-[collapsed=icon]/sidebar:p-2",
  ),
  md: tw(
    "h-8 px-2 group-data-[collapsed=icon]/sidebar:size-8 group-data-[collapsed=icon]/sidebar:p-2",
  ),
  lg: tw(
    "h-12 px-2 group-data-[collapsed=icon]/sidebar:size-8 group-data-[collapsed=icon]/sidebar:p-0",
  ),
};

export type SidebarMenuButtonSize = keyof typeof menuButtonSizeStyles;

export interface SidebarMenuButtonProps extends BaseUI.useRender
  .ComponentProps<"button"> {
  /**
   * Marks the item as the current page: highlighted, and announced with
   * `aria-current="page"`.
   */
  active?: boolean;
  /** @default "md" */
  size?: SidebarMenuButtonSize;
  /**
   * Shown beside the button while the sidebar is collapsed to icons, where
   * the label is hidden.
   */
  tooltip?: React.ReactNode;
  tooltipProps?: TooltipProps;
}

/**
 * The clickable row of a `SidebarMenuItem`. Renders a `<button>`; pass
 * `render={<a href="…" />}` (or a router link) for navigation. Put an icon
 * first and the label in a `<span>` so it truncates.
 */
export function SidebarMenuButton(props: SidebarMenuButtonProps) {
  const {
    render,
    active,
    size = "md",
    tooltip,
    tooltipProps,
    ...restProps
  } = props;
  const collapsed = React.useContext(SidebarCollapsedContext);

  const element = BaseUI.useRender({
    defaultTagName: "button",
    render,
    props: {
      type: render ? undefined : "button",
      "data-active": active ? "" : undefined,
      "aria-current": active ? "page" : undefined,
      ...mergeProps(restProps, {
        className: sidebarMenuButtonStyles({ size }),
      }),
    },
  });

  if (!tooltip) {
    return element;
  }

  return (
    <Tooltip
      trigger={element}
      disabled={collapsed !== "icon"}
      {...tooltipProps}
      positionerProps={{ side: "right", ...tooltipProps?.positionerProps }}
    >
      {tooltip}
    </Tooltip>
  );
}

export type SidebarMenuBadgeProps = BaseUI.useRender.ComponentProps<"span">;

/** A count or status shown at the end of a `SidebarMenuButton`. */
export function SidebarMenuBadge(props: SidebarMenuBadgeProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(restProps, {
      className: tw(
        "text-muted-fg ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums",
      ),
    }),
  });
}

export type SidebarMenuSubProps = BaseUI.useRender.ComponentProps<"ul">;

/** A nested list of `SidebarMenuSubItem`s, hidden in the icon rail. */
export function SidebarMenuSub(props: SidebarMenuSubProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "ul",
    render,
    props: mergeProps(restProps, {
      className: tw(
        "ml-4 flex min-w-0 flex-col gap-1 border-l py-1 pl-2 group-data-[collapsed=icon]/sidebar:hidden",
      ),
    }),
  });
}

export type SidebarMenuSubItemProps = BaseUI.useRender.ComponentProps<"li">;

export function SidebarMenuSubItem(props: SidebarMenuSubItemProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "li",
    render,
    props: mergeProps(restProps, {
      className: tw("relative min-w-0"),
    }),
  });
}

export interface SidebarMenuSubButtonProps extends BaseUI.useRender
  .ComponentProps<"a"> {
  /**
   * Marks the item as the current page: highlighted, and announced with
   * `aria-current="page"`.
   */
  active?: boolean;
}

/** The link of a `SidebarMenuSubItem`. Renders an `<a>`. */
export function SidebarMenuSubButton(props: SidebarMenuSubButtonProps) {
  const { render, active, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "a",
    render,
    props: {
      "data-active": active ? "" : undefined,
      "aria-current": active ? "page" : undefined,
      ...mergeProps(restProps, {
        className: sidebarMenuButtonStyles({ size: "sm" }),
      }),
    },
  });
}
