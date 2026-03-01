import {
  Field as BaseField,
  FieldRootProps as BaseFieldRootProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldLabelProps,
} from "@base-ui/react/field";
import React from "react";
import { BasicFieldProps, cn } from "../../lib/utils";

export interface FieldProps extends BaseFieldRootProps, BasicFieldProps {
  labelProps?: FieldLabelProps;
  errorMessageProps?: FieldErrorProps;
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
  errorMessageProps: {
    className: errorMessageClassName,
    ...errorMessageProps
  } = {},
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
    <FieldContext.Provider value={{ isValidating: !!isValidating }}>
      <BaseField.Root
        className={cn("flex flex-col gap-1", className)}
        invalid={invalid}
        data-validating={isValidating ? "" : undefined}
        {...props}
      >
        {label && (
          <BaseField.Label
            className={cn(
              "text-foreground text-sm font-semibold",
              labelClassName,
            )}
            {...labelProps}
          >
            {label}
          </BaseField.Label>
        )}
        {children}
        <BaseField.Error
          className={cn("text-error-foreground text-sm", errorMessageClassName)}
          match={invalid}
          {...errorMessageProps}
        >
          {errorMessage}
        </BaseField.Error>
        {isValidating && isValidatingMessage && !errorMessage && (
          <BaseField.Description
            className={cn(
              "text-primary-foreground animate-validating-message text-sm",
              isValidatingMessageClassName,
            )}
            {...isValidatingMessageProps}
          >
            {isValidatingMessage}
          </BaseField.Description>
        )}
        {description && (
          <BaseField.Description
            className={cn(
              "text-muted-foreground text-sm",
              descriptionClassName,
            )}
            {...descriptionProps}
          >
            {description}
          </BaseField.Description>
        )}
      </BaseField.Root>
    </FieldContext.Provider>
  );
}

export const FieldContext = React.createContext({
  isValidating: false,
});

export function useFieldContext() {
  return React.useContext(FieldContext);
}
