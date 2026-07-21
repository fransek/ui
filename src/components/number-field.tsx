import {
  NumberField as BaseUINumberField,
  NumberFieldRootProps as BaseUINumberFieldRootProps,
} from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { mergeProps, tw } from "../lib/utils";
import { Field, FieldProps } from "./field";

export interface NumberFieldProps
  extends BaseUINumberFieldRootProps, FieldAttributes {
  fieldProps?: FieldProps;
  inputProps?: BaseUINumberField.Input.Props;
  decrementProps?: BaseUINumberField.Decrement.Props;
  incrementProps?: BaseUINumberField.Increment.Props;
}

export function NumberField(props: NumberFieldProps) {
  const {
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    description,
    infoPopover,
    fieldProps,
    inputProps,
    decrementProps,
    incrementProps,
    invalid,
    disabled,
    ...restProps
  } = props;

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
      <BaseUINumberField.Root
        disabled={disabled}
        {...mergeProps(restProps, { className: tw("w-full min-w-40") })}
      >
        <BaseUINumberField.Group
          className="data-invalid:border-danger-fg data-validating:not-data-invalid:animate-validating has-[input:focus-visible]:focus-outline outline-highlight flex items-stretch overflow-hidden rounded-lg border shadow transition-colors data-disabled:cursor-not-allowed data-disabled:opacity-60"
          data-validating={isValidating ? "" : undefined}
        >
          <BaseUINumberField.Decrement
            {...mergeProps(decrementProps, {
              className: tw(
                "text-foreground hover:bg-muted/10 active:bg-muted/20 data-disabled:text-muted-fg flex items-center justify-center border-r px-2.5 transition-colors select-none data-disabled:pointer-events-none",
              ),
            })}
          >
            <Minus className="size-4" />
          </BaseUINumberField.Decrement>
          <BaseUINumberField.Input
            {...mergeProps(inputProps, {
              className: tw(
                "bg-field placeholder:text-muted-fg w-full min-w-0 p-2 text-center tabular-nums outline-none",
              ),
            })}
          />
          <BaseUINumberField.Increment
            {...mergeProps(incrementProps, {
              className: tw(
                "text-foreground hover:bg-muted/10 active:bg-muted/20 data-disabled:text-muted-fg flex items-center justify-center border-l px-2.5 transition-colors select-none data-disabled:pointer-events-none",
              ),
            })}
          >
            <Plus className="size-4" />
          </BaseUINumberField.Increment>
        </BaseUINumberField.Group>
      </BaseUINumberField.Root>
    </Field>
  );
}
