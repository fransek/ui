import {
  Checkbox as BaseUICheckbox,
  CheckboxRootProps as BaseUICheckboxRootProps,
  CheckboxIndicatorProps,
} from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { mergeProps, tw } from "../lib/utils";
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
  extends BaseUICheckboxRootProps, Omit<FieldAttributes, "label"> {
  label?: React.ReactNode;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  indicatorProps?: CheckboxIndicatorProps;
  iconProps?: React.SVGProps<SVGSVGElement>;
  fieldProps?: FieldProps;
}

export function Checkbox(props: CheckboxProps) {
  const {
    label,
    fieldProps,
    description,
    isValidating: _isValidating,
    isValidatingMessage,
    errorMessage,
    invalid,
    infoPopover,
    labelProps,
    indicatorProps,
    iconProps,
    ...restProps
  } = props;

  const labelId = React.useId();
  const isInCheckboxGroup = useCheckboxGroupContext();
  const { isValidating: groupIsValidating } = useFieldContext();
  const isValidating = isInCheckboxGroup ? groupIsValidating : _isValidating;

  const children = (
    <div className="flex items-center gap-2">
      <FieldLabel
        {...mergeProps(labelProps, {
          className: tw(
            "text-foreground flex items-center gap-2 text-base font-normal",
          ),
        })}
      >
        <BaseUICheckbox.Root
          aria-labelledby={labelId}
          data-validating={isValidating ? "" : undefined}
          {...mergeProps(restProps, {
            className: tw(
              "bg-field data-validating:not-data-invalid:animate-validating data-invalid:border-danger-fg data-invalid:data-checked:bg-danger data-invalid:data-checked:border-danger data-checked:bg-primary data-checked:border-primary outline-highlight focus-visible:focus-outline flex size-5 items-center justify-center rounded-sm border shadow",
            ),
          })}
        >
          <BaseUICheckbox.Indicator
            {...mergeProps(indicatorProps, {
              className: tw(
                "text-on-primary data-invalid:border-danger data-invalid:bg-danger flex data-unchecked:hidden",
              ),
            })}
          >
            <CheckIcon
              {...mergeProps(iconProps, { className: tw("size-4") })}
            />
          </BaseUICheckbox.Indicator>
        </BaseUICheckbox.Root>
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
