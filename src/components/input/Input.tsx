import {
  Input as BaseInput,
  InputProps as BaseInputProps,
} from "@base-ui/react/input";
import React from "react";
import { FieldAttributes } from "../../lib/types";
import { cn } from "../../lib/utils";
import { Field, FieldProps } from "../field/Field";

export interface InputProps extends BaseInputProps, FieldAttributes {
  fieldProps?: FieldProps;
  button?: React.ReactNode;
}

export function Input({
  label,
  isValidating,
  isValidatingMessage,
  errorMessage,
  className,
  description,
  fieldProps,
  button,
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
      <div className="flex items-stretch gap-2">
        <BaseInput
          className={cn(
            "data-invalid:not-focus:border-error-foreground data-validating:not-data-invalid:animate-validating focus:border-highlight placeholder:text-muted-foreground focus:inset-shadow-muted/50 w-full min-w-40 rounded-lg border p-2 transition-colors outline-none focus:inset-shadow-sm",
            className,
          )}
          data-validating={isValidating ? "" : undefined}
          {...props}
        />
        {button}
      </div>
    </Field>
  );
}
