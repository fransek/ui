import * as BaseUI from "@base-ui/react/use-render";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";
import { Button, type ButtonProps } from "../button";

const BreadcrumbContext = React.createContext<React.ReactNode>(null);

export interface BreadcrumbProps extends BaseUI.useRender
  .ComponentProps<"nav"> {
  /**
   * Placed between items.
   * @default <ChevronRight />
   */
  separator?: React.ReactNode;
  listProps?: React.ComponentProps<"ol">;
}

export function Breadcrumb(props: BreadcrumbProps) {
  const {
    render,
    separator = <ChevronRight className="rtl:rotate-180" />,
    listProps,
    children,
    ...restProps
  } = props;

  const element = BaseUI.useRender({
    defaultTagName: "nav",
    render,
    props: {
      "aria-label": "Breadcrumb",
      ...restProps,
      children: (
        <ol
          {...mergeProps(listProps ?? {}, {
            className: tw(
              "body-sm text-muted-fg flex flex-wrap items-center gap-1.5 wrap-break-word",
            ),
          })}
        >
          {children}
        </ol>
      ),
    },
  });

  return (
    <BreadcrumbContext.Provider value={separator}>
      {element}
    </BreadcrumbContext.Provider>
  );
}

/** Wraps an item's content in a list item followed by the separator. */
function ItemShell({ children }: { children: React.ReactNode }) {
  const separator = React.useContext(BreadcrumbContext);

  return (
    <li className="group/breadcrumb-item inline-flex items-center gap-1.5">
      {children}
      <span
        aria-hidden
        className="inline-flex items-center group-last/breadcrumb-item:hidden [&>svg]:size-3.5"
      >
        {separator}
      </span>
    </li>
  );
}

export interface BreadcrumbItemProps extends BaseUI.useRender
  .ComponentProps<"a"> {
  /**
   * Whether the item is the current page, rendered as text rather than a
   * link. Defaults to `true` when neither `href` nor `render` is given.
   */
  current?: boolean;
}

/**
 * A link to an ancestor page, or the current page when it has no `href`.
 * Pass `render` to use a router's link component,
 * e.g. `render={<NextLink href="/docs" />}`.
 */
export function BreadcrumbItem(props: BreadcrumbItemProps) {
  const {
    render,
    current = props.href === undefined && render === undefined,
    ...restProps
  } = props;

  const element = BaseUI.useRender({
    defaultTagName: current ? "span" : "a",
    render,
    props: current
      ? {
          "aria-current": "page",
          ...mergeProps(restProps, {
            className: tw("text-foreground font-medium"),
          }),
        }
      : mergeProps(restProps, {
          className: tw(
            "hover:text-foreground focus-visible:focus-outline rounded-sm transition-colors focus-visible:outline-offset-1",
          ),
        }),
  });

  return <ItemShell>{element}</ItemShell>;
}

export interface BreadcrumbEllipsisProps extends ButtonProps {
  /**
   * The accessible name of the collapsed items.
   * @default "More"
   */
  label?: string;
}

/**
 * Stands in for collapsed items. Pass it as the `trigger` of a `Menu` to
 * reveal them, e.g. `<Menu trigger={<Breadcrumb.Ellipsis />}>`.
 */
export function BreadcrumbEllipsis(props: BreadcrumbEllipsisProps) {
  const { label = "More", children, ...restProps } = props;

  return (
    <ItemShell>
      <Button
        variant="ghost"
        size="icon"
        {...mergeProps(restProps, { className: tw("text-muted-fg h-5") })}
      >
        {children ?? (
          <>
            <MoreHorizontal aria-hidden className="size-4" />
            <span className="sr-only">{label}</span>
          </>
        )}
      </Button>
    </ItemShell>
  );
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Ellipsis = BreadcrumbEllipsis;
