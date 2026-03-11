import {
  Input as BaseInput,
  InputProps as BaseInputProps,
} from "@base-ui/react/input";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cnBaseUI } from "../lib/utils";
import { Field, FieldProps } from "./field";

export interface InputProps extends BaseInputProps, FieldAttributes {
  fieldProps?: FieldProps;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export function Input(props: InputProps) {
  const {
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    className,
    description,
    infoPopover,
    fieldProps,
    leftAdornment,
    rightAdornment,
    leftSlot,
    rightSlot,
    invalid,
    ...restProps
  } = props;

  const hasLeftAdornment = leftAdornment != null;
  const hasRightAdornment = rightAdornment != null;

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
      <div className="flex items-stretch gap-2">
        {leftSlot}
        <div className="relative w-full">
          {leftAdornment && (
            <span className="text-muted-foreground absolute inset-y-0 left-0 z-10 flex items-center pl-2">
              {leftAdornment}
            </span>
          )}
          <BaseInput
            className={cnBaseUI(
              "data-invalid:border-error-foreground data-validating:not-data-invalid:animate-validating outline-highlight focus-visible:focus-outline placeholder:text-muted-foreground w-full min-w-40 rounded-lg border p-2 transition-colors",
              hasLeftAdornment && "pl-10",
              hasRightAdornment && "pr-10",
              className,
            )}
            data-validating={isValidating ? "" : undefined}
            {...restProps}
          />
          {rightAdornment && (
            <span className="text-muted-foreground absolute inset-y-0 right-0 z-10 flex items-center pr-2">
              {rightAdornment}
            </span>
          )}
        </div>
        {rightSlot}
      </div>
    </Field>
  );
}
