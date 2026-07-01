import {
  NumberField as BaseUINumberField,
  NumberFieldDecrementProps,
  NumberFieldGroupProps,
  NumberFieldIncrementProps,
  NumberFieldInputProps,
  NumberFieldRootProps,
} from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cn, cnBaseUI } from "../lib/utils";
import { Field, FieldProps } from "./field";

export interface NumberFieldProps
  extends NumberFieldRootProps, FieldAttributes {
  fieldProps?: FieldProps;
  groupProps?: NumberFieldGroupProps;
  inputProps?: NumberFieldInputProps;
  incrementProps?: NumberFieldIncrementProps;
  decrementProps?: NumberFieldDecrementProps;
  incrementIcon?: React.ReactNode;
  decrementIcon?: React.ReactNode;
}

const stepButtonClassName =
  "text-muted-foreground hover:bg-muted/10 active:bg-muted/20 flex items-center justify-center px-2 transition-colors data-disabled:cursor-not-allowed data-disabled:opacity-60";

export function NumberField(props: NumberFieldProps) {
  const {
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    description,
    infoPopover,
    invalid,
    fieldProps,
    groupProps: { className: groupClassName, ...groupProps } = {},
    inputProps: { className: inputClassName, ...inputProps } = {},
    incrementProps: { className: incrementClassName, ...incrementProps } = {},
    decrementProps: { className: decrementClassName, ...decrementProps } = {},
    incrementIcon = <Plus className="size-3.5" />,
    decrementIcon = <Minus className="size-3.5" />,
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
      <BaseUINumberField.Root disabled={disabled} {...restProps}>
        <BaseUINumberField.Group
          className={cn(
            "data-invalid:border-error-foreground data-validating:not-data-invalid:animate-validating outline-highlight focus-within:focus-outline flex min-w-40 overflow-hidden rounded-lg border transition-colors",
            groupClassName,
          )}
          data-validating={isValidating ? "" : undefined}
          {...groupProps}
        >
          <BaseUINumberField.Decrement
            className={cnBaseUI<{ disabled: boolean }>(
              stepButtonClassName,
              decrementClassName,
            )}
            {...decrementProps}
          >
            {decrementIcon}
          </BaseUINumberField.Decrement>
          <BaseUINumberField.Input
            className={cnBaseUI(
              "placeholder:text-muted-foreground w-full grow border-x px-2 py-2 text-center outline-none",
              inputClassName,
            )}
            {...inputProps}
          />
          <BaseUINumberField.Increment
            className={cnBaseUI<{ disabled: boolean }>(
              stepButtonClassName,
              incrementClassName,
            )}
            {...incrementProps}
          >
            {incrementIcon}
          </BaseUINumberField.Increment>
        </BaseUINumberField.Group>
      </BaseUINumberField.Root>
    </Field>
  );
}
