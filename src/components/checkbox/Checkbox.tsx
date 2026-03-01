import {
  Checkbox as BaseCheckbox,
  CheckboxRootProps as BaseCheckboxRootProps,
  CheckboxIndicatorProps,
} from "@base-ui/react/checkbox";
import { Field as BaseField } from "@base-ui/react/field";
import { CheckIcon } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../../lib/types";
import { cn } from "../../lib/utils";
import { useCheckboxGroupContext } from "../checkbox-group/CheckboxGroup";
import { Field, FieldProps, useFieldContext } from "../field/Field";

export interface CheckboxProps
  extends BaseCheckboxRootProps, Omit<FieldAttributes, "label"> {
  label?: React.ReactNode;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  indicatorProps?: CheckboxIndicatorProps;
  iconProps?: React.SVGProps<SVGSVGElement>;
  fieldProps?: FieldProps;
}

export function Checkbox({
  label,
  className,
  fieldProps,
  description,
  isValidating: _isValidating,
  isValidatingMessage,
  errorMessage,
  labelProps: { className: labelClassName, ...labelProps } = {},
  indicatorProps: { className: indicatorClassName, ...indicatorProps } = {},
  iconProps: { className: iconClassName, ...iconProps } = {},
  ...props
}: CheckboxProps) {
  const labelId = React.useId();
  const isInCheckboxGroup = useCheckboxGroupContext();
  const { isValidating: groupIsValidating } = useFieldContext();
  const isValidating = isInCheckboxGroup ? groupIsValidating : _isValidating;

  const children = (
    <BaseField.Label
      className={cn(
        "text-foreground flex items-center gap-2 text-base",
        labelClassName,
      )}
      {...labelProps}
    >
      <BaseCheckbox.Root
        className={cn(
          "data-validating:not-data-invalid:animate-validating data-invalid:border-error-foreground data-invalid:data-checked:bg-error data-invalid:data-checked:border-error data-checked:bg-primary data-checked:border-primary focus-visible:outline-highlight flex size-5 items-center justify-center rounded-sm border outline-offset-2 focus-visible:outline-2",
          className,
        )}
        aria-labelledby={labelId}
        data-validating={isValidating ? "" : undefined}
        {...props}
      >
        <BaseCheckbox.Indicator
          className={cn(
            "text-on-primary data-invalid:border-error data-invalid:bg-error flex data-unchecked:hidden",
            indicatorClassName,
          )}
          {...indicatorProps}
        >
          <CheckIcon className={cn("size-4", iconClassName)} {...iconProps} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <span id={labelId}>{label}</span>
    </BaseField.Label>
  );

  if (isInCheckboxGroup) {
    return <BaseField.Item>{children}</BaseField.Item>;
  }

  return (
    <Field
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      {...fieldProps}
    >
      {children}
    </Field>
  );
}
