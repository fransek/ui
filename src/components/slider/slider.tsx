import * as BaseUI from "@base-ui/react/slider";
import React from "react";
import { FieldAttributes } from "../../lib/types";
import { mergeProps, tw } from "../../lib/utils";
import { Field, FieldLabel, FieldLabelProps, FieldProps } from "../field";
import { InfoPopover } from "../info-popover";

export interface SliderProps extends BaseUI.SliderRootProps, FieldAttributes {
  /** Whether to display the formatted value next to the label. Defaults to true. */
  showValue?: boolean;
  fieldProps?: FieldProps;
  labelProps?: FieldLabelProps;
  valueProps?: BaseUI.SliderValueProps;
  controlProps?: BaseUI.SliderControlProps;
  trackProps?: BaseUI.SliderTrackProps;
  indicatorProps?: BaseUI.SliderIndicatorProps;
  /** Applied to every thumb. Use `getAriaLabel` to name the thumbs of a range slider. */
  thumbProps?: BaseUI.SliderThumbProps;
}

export function Slider(props: SliderProps) {
  const {
    label,
    showValue = true,
    fieldProps,
    description,
    isValidating,
    isValidatingMessage,
    errorMessage,
    invalid,
    infoPopover,
    labelProps,
    valueProps,
    controlProps,
    trackProps,
    indicatorProps,
    thumbProps,
    ...restProps
  } = props;

  const currentValue = restProps.value ?? restProps.defaultValue;
  const thumbCount = Array.isArray(currentValue) ? currentValue.length : 1;

  return (
    <Field
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      invalid={invalid}
      {...fieldProps}
    >
      <BaseUI.Slider.Root
        {...mergeProps(restProps, {
          className: tw(
            "flex w-full min-w-50 flex-col gap-1 data-disabled:cursor-not-allowed data-disabled:opacity-60 data-[orientation=vertical]:w-fit data-[orientation=vertical]:min-w-0",
          ),
        })}
      >
        {(label || showValue) && (
          <div className="flex items-center gap-2">
            {label && <FieldLabel {...labelProps}>{label}</FieldLabel>}
            {label && infoPopover && (
              <InfoPopover fieldLabel={label}>{infoPopover}</InfoPopover>
            )}
            {showValue && (
              <BaseUI.Slider.Value
                {...mergeProps(valueProps, {
                  className: tw("body-sm ml-auto text-end tabular-nums"),
                })}
              />
            )}
          </div>
        )}
        <BaseUI.Slider.Control
          {...mergeProps(controlProps, {
            className: tw(
              "flex touch-none items-center py-2 select-none data-[orientation=vertical]:h-48 data-[orientation=vertical]:justify-center",
            ),
          })}
        >
          <BaseUI.Slider.Track
            data-validating={isValidating ? "" : undefined}
            {...mergeProps(trackProps, {
              className: tw(
                "bg-muted/40 data-validating:not-data-invalid:animate-validating h-3 w-full rounded-full select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3",
              ),
            })}
          >
            <BaseUI.Slider.Indicator
              {...mergeProps(indicatorProps, {
                className: tw(
                  "bg-primary data-invalid:bg-danger rounded-full select-none",
                ),
              })}
            />
            {Array.from({ length: thumbCount }, (_, index) => (
              <BaseUI.Slider.Thumb
                key={index}
                index={index}
                {...mergeProps(thumbProps, {
                  className: tw(
                    "bg-field border-muted-fg dark:bg-foreground has-focus-visible:focus-outline outline-highlight data-invalid:border-danger-fg size-4 rounded-full border shadow select-none dark:border-none",
                  ),
                })}
              />
            ))}
          </BaseUI.Slider.Track>
        </BaseUI.Slider.Control>
      </BaseUI.Slider.Root>
    </Field>
  );
}
