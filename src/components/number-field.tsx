import {
  NumberField as BaseUINumberField,
  NumberFieldRootProps as BaseUINumberFieldRootProps,
} from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cnBaseUI } from "../lib/utils";
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
    className,
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
        className={cnBaseUI("w-full min-w-40", className)}
        disabled={disabled}
        {...restProps}
      >
        <BaseUINumberField.Group
          className={cnBaseUI(
            "data-invalid:border-error-foreground data-validating:not-data-invalid:animate-validating has-[input:focus-visible]:focus-outline outline-highlight flex items-stretch overflow-hidden rounded-lg border shadow transition-colors data-disabled:cursor-not-allowed data-disabled:opacity-60",
          )}
          data-validating={isValidating ? "" : undefined}
        >
          <BaseUINumberField.Decrement
            className={cnBaseUI(
              "text-foreground hover:bg-muted/10 active:bg-muted/20 data-disabled:text-muted-foreground flex items-center justify-center border-r px-2.5 transition-colors select-none data-disabled:pointer-events-none",
              decrementProps?.className,
            )}
            {...decrementProps}
          >
            <Minus className="size-4" />
          </BaseUINumberField.Decrement>
          <BaseUINumberField.Input
            className={cnBaseUI(
              "bg-field placeholder:text-muted-foreground w-full min-w-0 p-2 text-center tabular-nums outline-none",
              inputProps?.className,
            )}
            {...inputProps}
          />
          <BaseUINumberField.Increment
            className={cnBaseUI(
              "text-foreground hover:bg-muted/10 active:bg-muted/20 data-disabled:text-muted-foreground flex items-center justify-center border-l px-2.5 transition-colors select-none data-disabled:pointer-events-none",
              incrementProps?.className,
            )}
            {...incrementProps}
          >
            <Plus className="size-4" />
          </BaseUINumberField.Increment>
        </BaseUINumberField.Group>
      </BaseUINumberField.Root>
    </Field>
  );
}
