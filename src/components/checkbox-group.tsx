import * as BaseUI from "@base-ui/react/checkbox-group";
import * as BaseUIFieldset from "@base-ui/react/fieldset";
import * as React from "react";
import { FieldAttributes } from "../lib/types";
import { mergeProps, tw } from "../lib/utils";
import { Field, FieldProps } from "./field";
import { InfoPopover } from "./info-popover";

export interface CheckboxGroupProps
  extends BaseUI.CheckboxGroupProps, FieldAttributes {
  children?: React.ReactNode;
  fieldProps?: FieldProps;
  fieldsetProps?: BaseUIFieldset.FieldsetRootProps;
  fieldsetLegendProps?: BaseUIFieldset.FieldsetLegendProps;
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
        <BaseUIFieldset.Fieldset.Root
          {...mergeProps(fieldsetProps, {
            className: tw("flex flex-col gap-1"),
            render: <BaseUI.CheckboxGroup {...restProps} />,
          })}
        >
          {label && (
            <div className="flex items-center gap-2">
              <BaseUIFieldset.Fieldset.Legend
                {...mergeProps(fieldsetLegendProps, {
                  className: tw("text-foreground text-sm font-semibold"),
                })}
              >
                {label}
              </BaseUIFieldset.Fieldset.Legend>
              {infoPopover && (
                <InfoPopover fieldLabel={label}>{infoPopover}</InfoPopover>
              )}
            </div>
          )}
          {children}
        </BaseUIFieldset.Fieldset.Root>
      </Field>
    </CheckboxGroupContext.Provider>
  );
}

const CheckboxGroupContext = React.createContext<boolean>(false);

export function useCheckboxGroupContext() {
  return React.useContext(CheckboxGroupContext);
}
