"use client";
import {
  CheckboxGroup as BaseCheckboxGroup,
  CheckboxGroupProps as BaseCheckboxGroupProps,
} from "@base-ui/react/checkbox-group";
import { Fieldset } from "@base-ui/react/fieldset";
import * as React from "react";
import { BasicFieldProps, Field, FieldProps } from "../field/Field";

interface CheckboxGroupProps extends BaseCheckboxGroupProps, BasicFieldProps {
  children?: React.ReactNode;
  fieldProps?: FieldProps;
}

export function CheckboxGroup({
  children,
  label,
  isValidating,
  isValidatingMessage,
  errorMessage,
  description,
  fieldProps,
}: CheckboxGroupProps) {
  return (
    <CheckboxGroupContext.Provider value={true}>
      <Field
        isValidating={isValidating}
        isValidatingMessage={isValidatingMessage}
        errorMessage={errorMessage}
        description={description}
        {...fieldProps}
      >
        <Fieldset.Root
          render={<BaseCheckboxGroup />}
          className="flex flex-col gap-1"
        >
          <Fieldset.Legend className="text-foreground text-sm font-semibold">
            {label}
          </Fieldset.Legend>
          {children}
        </Fieldset.Root>
      </Field>
    </CheckboxGroupContext.Provider>
  );
}

const CheckboxGroupContext = React.createContext<boolean>(false);

export function useCheckboxGroupContext() {
  return React.useContext(CheckboxGroupContext);
}
