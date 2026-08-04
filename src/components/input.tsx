import {
  Input as BaseUIInput,
  InputProps as BaseUIInputProps,
} from "@base-ui/react/input";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cn, mergeProps } from "../lib/utils";
import { Field, fieldControlStyles, FieldProps } from "./field";

export interface InputProps extends BaseUIInputProps, FieldAttributes {
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
            <span className="text-muted-fg absolute inset-y-0 left-0 z-10 flex items-center pl-2">
              {leftAdornment}
            </span>
          )}
          <BaseUIInput
            data-validating={isValidating ? "" : undefined}
            {...mergeProps(restProps, {
              className: cn(
                fieldControlStyles,
                hasLeftAdornment && "pl-10",
                hasRightAdornment && "pr-10",
              ),
            })}
          />
          {rightAdornment && (
            <span className="text-muted-fg absolute inset-y-0 right-0 z-10 flex items-center pr-2">
              {rightAdornment}
            </span>
          )}
        </div>
        {rightSlot}
      </div>
    </Field>
  );
}
