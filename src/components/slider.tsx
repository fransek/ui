import { Slider as BaseUISlider } from "@base-ui/react/slider";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cnBaseUI } from "../lib/utils";
import { Field, FieldProps } from "./field";

export interface SliderProps extends BaseUISlider.Root.Props, FieldAttributes {
  /** Whether to display the formatted value next to the label. Defaults to false. */
  showValue?: boolean;
  /** Whether to display a floating value label above each thumb while interacting. Defaults to false. */
  thumbLabel?: boolean;
  fieldProps?: FieldProps;
  controlProps?: BaseUISlider.Control.Props;
  trackProps?: BaseUISlider.Track.Props;
  indicatorProps?: BaseUISlider.Indicator.Props;
  thumbProps?: BaseUISlider.Thumb.Props;
  valueProps?: BaseUISlider.Value.Props;
}

export function Slider(props: SliderProps) {
  const {
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    description,
    infoPopover,
    invalid,
    className,
    disabled,
    showValue = false,
    thumbLabel = false,
    fieldProps,
    controlProps: { className: controlClassName, ...controlProps } = {},
    trackProps: { className: trackClassName, ...trackProps } = {},
    indicatorProps: { className: indicatorClassName, ...indicatorProps } = {},
    thumbProps: { className: thumbClassName, ...thumbProps } = {},
    valueProps: { className: valueClassName, ...valueProps } = {},
    ...restProps
  } = props;

  const value = restProps.value ?? restProps.defaultValue;
  const thumbCount = Array.isArray(value) ? Math.max(value.length, 1) : 1;

  return (
    <Field
      label={label}
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      infoPopover={infoPopover}
      invalid={invalid}
      {...fieldProps}
    >
      <BaseUISlider.Root
        className={cnBaseUI("flex w-full min-w-40 flex-col gap-1", className)}
        disabled={disabled}
        data-validating={isValidating ? "" : undefined}
        {...restProps}
      >
        {showValue && (
          <BaseUISlider.Value
            className={cnBaseUI(
              "text-muted-fg self-end text-sm tabular-nums",
              valueClassName,
            )}
            {...valueProps}
          />
        )}
        <BaseUISlider.Control
          className={cnBaseUI(
            "flex w-full touch-none items-center py-2 select-none data-disabled:cursor-not-allowed data-disabled:opacity-60",
            controlClassName,
          )}
          {...controlProps}
        >
          <BaseUISlider.Track
            className={cnBaseUI(
              "bg-muted/40 h-1.5 w-full rounded-full select-none",
              trackClassName,
            )}
            {...trackProps}
          >
            <BaseUISlider.Indicator
              className={cnBaseUI(
                "bg-primary data-invalid:bg-danger rounded-full select-none",
                indicatorClassName,
              )}
              {...indicatorProps}
            />
            {Array.from({ length: thumbCount }, (_, index) => (
              <BaseUISlider.Thumb
                key={index}
                index={index}
                className={cnBaseUI(
                  "group bg-background border-primary outline-highlight data-invalid:border-danger-fg has-[:focus-visible]:focus-outline relative size-4 rounded-full border-2 shadow select-none data-dragging:cursor-grabbing",
                  thumbClassName,
                )}
                {...thumbProps}
              >
                {thumbLabel && (
                  <BaseUISlider.Value className="bg-foreground text-background pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded px-1.5 py-0.5 text-xs tabular-nums opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 group-data-dragging:opacity-100">
                    {(formattedValues) => formattedValues[index]}
                  </BaseUISlider.Value>
                )}
              </BaseUISlider.Thumb>
            ))}
          </BaseUISlider.Track>
        </BaseUISlider.Control>
      </BaseUISlider.Root>
    </Field>
  );
}
