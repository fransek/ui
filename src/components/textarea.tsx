import React from "react";
import { FieldAttributes } from "../lib/types";
import { cnBaseUI } from "../lib/utils";
import {
  Field,
  FieldControl,
  FieldControlProps,
  fieldControlStyles,
  FieldProps,
} from "./field";

type TextareaFieldControlProps = FieldControlProps &
  React.ComponentPropsWithRef<"textarea">;

export interface TextareaProps
  extends TextareaFieldControlProps, FieldAttributes {
  fieldProps?: FieldProps;
}

export function Textarea(props: TextareaProps) {
  const {
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    className,
    description,
    infoPopover,
    fieldProps,
    invalid,
    ...restProps
  } = props;

  return (
    <Field
      label={label}
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      infoPopover={infoPopover}
      invalid={invalid}
      {...fieldProps}
    >
      <FieldControl
        className={cnBaseUI(fieldControlStyles, className)}
        render={<textarea />}
        data-validating={isValidating ? "" : undefined}
        {...restProps}
      />
    </Field>
  );
}
