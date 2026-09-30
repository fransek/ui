import * as BaseUIFieldset from "@base-ui/react/fieldset";
import * as BaseUI from "@base-ui/react/radio-group";
import * as React from "react";
import { FieldAttributes } from "../../lib/types";
import { mergeProps, tw } from "../../lib/utils";
import { Field, FieldProps } from "../field";
import { InfoPopover } from "../info-popover";

export interface RadioGroupProps<T>
  extends BaseUI.RadioGroupProps<T>, FieldAttributes {
  fieldProps?: FieldProps;
  fieldsetProps?: BaseUIFieldset.FieldsetRootProps;
  fieldsetLegendProps?: BaseUIFieldset.FieldsetLegendProps;
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
      <BaseUIFieldset.Fieldset.Root
        {...mergeProps(fieldsetProps, {
          className: tw("flex flex-col gap-1"),
          render: <BaseUI.RadioGroup {...restProps} />,
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
  );
}
