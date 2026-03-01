import { Fieldset } from "@base-ui/react/fieldset";
import {
  RadioGroup as BaseRadioGroup,
  RadioGroupProps as BaseRadioGroupProps,
} from "@base-ui/react/radio-group";
import * as React from "react";
import { FieldAttributes } from "../lib/types";
import { Field, FieldProps } from "./field";

export interface RadioGroupProps extends BaseRadioGroupProps, FieldAttributes {
  fieldProps?: FieldProps;
}

export function RadioGroup({
  isValidating,
  isValidatingMessage,
  errorMessage,
  description,
  fieldProps,
  label,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <Field
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      {...fieldProps}
    >
      <Fieldset.Root
        render={<BaseRadioGroup {...props} />}
        className="flex flex-col gap-1"
      >
        <Fieldset.Legend className="text-foreground text-sm font-semibold">
          {label}
        </Fieldset.Legend>
        {children}
      </Fieldset.Root>
    </Field>
  );
}
