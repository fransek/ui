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
import { cnBaseUI } from "../lib/utils";
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
    fieldsetProps: { className: fieldsetClassName, ...fieldsetProps } = {},
    fieldsetLegendProps: {
      className: fieldsetLegendClassName,
      ...legendProps
    } = {},
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
        render={<BaseUIRadioGroup {...restProps} />}
        className={cnBaseUI("flex flex-col gap-1", fieldsetClassName)}
        {...fieldsetProps}
      >
        {label && (
          <div className="flex items-center gap-2">
            <Fieldset.Legend
              className={cnBaseUI(
                "text-foreground text-sm font-semibold",
                fieldsetLegendClassName,
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
  );
}
