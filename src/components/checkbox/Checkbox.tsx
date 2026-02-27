import {
  Checkbox as BaseCheckbox,
  CheckboxRootProps as BaseCheckboxRootProps,
  CheckboxIndicatorProps,
} from "@base-ui/react/checkbox";
import { Field as BaseField } from "@base-ui/react/field";
import { CheckIcon } from "lucide-react";
import React from "react";
import { cn } from "../../lib/utils";
import { useCheckboxGroupContext } from "../checkbox-group/CheckboxGroup";
import { BasicFieldProps, Field, FieldProps } from "../field/Field";

interface CheckboxProps
  extends BaseCheckboxRootProps, Omit<BasicFieldProps, "label"> {
  label?: React.ReactNode;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  indicatorProps?: CheckboxIndicatorProps;
  iconProps?: React.SVGProps<SVGSVGElement>;
  fieldProps?: FieldProps;
}

export function Checkbox({
  label,
  className,
  labelProps: { className: labelClassName, ...labelProps } = {},
  indicatorProps: { className: indicatorClassName, ...indicatorProps } = {},
  iconProps: { className: iconClassName, ...iconProps } = {},
  fieldProps,
  description,
  isValidating,
  isValidatingMessage,
  errorMessage,
  ...props
}: CheckboxProps) {
  const labelId = React.useId();
  const invalid = !!errorMessage;

  const isInCheckboxGroup = useCheckboxGroupContext();

  const children = (
    <BaseField.Label
      className={cn(
        "text-foreground flex items-center gap-2 text-base",
        labelClassName,
      )}
      {...labelProps}
    >
      <BaseCheckbox.Root
        {...props}
        className={cn(
          "data-checked:bg-primary data-checked:border-primary focus-visible:outline-highlight data-invalid:border-error data-checked:data-invalid:bg-error flex size-5 items-center justify-center rounded-sm border outline-offset-2 focus-visible:outline-2",
          invalid
            ? "border-error-foreground data-checked:bg-error data-checked:border-error"
            : isValidating && "animate-validating",
          className,
        )}
        aria-labelledby={labelId}
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
