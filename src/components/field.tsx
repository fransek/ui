import {
  Field as BaseField,
  FieldControlProps as BaseFieldControlProps,
  FieldDescriptionProps as BaseFieldDescriptionProps,
  FieldErrorProps as BaseFieldErrorProps,
  FieldItemProps as BaseFieldItemProps,
  FieldLabelProps as BaseFieldLabelProps,
  FieldRootProps as BaseFieldRootProps,
  FieldValidityProps as BaseFieldValidityProps,
} from "@base-ui/react/field";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cn } from "../lib/utils";

export interface FieldProps extends BaseFieldRootProps, FieldAttributes {
  labelProps?: BaseFieldLabelProps;
  errorMessageProps?: BaseFieldErrorProps;
  descriptionProps?: BaseFieldDescriptionProps;
  isValidatingMessageProps?: BaseFieldDescriptionProps;
}

export function Field({
  label,
  isValidating,
  isValidatingMessage,
  errorMessage,
  description,
  children,
  labelProps,
  errorMessageProps,
  descriptionProps,
  isValidatingMessageProps: {
    className: isValidatingMessageClassName,
    ...isValidatingMessageProps
  } = {},
  ...props
}: FieldProps) {
  const invalid = !!errorMessage;

  return (
    <FieldContext.Provider value={{ isValidating: !!isValidating }}>
      <FieldRoot
        invalid={invalid}
        data-validating={isValidating ? "" : undefined}
        {...props}
      >
        {label && <FieldLabel {...labelProps}>{label}</FieldLabel>}
        {children}
        <FieldError match={invalid} {...errorMessageProps}>
          {errorMessage}
        </FieldError>
        {isValidating && isValidatingMessage && !errorMessage && (
          <FieldDescription
            className={cn(
              "text-primary-foreground animate-validating-message",
              isValidatingMessageClassName,
            )}
            {...isValidatingMessageProps}
          >
            {isValidatingMessage}
          </FieldDescription>
        )}
        {description && (
          <FieldDescription {...descriptionProps}>
            {description}
          </FieldDescription>
        )}
      </FieldRoot>
    </FieldContext.Provider>
  );
}

export type FieldControlProps = BaseFieldControlProps;

export const FieldControl = BaseField.Control;

export type FieldDescriptionProps = BaseFieldDescriptionProps;

export function FieldDescription({
  className,
  ...props
}: BaseFieldDescriptionProps) {
  return (
    <BaseField.Description
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export type FieldErrorProps = BaseFieldErrorProps;

export function FieldError({ className, ...props }: BaseFieldErrorProps) {
  return (
    <BaseField.Error
      className={cn("text-error-foreground text-sm", className)}
      {...props}
    />
  );
}

export type FieldItemProps = BaseFieldItemProps;

export const FieldItem = BaseField.Item;

export type FieldLabelProps = BaseFieldLabelProps;

export function FieldLabel({ className, ...props }: BaseFieldLabelProps) {
  return (
    <BaseField.Label
      className={cn("text-foreground text-sm font-semibold", className)}
      {...props}
    />
  );
}

export type FieldRootProps = BaseFieldRootProps;

export function FieldRoot({ className, ...props }: BaseFieldRootProps) {
  return (
    <BaseField.Root
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

export type FieldValidityProps = BaseFieldValidityProps;

export const FieldValidity = BaseField.Validity;

export const FieldContext = React.createContext({
  isValidating: false,
});

export function useFieldContext() {
  return React.useContext(FieldContext);
}
