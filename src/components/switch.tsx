import {
  Switch as BaseUISwitch,
  SwitchRootProps as BaseUISwitchRootProps,
  SwitchThumbProps,
} from "@base-ui/react/switch";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { mergeProps, tw } from "../lib/utils";
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
    fieldProps,
    description,
    isValidating,
    isValidatingMessage,
    errorMessage,
    invalid,
    infoPopover,
    labelProps,
    thumbProps,
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
          {...mergeProps(labelProps, {
            className: tw(
              "text-foreground flex items-center gap-2 text-base font-normal",
            ),
          })}
        >
          <BaseUISwitch.Root
            aria-labelledby={labelId}
            data-validating={isValidating ? "" : undefined}
            {...mergeProps(restProps, {
              className: tw(
                "bg-muted border-muted data-validating:not-data-invalid:animate-validating data-invalid:border-danger-fg data-invalid:data-checked:bg-danger data-invalid:data-checked:border-danger data-checked:bg-primary outline-highlight focus-visible:focus-outline data-checked:border-primary flex h-5 w-9 shrink-0 rounded-full border p-0.5 shadow transition-colors duration-150 ease-[ease]",
              ),
            })}
          >
            <BaseUISwitch.Thumb
              {...mergeProps(thumbProps, {
                className: tw(
                  "dark:data-checked:bg-foreground bg-background dark:bg-foreground size-3.5 rounded-full transition-[translate,background-color] duration-150 ease-[ease] data-checked:translate-x-4",
                ),
              })}
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
