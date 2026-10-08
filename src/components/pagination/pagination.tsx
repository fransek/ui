import * as BaseUI from "@base-ui/react/use-render";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";
import { Button, ButtonProps } from "../button";

const sizeStyles = {
  sm: tw("h-7 min-w-7 px-1"),
  md: tw("h-9 min-w-9 px-1.5"),
  lg: tw("h-10 min-w-10 px-2"),
};

export type PaginationSize = keyof typeof sizeStyles;

export type PaginationItem = number | "ellipsis";

/**
 * The pages to show for `page` out of `pageCount`: the first and last
 * `boundaryCount` pages, `siblingCount` pages either side of the current one,
 * and an ellipsis for each gap. The item count stays constant as the current
 * page moves, so the controls don't shift under the pointer.
 */
export function getPaginationItems({
  page,
  pageCount,
  siblingCount = 1,
  boundaryCount = 1,
}: {
  page: number;
  pageCount: number;
  siblingCount?: number;
  boundaryCount?: number;
}): PaginationItem[] {
  const range = (start: number, end: number) =>
    Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => start + i);

  // Boundaries, siblings, the current page and two ellipses.
  if (pageCount <= boundaryCount * 2 + siblingCount * 2 + 3) {
    return range(1, pageCount);
  }

  const startPages = range(1, boundaryCount);
  const endPages = range(pageCount - boundaryCount + 1, pageCount);

  const siblingsStart = Math.max(
    Math.min(
      page - siblingCount,
      pageCount - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    pageCount - boundaryCount - 1,
  );

  return [
    ...startPages,
    // An ellipsis would hide a single page, so show that page instead.
    siblingsStart > boundaryCount + 2 ? "ellipsis" : boundaryCount + 1,
    ...range(siblingsStart, siblingsEnd),
    siblingsEnd < pageCount - boundaryCount - 1
      ? "ellipsis"
      : pageCount - boundaryCount,
    ...endPages,
  ];
}

export interface PaginationProps extends BaseUI.useRender
  .ComponentProps<"nav"> {
  /** The total number of pages. */
  pageCount: number;
  /** The current page, starting at 1. Use with `onPageChange`. */
  page?: number;
  /**
   * The initial page when uncontrolled.
   * @default 1
   */
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /**
   * Pages shown either side of the current page.
   * @default 1
   */
  siblingCount?: number;
  /**
   * Pages always shown at the start and end.
   * @default 1
   */
  boundaryCount?: number;
  /** @default "md" */
  size?: PaginationSize;
  /** @default "Pagination" */
  "aria-label"?: string;
  /** @default "Previous page" */
  previousLabel?: string;
  /** @default "Next page" */
  nextLabel?: string;
  /** @default (page) => `Page ${page}` */
  getPageLabel?: (page: number) => string;
}

export function Pagination(props: PaginationProps) {
  const {
    render,
    pageCount,
    page: pageProp,
    defaultPage = 1,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    size = "md",
    previousLabel = "Previous page",
    nextLabel = "Next page",
    getPageLabel = (page) => `Page ${page}`,
    ...restProps
  } = props;

  const [uncontrolledPage, setUncontrolledPage] = React.useState(defaultPage);
  const page = Math.min(
    Math.max(pageProp ?? uncontrolledPage, 1),
    Math.max(pageCount, 1),
  );

  const goTo = (next: number) => {
    if (next === page || next < 1 || next > pageCount) return;
    setUncontrolledPage(next);
    onPageChange?.(next);
  };

  const items = getPaginationItems({
    page,
    pageCount,
    siblingCount,
    boundaryCount,
  });

  const button = ({ className, ...itemProps }: ButtonProps) => (
    <Button
      variant="ghost"
      size={size}
      className={cn(sizeStyles[size], className)}
      {...itemProps}
    />
  );

  const iconClassName = cn("shrink-0", size === "sm" ? "size-3.5" : "size-4");

  return BaseUI.useRender({
    defaultTagName: "nav",
    render,
    props: {
      "aria-label": "Pagination",
      ...mergeProps(restProps, {
        className: tw("flex"),
      }),
      children: (
        <ul className="flex items-center gap-1">
          <li>
            {button({
              "aria-label": previousLabel,
              disabled: page <= 1,
              onClick: () => goTo(page - 1),
              children: (
                <ChevronLeft
                  aria-hidden
                  className={cn(iconClassName, "rtl:rotate-180")}
                />
              ),
            })}
          </li>
          {items.map((item, index) =>
            item === "ellipsis" ? (
              <li
                key={`ellipsis-${index}`}
                aria-hidden
                className={cn(
                  "text-muted-fg flex items-center justify-center",
                  sizeStyles[size],
                )}
              >
                <MoreHorizontal className={iconClassName} />
              </li>
            ) : (
              <li key={item}>
                {button({
                  variant: item === page ? "secondary" : "ghost",
                  "aria-label": getPageLabel(item),
                  "aria-current": item === page ? "page" : undefined,
                  onClick: () => goTo(item),
                  className: "tabular-nums",
                  children: item,
                })}
              </li>
            ),
          )}
          <li>
            {button({
              "aria-label": nextLabel,
              disabled: page >= pageCount,
              onClick: () => goTo(page + 1),
              children: (
                <ChevronRight
                  aria-hidden
                  className={cn(iconClassName, "rtl:rotate-180")}
                />
              ),
            })}
          </li>
        </ul>
      ),
    },
  });
}
