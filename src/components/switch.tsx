import {
  Switch as BaseUISwitch,
  SwitchRootProps as BaseUISwitchRootProps,
  SwitchThumbProps,
} from "@base-ui/react/switch";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cnBaseUI } from "../lib/utils";
import { Field, FieldLabel, FieldProps } from "./field";
import { InfoPopover } from "./info-popover";

export interface SwitchProps
  extends BaseUISwitchRootProps, Omit<FieldAttributes, "label"> {
  label?: React.ReactNode;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  thumbProps?: SwitchThumbProps;
  fieldProps?: FieldProps;
}

export function Switch(props: SwitchProps) {
  const {
    label,
    className,
    fieldProps,
    description,
    isValidating,
    isValidatingMessage,
    errorMessage,
    invalid,
    infoPopover,
    labelProps: { className: labelClassName, ...labelProps } = {},
    thumbProps: { className: thumbClassName, ...thumbProps } = {},
    ...restProps
  } = props;

  const labelId = React.useId();

  return (
    <Field
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      invalid={invalid}
      {...fieldProps}
    >
      <div className="flex items-center gap-2">
        <FieldLabel
          className={cnBaseUI(
            "text-foreground flex items-center gap-2 text-base font-normal",
            labelClassName,
          )}
          {...labelProps}
        >
          <BaseUISwitch.Root
            className={cnBaseUI(
              "data-validating:not-data-invalid:animate-validating data-invalid:border-error-foreground data-invalid:data-checked:bg-error data-invalid:data-checked:border-error data-checked:bg-primary bg-card outline-highlight focus-visible:focus-outline data-checked:border-primary flex h-5 w-9 shrink-0 rounded-full border p-0.5 transition-colors duration-150 ease-[ease]",
              className,
            )}
            aria-labelledby={labelId}
            data-validating={isValidating ? "" : undefined}
            {...restProps}
          >
            <BaseUISwitch.Thumb
              className={cnBaseUI(
                "data-checked:bg-background bg-secondary dark:data-checked:bg-foreground size-3.5 rounded-full transition-[translate,background-color] duration-150 ease-[ease] data-checked:translate-x-4",
                thumbClassName,
              )}
              {...thumbProps}
            />
          </BaseUISwitch.Root>
          <span id={labelId}>{label}</span>
        </FieldLabel>
        {infoPopover && (
          <InfoPopover fieldLabel={label}>{infoPopover}</InfoPopover>
        )}
      </div>
    </Field>
  );
}
