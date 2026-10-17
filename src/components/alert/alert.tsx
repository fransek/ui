import * as BaseUI from "@base-ui/react/use-render";
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";
import { CloseButton, CloseButtonProps } from "../close-button";

export interface AlertProps extends BaseUI.useRender.ComponentProps<"div"> {
  /** Sets the color and the default icon. */
  variant?: AlertVariant;
  /**
   * Replaces the variant's default icon. Pass `null` or `false` to render
   * no icon. The icon is decorative and hidden from assistive technology, so
   * the text should carry the meaning on its own.
   */
  icon?: React.ReactNode;
}

/**
 * An inline status message, the static counterpart to `Toast`.
 *
 * Renders no live region by default, which suits messages that are part of
 * the page when it loads. Pass `role="alert"` for urgent messages that appear
 * in response to something the user did, or `role="status"` for polite ones.
 */
export function Alert(props: AlertProps) {
  const { render, variant = "info", icon, children, ...restProps } = props;
  const resolvedIcon = icon === undefined ? defaultIcons[variant] : icon;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: {
      "data-variant": variant,
      ...mergeProps(restProps, { className: alertStyles({ variant }) }),
      children: (
        <>
          {resolvedIcon !== null && resolvedIcon !== false && (
            <span
              aria-hidden="true"
              className={cn(
                "flex h-5 shrink-0 items-center [&>svg]:size-5",
                iconStyles[variant],
              )}
            >
              {resolvedIcon}
            </span>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-1">{children}</div>
        </>
      ),
    },
  });
}

export type AlertTitleProps = BaseUI.useRender.ComponentProps<"div">;

/**
 * The alert's heading. Renders a `div` so it doesn't disturb the page's
 * heading outline; use `render={<h2 />}` when it should be a heading.
 */
export function AlertTitle(props: AlertTitleProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("text-foreground font-semibold"),
    }),
  });
}

export type AlertDescriptionProps = BaseUI.useRender.ComponentProps<"div">;

export function AlertDescription(props: AlertDescriptionProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, { className: tw("text-body") }),
  });
}

export type AlertActionsProps = BaseUI.useRender.ComponentProps<"div">;

/** A row of buttons or links below the description. */
export function AlertActions(props: AlertActionsProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("mt-2 flex flex-wrap items-center gap-2"),
    }),
  });
}

/** A dismiss button pinned to the alert's top-right corner. */
export function AlertClose(props: CloseButtonProps) {
  return (
    <CloseButton
      position="top-right"
      aria-label="Dismiss"
      data-slot="alert-close"
      {...props}
    />
  );
}

Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
Alert.Actions = AlertActions;
Alert.Close = AlertClose;

const defaultIcons = {
  info: <Info />,
  success: <CircleCheck />,
  warning: <TriangleAlert />,
  danger: <CircleX />,
};

const iconStyles = {
  info: tw("text-primary-fg"),
  success: tw("text-success-fg"),
  warning: tw("text-warning-fg"),
  danger: tw("text-danger-fg"),
};

const baseAlertStyles = tw(
  "body-sm text-foreground relative flex w-full gap-3 rounded-lg border p-4 has-[[data-slot=alert-close]]:pr-12",
);

const variantStyles = {
  info: tw("border-primary-fg/40 bg-primary-fg/5"),
  success: tw("border-success-fg/40 bg-success-fg/5"),
  warning: tw("border-warning-fg/40 bg-warning-fg/5"),
  danger: tw("border-danger-fg/40 bg-danger-fg/5"),
};

export const alertStyles = ({
  variant = "info",
  extend,
}: {
  variant?: AlertVariant;
  extend?: string;
} = {}) => cn(baseAlertStyles, variantStyles[variant], extend);

export type AlertVariant = keyof typeof variantStyles;
