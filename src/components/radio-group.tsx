import { Fieldset } from "@base-ui/react/fieldset";
import {
  RadioGroup as BaseUIRadioGroup,
  RadioGroupProps as BaseUIRadioGroupProps,
} from "@base-ui/react/radio-group";
import * as React from "react";
import { FieldAttributes } from "../lib/types";
import { Field, FieldProps } from "./field";
import { InfoPopover } from "./info-popover";

export interface RadioGroupProps
  extends BaseUIRadioGroupProps, FieldAttributes {
  fieldProps?: FieldProps;
}

export function RadioGroup(props: RadioGroupProps) {
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
        className="flex flex-col gap-1"
      >
        {label && (
          <div className="flex items-center gap-2">
            <Fieldset.Legend className="text-foreground text-sm font-semibold">
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
