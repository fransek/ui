import {
  Meter as BaseUIMeter,
  MeterRootProps as BaseUIMeterRootProps,
  MeterIndicatorProps,
  MeterLabelProps,
  MeterValueProps,
} from "@base-ui/react/meter";
import React from "react";
import { cn, cnBaseUI } from "../lib/utils";

export interface MeterProps extends BaseUIMeterRootProps {
  /** Label describing what the meter represents. */
  label?: React.ReactNode;
  /** Whether to display the formatted value next to the label. Defaults to true. */
  showValue?: boolean;
  variant?: MeterVariant;
  size?: MeterSize;
  labelProps?: MeterLabelProps;
  valueProps?: MeterValueProps;
  trackProps?: React.ComponentProps<typeof BaseUIMeter.Track>;
  indicatorProps?: MeterIndicatorProps;
}

export function Meter(props: MeterProps) {
  const {
    label,
    showValue = true,
    variant = "primary",
    size = "md",
    className,
    labelProps: { className: labelClassName, ...labelProps } = {},
    valueProps: { className: valueClassName, ...valueProps } = {},
    trackProps: { className: trackClassName, ...trackProps } = {},
    indicatorProps: { className: indicatorClassName, ...indicatorProps } = {},
    ...restProps
  } = props;

  return (
    <BaseUIMeter.Root
      className={cnBaseUI("grid w-48 grid-cols-2 gap-y-1.5", className)}
      {...restProps}
    >
      {label && (
        <BaseUIMeter.Label
          className={cnBaseUI(
            "text-foreground col-start-1 text-sm font-medium",
            labelClassName,
          )}
          {...labelProps}
        >
          {label}
        </BaseUIMeter.Label>
      )}
      {showValue && (
        <BaseUIMeter.Value
          className={cnBaseUI(
            "text-muted-foreground col-start-2 text-right text-sm",
            valueClassName,
          )}
          {...valueProps}
        />
      )}
      <BaseUIMeter.Track
        className={cnBaseUI(trackStyles({ size }), trackClassName)}
        {...trackProps}
      >
        <BaseUIMeter.Indicator
          className={cnBaseUI(indicatorStyles({ variant }), indicatorClassName)}
          {...indicatorProps}
        />
      </BaseUIMeter.Track>
    </BaseUIMeter.Root>
  );
}

const baseTrackStyles =
  "bg-muted/40 col-span-2 block overflow-hidden rounded-full";

const trackSizeStyles = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export const trackStyles = ({
  size = "md",
  extend,
}: {
  size?: MeterSize;
  extend?: string;
}) => cn(baseTrackStyles, trackSizeStyles[size], extend);

const baseIndicatorStyles = "block h-full transition-[width] duration-500";

const indicatorVariantStyles = {
  primary: "bg-primary",
  secondary: "bg-secondary-foreground",
  muted: "bg-muted",
  error: "bg-error",
  success: "bg-success",
  warning: "bg-warning",
};

export const indicatorStyles = ({
  variant = "primary",
  extend,
}: {
  variant?: MeterVariant;
  extend?: string;
}) => cn(baseIndicatorStyles, indicatorVariantStyles[variant], extend);

export type MeterSize = keyof typeof trackSizeStyles;
export type MeterVariant = keyof typeof indicatorVariantStyles;
