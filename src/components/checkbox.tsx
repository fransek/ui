import {
  Checkbox as BaseCheckbox,
  CheckboxRootProps as BaseCheckboxRootProps,
  CheckboxIndicatorProps,
} from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cn, cnBaseUI } from "../lib/utils";
import { useCheckboxGroupContext } from "./checkbox-group";
import {
  Field,
  FieldItem,
  FieldLabel,
  FieldProps,
  useFieldContext,
} from "./field";
import { InfoPopover } from "./info-popover";

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
  invalid,
  infoPopover,
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
    <div className="flex items-center gap-2">
      <FieldLabel
        className={cnBaseUI(
          "text-foreground flex items-center gap-2 text-base font-normal",
          labelClassName,
        )}
        {...labelProps}
      >
        <BaseCheckbox.Root
          className={cnBaseUI(
            "data-validating:not-data-invalid:animate-validating data-invalid:border-error-foreground data-invalid:data-checked:bg-error data-invalid:data-checked:border-error data-checked:bg-primary data-checked:border-primary outline-highlight focus-visible:focus-outline flex size-5 items-center justify-center rounded-sm border",
            className,
          )}
          aria-labelledby={labelId}
          data-validating={isValidating ? "" : undefined}
          {...props}
        >
          <BaseCheckbox.Indicator
            className={cnBaseUI(
              "text-on-primary data-invalid:border-error data-invalid:bg-error flex data-unchecked:hidden",
              indicatorClassName,
            )}
            {...indicatorProps}
          >
            <CheckIcon className={cn("size-4", iconClassName)} {...iconProps} />
          </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
        <span id={labelId}>{label}</span>
      </FieldLabel>
      {infoPopover && (
        <InfoPopover fieldLabel={label}>{infoPopover}</InfoPopover>
      )}
    </div>
  );

  if (isInCheckboxGroup) {
    return <FieldItem>{children}</FieldItem>;
  }

  return (
    <Field
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      invalid={invalid}
      {...fieldProps}
    >
      {children}
    </Field>
  );
}
