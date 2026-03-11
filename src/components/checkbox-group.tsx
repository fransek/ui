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
import { cnBaseUI } from "../lib/utils";
import { Field, FieldProps } from "./field";
import { InfoPopover } from "./info-popover";

export interface CheckboxGroupProps
  extends BaseCheckboxGroupProps, FieldAttributes {
  children?: React.ReactNode;
  fieldProps?: FieldProps;
  fieldsetProps?: FieldsetRootProps;
  legendProps?: FieldsetLegendProps;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    children,
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    invalid,
    description,
    fieldProps,
    infoPopover,
    fieldsetProps: { className: fieldsetClassName, ...fieldsetProps } = {},
    legendProps: { className: legendClassName, ...legendProps } = {},
    ...restProps
  } = props;
  return (
    <CheckboxGroupContext.Provider value={true}>
      <Field
        isValidating={isValidating}
        isValidatingMessage={isValidatingMessage}
        errorMessage={errorMessage}
        description={description}
        invalid={invalid}
        {...fieldProps}
      >
        <Fieldset.Root
          render={<BaseCheckboxGroup {...restProps} />}
          className={cnBaseUI("flex flex-col gap-1", fieldsetClassName)}
          {...fieldsetProps}
        >
          {label && (
            <div className="flex items-center gap-2">
              <Fieldset.Legend
                className={cnBaseUI(
                  "text-foreground text-sm font-semibold",
                  legendClassName,
                )}
                {...legendProps}
              >
                {label}
              </Fieldset.Legend>
              {infoPopover && (
                <InfoPopover fieldLabel={label}>{infoPopover}</InfoPopover>
              )}
            </div>
          )}
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
