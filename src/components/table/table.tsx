import * as BaseUIButton from "@base-ui/react/button";
import * as BaseUI from "@base-ui/react/use-render";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";

const sizeStyles = {
  sm: tw("px-2 py-1.5"),
  md: tw("px-3 py-2.5"),
  lg: tw("px-4 py-3.5"),
};

export type TableSize = keyof typeof sizeStyles;

interface TableContextValue {
  size: TableSize;
  striped: boolean;
}

const TableContext = React.createContext<TableContextValue>({
  size: "md",
  striped: false,
});

export function useTableContext() {
  return React.useContext(TableContext);
}

export interface TableProps extends BaseUI.useRender.ComponentProps<"table"> {
  /**
   * Cell padding density.
   * @default "md"
   */
  size?: TableSize;
  /** Shades every other body row. */
  striped?: boolean;
  /** Props forwarded to the scroll container wrapping the table. */
  containerProps?: React.ComponentProps<"div">;
}

export function Table(props: TableProps) {
  const {
    render,
    size = "md",
    striped = false,
    containerProps,
    ...restProps
  } = props;

  const contextValue = React.useMemo(
    () => ({ size, striped }),
    [size, striped],
  );

  const table = BaseUI.useRender({
    defaultTagName: "table",
    render,
    props: mergeProps(restProps, {
      className: tw("body-sm text-foreground w-full caption-bottom"),
    }),
  });

  return (
    <TableContext.Provider value={contextValue}>
      <div
        {...mergeProps(containerProps, {
          className: tw("relative w-full overflow-auto"),
        })}
      >
        {table}
      </div>
    </TableContext.Provider>
  );
}

export interface TableHeaderProps extends BaseUI.useRender
  .ComponentProps<"thead"> {
  /**
   * Keeps the header in view while the table's container scrolls. Give the
   * container a max height through `containerProps` for this to take effect.
   */
  sticky?: boolean;
}

export function TableHeader(props: TableHeaderProps) {
  const { render, sticky, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "thead",
    render,
    props: {
      "data-sticky": sticky ? "" : undefined,
      ...mergeProps(restProps, {
        className: tw(
          "data-sticky:bg-background data-sticky:sticky data-sticky:top-0 data-sticky:z-10 data-sticky:shadow-[inset_0_-1px_0_var(--color-border)]",
        ),
      }),
    },
  });
}

export type TableBodyProps = BaseUI.useRender.ComponentProps<"tbody">;

export function TableBody(props: TableBodyProps) {
  const { render, ...restProps } = props;
  const { striped } = useTableContext();

  return BaseUI.useRender({
    defaultTagName: "tbody",
    render,
    props: mergeProps(restProps, {
      className: cn(
        "[&>tr:last-child]:border-b-0",
        striped && "[&>tr:nth-child(even)]:bg-hover/40",
      ),
    }),
  });
}

export type TableFooterProps = BaseUI.useRender.ComponentProps<"tfoot">;

export function TableFooter(props: TableFooterProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "tfoot",
    render,
    props: mergeProps(restProps, {
      className: tw("border-t font-medium [&>tr:last-child]:border-b-0"),
    }),
  });
}

export interface TableRowProps extends BaseUI.useRender.ComponentProps<"tr"> {
  /** Highlights the row as selected. */
  selected?: boolean;
}

export function TableRow(props: TableRowProps) {
  const { render, selected, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "tr",
    render,
    props: {
      "data-selected": selected ? "" : undefined,
      ...mergeProps(restProps, {
        className: tw(
          "data-selected:bg-primary/10 data-selected:hover:bg-primary/15 in-[tbody]:hover:bg-hover border-b transition-colors",
        ),
      }),
    },
  });
}

export type TableSortDirection = "ascending" | "descending" | "none";

export interface TableHeadProps extends BaseUI.useRender.ComponentProps<"th"> {
  /**
   * The column's current sort direction. Sets `aria-sort` on the header cell.
   */
  sortDirection?: TableSortDirection;
  /**
   * When set, the header content is wrapped in a button that calls this
   * handler, and a sort indicator is shown.
   */
  onSort?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Props forwarded to the sort button. */
  sortButtonProps?: BaseUIButton.ButtonProps;
}

export function TableHead(props: TableHeadProps) {
  const {
    render,
    sortDirection,
    onSort,
    sortButtonProps,
    children,
    ...restProps
  } = props;
  const { size } = useTableContext();

  const SortIcon =
    sortDirection === "ascending"
      ? ArrowUp
      : sortDirection === "descending"
        ? ArrowDown
        : ChevronsUpDown;

  return BaseUI.useRender({
    defaultTagName: "th",
    render,
    props: {
      scope: "col",
      "aria-sort": sortDirection,
      ...mergeProps(restProps, {
        className: cn(
          "text-muted-fg text-left align-middle font-medium whitespace-nowrap",
          sizeStyles[size],
        ),
      }),
      children: onSort ? (
        <BaseUIButton.Button
          onClick={onSort}
          {...mergeProps(sortButtonProps, {
            className: tw(
              "hover:text-foreground focus-visible:focus-outline -mx-1 inline-flex cursor-pointer items-center gap-1 rounded-sm px-1 font-medium transition-colors",
            ),
          })}
        >
          {children}
          <SortIcon
            aria-hidden
            className={cn(
              "size-3.5 shrink-0",
              (!sortDirection || sortDirection === "none") && "opacity-50",
            )}
          />
        </BaseUIButton.Button>
      ) : (
        children
      ),
    },
  });
}

export type TableCellProps = BaseUI.useRender.ComponentProps<"td">;

export function TableCell(props: TableCellProps) {
  const { render, ...restProps } = props;
  const { size } = useTableContext();

  return BaseUI.useRender({
    defaultTagName: "td",
    render,
    props: mergeProps(restProps, {
      className: cn("align-middle", sizeStyles[size]),
    }),
  });
}

export type TableCaptionProps = BaseUI.useRender.ComponentProps<"caption">;

export function TableCaption(props: TableCaptionProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "caption",
    render,
    props: mergeProps(restProps, {
      className: tw("body-sm text-muted-fg mt-3"),
    }),
  });
}

export interface TableEmptyProps extends TableCellProps {
  /** The number of columns the message spans. */
  colSpan: number;
  /** Props forwarded to the row wrapping the cell. */
  rowProps?: TableRowProps;
}

/** A full-width row for an empty table. Render it inside `Table.Body`. */
export function TableEmpty(props: TableEmptyProps) {
  const { rowProps, ...restProps } = props;

  return (
    <TableRow
      {...mergeProps(rowProps, {
        className: tw("in-[tbody]:hover:bg-transparent"),
      })}
    >
      <TableCell
        {...mergeProps(restProps, {
          className: tw("text-muted-fg py-8 text-center"),
        })}
      />
    </TableRow>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Caption = TableCaption;
Table.Empty = TableEmpty;
