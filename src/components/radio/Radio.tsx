"use client";
import { Fieldset } from "@base-ui/react/fieldset";
import {
  Radio as BaseRadio,
  RadioIndicatorProps,
  RadioRootProps,
} from "@base-ui/react/radio";
import {
  RadioGroup as BaseRadioGroup,
  RadioGroupProps as BaseRadioGroupProps,
} from "@base-ui/react/radio-group";
import * as React from "react";
import { BasicFieldProps, cn } from "../../lib/utils";
import { Field, FieldProps, useFieldContext } from "../field/Field";

interface RadioProps extends RadioRootProps {
  label?: React.ReactNode;
  indicatorProps?: RadioIndicatorProps;
}

export function Radio({
  label,
  indicatorProps: { className: indicatorClassName, ...indicatorProps } = {},
  ...props
}: RadioProps) {
  const id = React.useId();
  const { isValidating } = useFieldContext();

  return (
    <label className="flex items-center gap-2" id={id}>
      <BaseRadio.Root
        className={cn(
          "data-validating:not-data-invalid:animate-validating focus-visible:outline-highlight data-checked:border-primary-foreground data-invalid:border-error-foreground flex size-5 items-center justify-center rounded-full border focus-visible:outline-2 focus-visible:outline-offset-2",
        )}
        aria-labelledby={id}
        data-validating={isValidating ? "" : undefined}
        {...props}
      >
        <BaseRadio.Indicator
          className={cn(
            "before:bg-primary data-invalid:before:bg-error flex before:size-3 before:rounded-full data-unchecked:hidden",
            indicatorClassName,
          )}
          {...indicatorProps}
        />
      </BaseRadio.Root>
      {label}
    </label>
  );
}

interface RadioGroupProps extends BaseRadioGroupProps, BasicFieldProps {
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

Radio.Group = RadioGroup;
