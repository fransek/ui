import {
  CheckboxGroup as BaseCheckboxGroup,
  CheckboxGroupProps as BaseCheckboxGroupProps,
} from "@base-ui/react/checkbox-group";
import {
  Fieldset,
  FieldsetLegendProps,
  FieldsetRootProps,
} from "@base-ui/react/fieldset";
import * as React from "react";
import { FieldAttributes } from "../lib/types";
import { cn } from "../lib/utils";
import { Field, FieldProps } from "./field";

export interface CheckboxGroupProps
  extends BaseCheckboxGroupProps, FieldAttributes {
  children?: React.ReactNode;
  fieldProps?: FieldProps;
  fieldsetProps?: FieldsetRootProps;
  legendProps?: FieldsetLegendProps;
}

export function CheckboxGroup({
  children,
  label,
  isValidating,
  isValidatingMessage,
  errorMessage,
  description,
  fieldProps,
  fieldsetProps: { className: fieldsetClassName, ...fieldsetProps } = {},
  legendProps: { className: legendClassName, ...legendProps } = {},
  ...props
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
          render={<BaseCheckboxGroup {...props} />}
          className={cn("flex flex-col gap-1", fieldsetClassName)}
          {...fieldsetProps}
        >
          <Fieldset.Legend
            className={cn(
              "text-foreground text-sm font-semibold",
              legendClassName,
            )}
            {...legendProps}
          >
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
