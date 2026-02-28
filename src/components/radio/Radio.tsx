"use client";
import { Fieldset } from "@base-ui/react/fieldset";
import { Radio as BaseRadio, RadioRootProps } from "@base-ui/react/radio";
import {
  RadioGroup as BaseRadioGroup,
  RadioGroupProps as BaseRadioGroupProps,
} from "@base-ui/react/radio-group";
import * as React from "react";
import { cn } from "../../lib/utils";
import {
  BasicFieldProps,
  Field,
  FieldProps,
  useFieldContext,
} from "../field/Field";

interface RadioProps extends RadioRootProps {
  label?: React.ReactNode;
}

export function Radio({ label, ...props }: RadioProps) {
  const id = React.useId();
  const { isValidating } = useFieldContext();

  return (
    <label className="flex items-center gap-2" id={id}>
      <BaseRadio.Root
        className={cn(
          "focus-visible:outline-highlight data-checked:border-primary data-invalid:border-error flex size-5 items-center justify-center rounded-full border focus-visible:outline-2 focus-visible:outline-offset-2",
          isValidating && "animate-validating",
        )}
        aria-labelledby={id}
        {...props}
      >
        <BaseRadio.Indicator className="before:bg-primary data-invalid:before:bg-error flex before:size-3 before:rounded-full data-unchecked:hidden" />
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
