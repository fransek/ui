import * as BaseUI from "@base-ui/react/field";
import React from "react";
import { FieldAttributes } from "../../lib/types";
import { mergeProps, tw } from "../../lib/utils";
import { InfoPopover } from "../info-popover";

export interface FieldProps extends BaseUI.FieldRootProps, FieldAttributes {
  labelProps?: BaseUI.FieldLabelProps;
  errorMessageProps?: BaseUI.FieldErrorProps;
  descriptionProps?: BaseUI.FieldDescriptionProps;
  isValidatingMessageProps?: BaseUI.FieldDescriptionProps;
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

export type FieldControlProps = BaseUI.FieldControlProps;

export const FieldControl = BaseUI.Field.Control;

/** Base classes shared by text-like field controls (`Input`, `Textarea`). */
export const fieldControlStyles =
  "bg-field data-invalid:border-danger-fg data-validating:not-data-invalid:animate-validating outline-highlight focus-visible:focus-outline placeholder:text-muted-fg w-full min-w-40 rounded-lg border p-2 shadow transition-colors";

export type FieldDescriptionProps = BaseUI.FieldDescriptionProps;

export function FieldDescription(props: BaseUI.FieldDescriptionProps) {
  return (
    <BaseUI.Field.Description
      {...mergeProps(props, { className: tw("text-muted-fg text-sm") })}
    />
  );
}

export type FieldErrorProps = BaseUI.FieldErrorProps;

export function FieldError(props: BaseUI.FieldErrorProps) {
  return (
    <BaseUI.Field.Error
      {...mergeProps(props, { className: tw("text-danger-fg text-sm") })}
    />
  );
}

export type FieldItemProps = BaseUI.FieldItemProps;

export const FieldItem = BaseUI.Field.Item;

export type FieldLabelProps = BaseUI.FieldLabelProps;

export function FieldLabel(props: BaseUI.FieldLabelProps) {
  return (
    <BaseUI.Field.Label
      {...mergeProps(props, {
        className: tw("text-foreground text-sm font-semibold"),
      })}
    />
  );
}

export type FieldRootProps = BaseUI.FieldRootProps;

export function FieldRoot(props: BaseUI.FieldRootProps) {
  return (
    <BaseUI.Field.Root
      {...mergeProps(props, { className: tw("flex flex-col gap-1") })}
    />
  );
}

export type FieldValidityProps = BaseUI.FieldValidityProps;

export const FieldValidity = BaseUI.Field.Validity;

export const FieldContext = React.createContext({
  isValidating: false,
});

export function useFieldContext() {
  return React.useContext(FieldContext);
}

Field.Root = FieldRoot;
Field.Label = FieldLabel;
Field.Control = FieldControl;
Field.Description = FieldDescription;
Field.Error = FieldError;
Field.Item = FieldItem;
Field.Validity = FieldValidity;
