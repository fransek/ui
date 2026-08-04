import {
  CheckboxGroup as BaseUICheckboxGroup,
  CheckboxGroupProps as BaseUICheckboxGroupProps,
} from "@base-ui/react/checkbox-group";
import {
  Fieldset,
  FieldsetLegendProps,
  FieldsetRootProps,
} from "@base-ui/react/fieldset";
import * as React from "react";
import { FieldAttributes } from "../lib/types";
import { mergeProps, tw } from "../lib/utils";
import { Field, FieldProps } from "./field";
import { InfoPopover } from "./info-popover";

export interface CheckboxGroupProps
  extends BaseUICheckboxGroupProps, FieldAttributes {
  children?: React.ReactNode;
  fieldProps?: FieldProps;
  fieldsetProps?: FieldsetRootProps;
  fieldsetLegendProps?: FieldsetLegendProps;
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
    fieldsetProps,
    fieldsetLegendProps,
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
          {...mergeProps(fieldsetProps, {
            className: tw("flex flex-col gap-1"),
            render: <BaseUICheckboxGroup {...restProps} />,
          })}
        >
          {label && (
            <div className="flex items-center gap-2">
              <Fieldset.Legend
                {...mergeProps(fieldsetLegendProps, {
                  className: tw("text-foreground text-sm font-semibold"),
                })}
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
