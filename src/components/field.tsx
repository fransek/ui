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
import { mergeProps, tw } from "../lib/utils";
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
    isValidatingMessageProps,
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
            {...mergeProps(isValidatingMessageProps, {
              className: tw(
                "text-primary-fg animate-validating-message text-sm",
              ),
            })}
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

/** Base classes shared by text-like field controls (`Input`, `Textarea`). */
export const fieldControlStyles =
  "bg-field data-invalid:border-danger-fg data-validating:not-data-invalid:animate-validating outline-highlight focus-visible:focus-outline placeholder:text-muted-fg w-full min-w-40 rounded-lg border p-2 shadow transition-colors";

export type FieldDescriptionProps = BaseUIFieldDescriptionProps;

export function FieldDescription(props: BaseUIFieldDescriptionProps) {
  return (
    <BaseUIField.Description
      {...mergeProps(props, { className: tw("text-muted-fg text-sm") })}
    />
  );
}

export type FieldErrorProps = BaseUIFieldErrorProps;

export function FieldError(props: BaseUIFieldErrorProps) {
  return (
    <BaseUIField.Error
      {...mergeProps(props, { className: tw("text-danger-fg text-sm") })}
    />
  );
}

export type FieldItemProps = BaseUIFieldItemProps;

export const FieldItem = BaseUIField.Item;

export type FieldLabelProps = BaseUIFieldLabelProps;

export function FieldLabel(props: BaseUIFieldLabelProps) {
  return (
    <BaseUIField.Label
      {...mergeProps(props, {
        className: tw("text-foreground text-sm font-semibold"),
      })}
    />
  );
}

export type FieldRootProps = BaseUIFieldRootProps;

export function FieldRoot(props: BaseUIFieldRootProps) {
  return (
    <BaseUIField.Root
      {...mergeProps(props, { className: tw("flex flex-col gap-1") })}
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
