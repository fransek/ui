"use client";

import {
  Input as BaseInput,
  InputProps as BaseInputProps,
} from "@base-ui/react/input";
import React from "react";
import { cn } from "../../lib/utils";
import { BasicFieldProps, Field, FieldProps } from "../field/Field";

export interface InputProps extends BaseInputProps, BasicFieldProps {
  fieldProps?: FieldProps;
}

export function Input({
  label,
  isValidating,
  isValidatingMessage,
  errorMessage,
  className,
  description,
  fieldProps,
  ...props
}: InputProps) {
  const invalid = !!errorMessage;

  return (
    <Field
      label={label}
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      {...fieldProps}
    >
      <BaseInput
        className={cn(
          "fransek-ui focus:border-foreground placeholder:text-muted-foreground w-full rounded-lg border p-2 transition-colors outline-none",
          {
            "animate-validating": isValidating,
            "border-error-foreground": invalid,
          },
          className,
        )}
        data-validating={isValidating || undefined}
        {...props}
      />
    </Field>
  );
}
