import {
  Field as BaseUIField,
  FieldControlProps as BaseUIFieldControlProps,
  FieldDescriptionProps as BaseUIFieldDescriptionProps,
  FieldErrorProps as BaseUIFieldErrorProps,
  FieldItemProps as BaseUIFieldItemProps,
  FieldLabelProps as BaseUIFieldLabelProps,
  FieldRootProps as BaseUIFieldRootProps,
  FieldValidityProps as BaseUIFieldValidityProps,
} from "@base-ui/react/field";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cnBaseUI } from "../lib/utils";
import { InfoPopover } from "./info-popover";

export interface FieldProps extends BaseUIFieldRootProps, FieldAttributes {
  labelProps?: BaseUIFieldLabelProps;
  errorMessageProps?: BaseUIFieldErrorProps;
  descriptionProps?: BaseUIFieldDescriptionProps;
  isValidatingMessageProps?: BaseUIFieldDescriptionProps;
}

export function Field(props: FieldProps) {
  const {
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    invalid = !!errorMessage,
    description,
    children,
    labelProps,
    errorMessageProps,
    descriptionProps,
    infoPopover,
    isValidatingMessageProps: {
      className: isValidatingMessageClassName,
      ...isValidatingMessageProps
    } = {},
    ...restProps
  } = props;

  return (
    <FieldContext.Provider value={{ isValidating: !!isValidating }}>
      <FieldRoot
        invalid={invalid}
        data-validating={isValidating ? "" : undefined}
        {...restProps}
      >
        {label && (
          <div className="flex items-center gap-2">
            <FieldLabel {...labelProps}>{label}</FieldLabel>
            {infoPopover && (
              <InfoPopover fieldLabel={label}>{infoPopover}</InfoPopover>
            )}
          </div>
        )}
        {children}
        <FieldError match={invalid} {...errorMessageProps}>
          {errorMessage}
        </FieldError>
        {isValidating && isValidatingMessage && !errorMessage && (
          <FieldDescription
            className={cnBaseUI(
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

export type FieldControlProps = BaseUIFieldControlProps;

export const FieldControl = BaseUIField.Control;

export type FieldDescriptionProps = BaseUIFieldDescriptionProps;

export function FieldDescription(props: BaseUIFieldDescriptionProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUIField.Description
      className={cnBaseUI("text-muted-foreground text-sm", className)}
      {...restProps}
    />
  );
}

export type FieldErrorProps = BaseUIFieldErrorProps;

export function FieldError(props: BaseUIFieldErrorProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUIField.Error
      className={cnBaseUI("text-error-foreground contents text-sm", className)}
      {...restProps}
    />
  );
}

export type FieldItemProps = BaseUIFieldItemProps;

export const FieldItem = BaseUIField.Item;

export type FieldLabelProps = BaseUIFieldLabelProps;

export function FieldLabel(props: BaseUIFieldLabelProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUIField.Label
      className={cnBaseUI("text-foreground text-sm font-semibold", className)}
      {...restProps}
    />
  );
}

export type FieldRootProps = BaseUIFieldRootProps;

export function FieldRoot(props: BaseUIFieldRootProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUIField.Root
      className={cnBaseUI("flex flex-col gap-1", className)}
      {...restProps}
    />
  );
}

export type FieldValidityProps = BaseUIFieldValidityProps;

export const FieldValidity = BaseUIField.Validity;

export const FieldContext = React.createContext({
  isValidating: false,
});

export function useFieldContext() {
  return React.useContext(FieldContext);
}
