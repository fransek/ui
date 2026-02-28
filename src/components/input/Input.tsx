import {
  Input as BaseInput,
  InputProps as BaseInputProps,
} from "@base-ui/react/input";
import React from "react";
import { BasicFieldProps, cn } from "../../lib/utils";
import { Field, FieldProps } from "../field/Field";

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
          "data-invalid:not-focus:border-error-foreground data-validating:not-data-invalid:animate-validating focus:border-highlight placeholder:text-muted-foreground w-full min-w-40 rounded-lg border p-2 transition-colors outline-none",
          className,
        )}
        data-validating={isValidating ? "" : undefined}
        {...props}
      />
    </Field>
  );
}
