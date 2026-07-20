import { PanelLeft } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { Button, ButtonProps } from "./button";

interface SidebarContextValue {
  /** Whether the sidebar is expanded (`true`) or collapsed to the rail. */
  open: boolean;
  /** Set the open state directly. */
  setOpen: (open: boolean) => void;
  /** Toggle between expanded and collapsed. */
  toggle: () => void;
  /** Shared id linking `SidebarTrigger` (`aria-controls`) to `SidebarPanel`. */
  panelId: string;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

/**
 * Read the state of the nearest `Sidebar`. Throws when used outside of one, so
 * custom triggers/items can rely on a defined context.
 */
export function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <Sidebar>.");
  }
  return context;
}

export interface SidebarProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "onChange"
> {
  /** Controlled expanded state. */
  open?: boolean;
  /** Uncontrolled initial expanded state. @default true */
  defaultOpen?: boolean;
  /** Called whenever the expanded state changes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Width of the expanded panel, as any CSS length (e.g. `"16rem"`, `"280px"`).
   * Sets the `--sidebar-width` custom property. @default "16rem"
   */
  width?: string;
  /**
   * Width of the collapsed icon rail, as any CSS length. Sets the
   * `--sidebar-width-collapsed` custom property. @default "4rem"
   */
  collapsedWidth?: string;
}

/**
 * Root of an in-flow sidebar. Provides open/collapsed state via context and
 * lays out its children (typically a `SidebarPanel` next to the main content)
 * in a row. Unlike `Drawer`, it is not a dialog or overlay.
 */
export function Sidebar(props: SidebarProps) {
  const {
    open: controlledOpen,
    defaultOpen = true,
    onOpenChange,
    width,
    collapsedWidth,
    className,
    style,
    ...restProps
  } = props;

  const panelId = React.useId();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const toggle = React.useCallback(() => setOpen(!open), [open, setOpen]);

  const context = React.useMemo<SidebarContextValue>(
    () => ({ open, setOpen, toggle, panelId }),
    [open, setOpen, toggle, panelId],
  );

  return (
    <SidebarContext.Provider value={context}>
      <div
        className={cn("flex", className)}
        style={
          {
            "--sidebar-width": width ?? "16rem",
            "--sidebar-width-collapsed": collapsedWidth ?? "4rem",
            ...style,
          } as React.CSSProperties
        }
        {...restProps}
      />
    </SidebarContext.Provider>
  );
}

export type SidebarPanelProps = React.ComponentPropsWithoutRef<"aside">;

/**
 * The visible sidebar surface. Sits in the document flow and animates its width
 * between the expanded panel and the collapsed icon rail.
 */
export function SidebarPanel(props: SidebarPanelProps) {
  const { className, id, ...restProps } = props;
  const { open, panelId } = useSidebar();

  return (
    <aside
      id={id ?? panelId}
      data-open={open ? "" : undefined}
      data-collapsed={open ? undefined : ""}
      className={cn(sidebarPanelStyles, className)}
      {...restProps}
    />
  );
}

export const sidebarPanelStyles =
  "bg-card text-foreground flex h-full w-(--sidebar-width) shrink-0 flex-col overflow-hidden border-r transition-[width] duration-300 ease-out data-collapsed:w-(--sidebar-width-collapsed)";

export interface SidebarTriggerProps extends ButtonProps {
  /** Swap the rendered element (e.g. a custom button), like `Drawer`'s trigger. */
  render?: ButtonProps["render"];
}

/**
 * Toggles the sidebar. Reuses `Button` and can live anywhere inside a
 * `Sidebar` — including a top header outside the panel.
 */
export function SidebarTrigger(props: SidebarTriggerProps) {
  const {
    size = "icon",
    variant = "ghost",
    onClick,
    children,
    ...restProps
  } = props;
  const { open, toggle, panelId } = useSidebar();

  return (
    <Button
      size={size}
      variant={variant}
      aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          toggle();
        }
      }}
      {...restProps}
    >
      {children ?? <PanelLeft className="size-4" />}
    </Button>
  );
}

export interface SidebarItemProps extends ButtonProps {
  /** Leading icon, always visible (including in the collapsed rail). */
  icon?: React.ReactNode;
}

/**
 * A navigation row. Shows an icon plus label when expanded; collapses to the
 * icon alone (with a tooltip and accessible label) on the rail. Forward `render`
 * to make it an anchor or router link.
 */
export function SidebarItem(props: SidebarItemProps) {
  const {
    icon,
    variant = "ghost",
    className,
    children,
    tooltip,
    ...restProps
  } = props;
  const { open } = useSidebar();

  const label = !open && typeof children === "string" ? children : undefined;

  return (
    <Button
      variant={variant}
      aria-label={label}
      tooltip={open ? tooltip : (tooltip ?? children)}
      tooltipProps={open ? undefined : { positionerProps: { side: "right" } }}
      className={cn(
        "min-w-0 justify-start gap-3",
        !open && "justify-center",
        className,
      )}
      {...restProps}
    >
      {icon}
      {open && <span className="truncate">{children}</span>}
    </Button>
  );
}

export type SidebarHeaderProps = React.ComponentPropsWithoutRef<"div">;

/** Top slot of the panel, typically a logo or app title. */
export function SidebarHeader(props: SidebarHeaderProps) {
  const { className, ...restProps } = props;
  return (
    <div
      className={cn("flex items-center gap-2 p-3", className)}
      {...restProps}
    />
  );
}

export type SidebarContentProps = React.ComponentPropsWithoutRef<"div">;

/** Scrollable middle slot, typically the navigation items. */
export function SidebarContent(props: SidebarContentProps) {
  const { className, ...restProps } = props;
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-1 overflow-y-auto p-2",
        className,
      )}
      {...restProps}
    />
  );
}

export type SidebarFooterProps = React.ComponentPropsWithoutRef<"div">;

/** Bottom slot of the panel, typically a user/account area. */
export function SidebarFooter(props: SidebarFooterProps) {
  const { className, ...restProps } = props;
  return (
    <div
      className={cn("mt-auto flex flex-col gap-1 border-t p-2", className)}
      {...restProps}
    />
  );
}
