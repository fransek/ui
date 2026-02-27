"use client";

import {
  Field as BaseField,
  FieldRootProps as BaseFieldRootProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldLabelProps,
} from "@base-ui/react/field";
import React from "react";
import { cn } from "../../lib/utils";

export interface BasicFieldProps {
  label?: React.ReactNode;
  errorMessage?: React.ReactNode;
  isValidating?: boolean;
  isValidatingMessage?: React.ReactNode;
  description?: React.ReactNode;
}

export interface FieldProps extends BaseFieldRootProps, BasicFieldProps {
  labelProps?: FieldLabelProps;
  errorProps?: FieldErrorProps;
  descriptionProps?: FieldDescriptionProps;
  isValidatingMessageProps?: FieldDescriptionProps;
}

export function Field({
  label,
  isValidating,
  isValidatingMessage,
  errorMessage,
  className,
  description,
  children,
  labelProps: { className: labelClassName, ...labelProps } = {},
  errorProps: { className: errorClassName, ...errorProps } = {},
  descriptionProps: {
    className: descriptionClassName,
    ...descriptionProps
  } = {},
  isValidatingMessageProps: {
    className: isValidatingMessageClassName,
    ...isValidatingMessageProps
  } = {},
  ...props
}: FieldProps) {
  const invalid = !!errorMessage;

  return (
    <BaseField.Root
      className={cn("flex flex-col gap-1", className)}
      invalid={invalid}
      {...props}
    >
      <BaseField.Label
        className={cn("text-foreground text-sm font-semibold", labelClassName)}
        {...labelProps}
      >
        {label}
      </BaseField.Label>
      {children}
      <BaseField.Error
        className={cn("text-error-foreground text-sm", errorClassName)}
        match={invalid}
        {...errorProps}
      >
        {errorMessage}
      </BaseField.Error>
      {isValidating && isValidatingMessage && !errorMessage && (
        <BaseField.Description
          className={cn(
            "text-primary-foreground text-sm",
            isValidatingMessageClassName,
          )}
          {...isValidatingMessageProps}
        >
          {isValidatingMessage}
        </BaseField.Description>
      )}
      {description && (
        <BaseField.Description
          className={cn("text-muted-foreground text-sm", descriptionClassName)}
          {...descriptionProps}
        >
          {description}
        </BaseField.Description>
      )}
    </BaseField.Root>
  );
}
