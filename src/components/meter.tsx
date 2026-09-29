import * as BaseUI from "@base-ui/react/meter";
import React from "react";
import { cn, mergeProps, tw } from "../lib/utils";

export interface MeterProps extends BaseUI.MeterRootProps {
  /** Label describing what the meter represents. */
  label?: React.ReactNode;
  /** Whether to display the formatted value next to the label. Defaults to true. */
  showValue?: boolean;
  variant?: MeterVariant;
  size?: MeterSize;
  labelProps?: BaseUI.MeterLabelProps;
  valueProps?: BaseUI.MeterValueProps;
  trackProps?: React.ComponentProps<typeof BaseUI.Meter.Track>;
  indicatorProps?: BaseUI.MeterIndicatorProps;
}

export function Meter(props: MeterProps) {
  const {
    label,
    showValue = true,
    variant = "primary",
    size = "md",
    labelProps,
    valueProps,
    trackProps,
    indicatorProps,
    ...restProps
  } = props;

  return (
    <BaseUI.Meter.Root
      {...mergeProps(restProps, {
        className: tw("grid w-48 grid-cols-2 gap-y-1.5"),
      })}
    >
      {label && (
        <BaseUI.Meter.Label
          {...mergeProps(labelProps, {
            className: tw("text-foreground col-start-1 text-sm font-medium"),
          })}
        >
          {label}
        </BaseUI.Meter.Label>
      )}
      {showValue && (
        <BaseUI.Meter.Value
          {...mergeProps(valueProps, {
            className: tw("text-muted-fg col-start-2 text-right text-sm"),
          })}
        />
      )}
      <BaseUI.Meter.Track
        {...mergeProps(trackProps, { className: trackStyles({ size }) })}
      >
        <BaseUI.Meter.Indicator
          {...mergeProps(indicatorProps, {
            className: indicatorStyles({ variant }),
          })}
        />
      </BaseUI.Meter.Track>
    </BaseUI.Meter.Root>
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
  secondary: "bg-secondary-fg",
  muted: "bg-muted",
  danger: "bg-danger",
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
