import * as BaseUI from "@base-ui/react/use-render";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";

export type BreadcrumbProps = BaseUI.useRender.ComponentProps<"nav">;

export function Breadcrumb(props: BreadcrumbProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "nav",
    render,
    props: { "aria-label": "Breadcrumb", ...restProps },
  });
}

export type BreadcrumbListProps = BaseUI.useRender.ComponentProps<"ol">;

export function BreadcrumbList(props: BreadcrumbListProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "ol",
    render,
    props: mergeProps(restProps, {
      className: tw(
        "body-sm text-muted-fg flex flex-wrap items-center gap-1.5 break-words",
      ),
    }),
  });
}

export type BreadcrumbItemProps = BaseUI.useRender.ComponentProps<"li">;

export function BreadcrumbItem(props: BreadcrumbItemProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "li",
    render,
    props: mergeProps(restProps, {
      className: tw("inline-flex items-center gap-1.5"),
    }),
  });
}

/**
 * A link to an ancestor page. Pass `render` to use a router's link component,
 * e.g. `render={<NextLink href="/docs" />}`.
 */
export type BreadcrumbLinkProps = BaseUI.useRender.ComponentProps<"a">;

export function BreadcrumbLink(props: BreadcrumbLinkProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "a",
    render,
    props: mergeProps(restProps, {
      className: tw(
        "hover:text-foreground focus-visible:focus-outline rounded-sm underline-offset-2 transition-colors outline-none hover:underline",
      ),
    }),
  });
}

/** The current page: the last item, rendered as text rather than a link. */
export type BreadcrumbPageProps = BaseUI.useRender.ComponentProps<"span">;

export function BreadcrumbPage(props: BreadcrumbPageProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "span",
    render,
    props: {
      "aria-current": "page",
      ...mergeProps(restProps, {
        className: tw("text-foreground font-medium"),
      }),
    },
  });
}

/** Placed between items. Defaults to a chevron; pass `children` to replace it. */
export type BreadcrumbSeparatorProps = BaseUI.useRender.ComponentProps<"li">;

export function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
  const { render, children, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "li",
    render,
    props: {
      role: "presentation",
      "aria-hidden": true,
      ...mergeProps(restProps, {
        className: tw("inline-flex items-center [&>svg]:size-3.5"),
      }),
      children: children ?? <ChevronRight className="rtl:rotate-180" />,
    },
  });
}

export interface BreadcrumbEllipsisProps extends BaseUI.useRender
  .ComponentProps<"span"> {
  /**
   * The accessible name of the collapsed items.
   * @default "More"
   */
  label?: string;
}

/** Stands in for collapsed items, e.g. as the trigger of a `Menu`. */
export function BreadcrumbEllipsis(props: BreadcrumbEllipsisProps) {
  const { render, label = "More", children, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "span",
    render,
    props: {
      ...mergeProps(restProps, {
        className: tw("inline-flex size-6 items-center justify-center"),
      }),
      children: children ?? (
        <>
          <MoreHorizontal aria-hidden className="size-4" />
          <span className="sr-only">{label}</span>
        </>
      ),
    },
  });
}

Breadcrumb.List = BreadcrumbList;
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.Page = BreadcrumbPage;
Breadcrumb.Separator = BreadcrumbSeparator;
Breadcrumb.Ellipsis = BreadcrumbEllipsis;
