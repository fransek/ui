import React from "react";
import { FieldAttributes } from "../lib/types";
import { mergeProps } from "../lib/utils";
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
        data-validating={isValidating ? "" : undefined}
        {...mergeProps(restProps, {
          className: fieldControlStyles,
          render: <textarea />,
        })}
      />
    </Field>
  );
}
