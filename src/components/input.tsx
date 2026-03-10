import {
  Input as BaseInput,
  InputProps as BaseInputProps,
} from "@base-ui/react/input";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cn } from "../lib/utils";
import { Field, FieldProps } from "./field";

export interface InputProps extends BaseInputProps, FieldAttributes {
  fieldProps?: FieldProps;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  /** @deprecated Use leftAdornment instead. */
  leftSlot?: React.ReactNode;
  /** @deprecated Use rightAdornment instead. */
  rightSlot?: React.ReactNode;
}

export function Input({
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
  ...props
}: InputProps) {
  const resolvedLeftAdornment = leftAdornment ?? leftSlot;
  const resolvedRightAdornment = rightAdornment ?? rightSlot;

  return (
    <Field
      label={label}
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      infoPopover={infoPopover}
      {...fieldProps}
    >
      <div className="flex items-stretch gap-2">
        {resolvedLeftAdornment}
        <BaseInput
          className={cn(
            "data-invalid:border-error-foreground data-validating:not-data-invalid:animate-validating outline-highlight focus-visible:focus-outline placeholder:text-muted-foreground w-full min-w-40 rounded-lg border p-2 transition-colors",
            className,
          )}
          data-validating={isValidating ? "" : undefined}
          {...props}
        />
        {resolvedRightAdornment}
      </div>
    </Field>
  );
}
