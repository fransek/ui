import * as BaseUI from "@base-ui/react/use-render";
import { ChevronRight, MoreHorizontal, type LucideProps } from "lucide-react";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";

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
   * Whether the item is the current page (`aria-current="page"`).
   * @default false
   */
  current?: boolean;
}

/**
 * A link to an ancestor page, or plain text when it has no `href`.
 * Mark the last item `current`.
 * Pass `render` to use a router's link component,
 * e.g. `render={<NextLink href="/docs" />}`.
 */
export function BreadcrumbItem(props: BreadcrumbItemProps) {
  const isLink = props.href !== undefined || props.render !== undefined;
  const { render, current = false, ...restProps } = props;

  const element = BaseUI.useRender({
    defaultTagName: isLink ? "a" : "span",
    render,
    props: {
      "aria-current": current ? "page" : undefined,
      ...mergeProps(restProps, {
        className: current
          ? tw("text-foreground font-medium")
          : isLink
            ? tw(
                "hover:text-foreground focus-visible:focus-outline rounded-sm transition-colors focus-visible:outline-offset-1",
              )
            : undefined,
      }),
    },
  });

  return <ItemShell>{element}</ItemShell>;
}

export type BreadcrumbEllipsisProps = LucideProps;

/** An icon marking collapsed items. Hidden from assistive technology. */
export function BreadcrumbEllipsis(props: BreadcrumbEllipsisProps) {
  return (
    <MoreHorizontal
      {...mergeProps(props, {
        className: tw("text-muted-fg size-5"),
      })}
    />
  );
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Ellipsis = BreadcrumbEllipsis;
