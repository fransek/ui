import * as BaseUI from "@base-ui/react/progress";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";

export interface ProgressProps extends BaseUI.ProgressRootProps {
  /** Label describing the task in progress. */
  label?: React.ReactNode;
  /** Whether to display the formatted value next to the label. Defaults to true. Hidden while indeterminate. */
  showValue?: boolean;
  variant?: ProgressVariant;
  size?: ProgressSize;
  labelProps?: BaseUI.ProgressLabelProps;
  valueProps?: BaseUI.ProgressValueProps;
  trackProps?: BaseUI.ProgressTrackProps;
  indicatorProps?: BaseUI.ProgressIndicatorProps;
}

export function Progress(props: ProgressProps) {
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
    <BaseUI.Progress.Root
      {...mergeProps(restProps, {
        className: tw("grid w-48 grid-cols-2 gap-y-1.5"),
      })}
    >
      {label && (
        <BaseUI.Progress.Label
          {...mergeProps(labelProps, {
            className: tw("text-foreground col-start-1 text-sm font-medium"),
          })}
        >
          {label}
        </BaseUI.Progress.Label>
      )}
      {showValue && restProps.value != null && (
        <BaseUI.Progress.Value
          {...mergeProps(valueProps, {
            className: tw("text-muted-fg col-start-2 text-right text-sm"),
          })}
        />
      )}
      <BaseUI.Progress.Track
        {...mergeProps(trackProps, {
          className: progressTrackStyles({ size }),
        })}
      >
        <BaseUI.Progress.Indicator
          {...mergeProps(indicatorProps, {
            className: progressIndicatorStyles({ variant }),
          })}
        />
      </BaseUI.Progress.Track>
    </BaseUI.Progress.Root>
  );
}

const baseTrackStyles = tw(
  "bg-track relative col-span-2 block overflow-hidden rounded-full",
);

const trackSizeStyles = {
  sm: tw("h-1.5"),
  md: tw("h-2"),
  lg: tw("h-3"),
};

export const progressTrackStyles = ({
  size = "md",
  extend,
}: {
  size?: ProgressSize;
  extend?: string;
}) => cn(baseTrackStyles, trackSizeStyles[size], extend);

const baseIndicatorStyles = tw(
  "data-indeterminate:animate-progress-indeterminate block h-full rounded-full transition-[width] duration-500 data-indeterminate:w-1/3 motion-reduce:data-indeterminate:w-full motion-reduce:data-indeterminate:animate-pulse",
);

const indicatorVariantStyles = {
  primary: tw("bg-primary"),
  muted: tw("bg-muted-fg"),
  danger: tw("bg-danger"),
  success: tw("bg-success"),
  warning: tw("bg-warning"),
};

export const progressIndicatorStyles = ({
  variant = "primary",
  extend,
}: {
  variant?: ProgressVariant;
  extend?: string;
}) => cn(baseIndicatorStyles, indicatorVariantStyles[variant], extend);

export type ProgressSize = keyof typeof trackSizeStyles;
export type ProgressVariant = keyof typeof indicatorVariantStyles;
