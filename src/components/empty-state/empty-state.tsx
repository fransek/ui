import * as BaseUI from "@base-ui/react/use-render";
import { cn, mergeProps, tw } from "../../lib/utils";

export interface EmptyStateProps extends BaseUI.useRender
  .ComponentProps<"div"> {
  /**
   * `md` suits a page or a card. `sm` suits tighter spots such as a table
   * body, a popover or a search dropdown.
   */
  size?: EmptyStateSize;
}

/**
 * A placeholder for a view with nothing to show yet: an empty table or list,
 * a search with no results, a project with no items.
 *
 * Compose it from `EmptyState.Icon`, `EmptyState.Title`,
 * `EmptyState.Description` and `EmptyState.Actions`.
 */
export function EmptyState(props: EmptyStateProps) {
  const { render, size = "md", ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: {
      "data-size": size,
      ...mergeProps(restProps, { className: emptyStateStyles({ size }) }),
    },
  });
}

export interface EmptyStateIconProps extends BaseUI.useRender
  .ComponentProps<"div"> {
  /**
   * `default` sets the icon in a tinted circle. `plain` renders it as is,
   * which suits illustrations and larger artwork.
   */
  variant?: EmptyStateIconVariant;
}

/**
 * The icon or illustration above the title. It is decorative and hidden from
 * assistive technology, so the title should carry the meaning on its own.
 */
export function EmptyStateIcon(props: EmptyStateIconProps) {
  const { render, variant = "default", ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: {
      "aria-hidden": true,
      "data-variant": variant,
      ...mergeProps(restProps, { className: iconVariantStyles[variant] }),
    },
  });
}

export type EmptyStateTitleProps = BaseUI.useRender.ComponentProps<"div">;

/**
 * The empty state's heading. Renders a `div` so it doesn't disturb the page's
 * heading outline; use `render={<h2 />}` when it should be a heading.
 */
export function EmptyStateTitle(props: EmptyStateTitleProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw(
        "text-foreground font-semibold group-data-[size=md]/empty-state:text-lg",
      ),
    }),
  });
}

export type EmptyStateDescriptionProps = BaseUI.useRender.ComponentProps<"p">;

export function EmptyStateDescription(props: EmptyStateDescriptionProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "p",
    render,
    props: mergeProps(restProps, {
      className: tw("text-body max-w-sm text-balance"),
    }),
  });
}

export type EmptyStateActionsProps = BaseUI.useRender.ComponentProps<"div">;

/** A row of buttons or links below the description. */
export function EmptyStateActions(props: EmptyStateActionsProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw(
        "mt-2 flex flex-wrap items-center justify-center gap-2 group-data-[size=md]/empty-state:mt-4",
      ),
    }),
  });
}

EmptyState.Icon = EmptyStateIcon;
EmptyState.Title = EmptyStateTitle;
EmptyState.Description = EmptyStateDescription;
EmptyState.Actions = EmptyStateActions;

const iconVariantStyles = {
  default: tw(
    "secondary text-secondary-fg mb-2 flex size-12 items-center justify-center rounded-full group-data-[size=sm]/empty-state:size-10 [&>svg]:size-6 group-data-[size=sm]/empty-state:[&>svg]:size-5",
  ),
  plain: tw("text-muted-fg mb-2 flex items-center justify-center"),
};

const baseEmptyStateStyles = tw(
  "group/empty-state flex w-full flex-col items-center justify-center gap-1 text-center",
);

const sizeStyles = {
  sm: tw("body-sm px-4 py-6"),
  md: tw("body gap-2 px-6 py-12"),
};

export const emptyStateStyles = ({
  size = "md",
  extend,
}: {
  size?: EmptyStateSize;
  extend?: string;
} = {}) => cn(baseEmptyStateStyles, sizeStyles[size], extend);

export type EmptyStateSize = keyof typeof sizeStyles;
export type EmptyStateIconVariant = keyof typeof iconVariantStyles;
