import {
  Fieldset,
  FieldsetLegendProps,
  FieldsetRootProps,
} from "@base-ui/react/fieldset";
import {
  RadioGroup as BaseUIRadioGroup,
  RadioGroupProps as BaseUIRadioGroupProps,
} from "@base-ui/react/radio-group";
import * as React from "react";
import { FieldAttributes } from "../lib/types";
import { mergeProps, tw } from "../lib/utils";
import { Field, FieldProps } from "./field";
import { InfoPopover } from "./info-popover";

export interface RadioGroupProps<T>
  extends BaseUIRadioGroupProps<T>, FieldAttributes {
  fieldProps?: FieldProps;
  fieldsetProps?: FieldsetRootProps;
  fieldsetLegendProps?: FieldsetLegendProps;
}

export function RadioGroup<T>(props: RadioGroupProps<T>) {
  const {
    isValidating,
    isValidatingMessage,
    errorMessage,
    description,
    infoPopover,
    fieldProps,
    label,
    children,
    invalid,
    fieldsetProps,
    fieldsetLegendProps,
    ...restProps
  } = props;

  return (
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
          render: <BaseUIRadioGroup {...restProps} />,
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
  );
}
