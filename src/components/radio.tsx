import {
  Radio as BaseUIRadio,
  RadioIndicatorProps,
  RadioRootProps,
} from "@base-ui/react/radio";
import * as React from "react";
import { mergeProps, tw } from "../lib/utils";
import { useFieldContext } from "./field";
import { InfoPopover } from "./info-popover";

export interface RadioProps extends RadioRootProps {
  label?: React.ReactNode;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  indicatorProps?: RadioIndicatorProps;
  infoPopover?: React.ReactNode;
}

export function Radio(props: RadioProps) {
  const { label, infoPopover, labelProps, indicatorProps, ...restProps } =
    props;

  const labelId = React.useId();
  const { isValidating } = useFieldContext();

  return (
    <div className="flex items-center gap-2">
      <label
        {...mergeProps(labelProps, {
          className: tw("flex items-center gap-2"),
        })}
      >
        <BaseUIRadio.Root
          aria-labelledby={labelId}
          data-validating={isValidating ? "" : undefined}
          {...mergeProps(restProps, {
            className: tw(
              "bg-field data-validating:not-data-invalid:animate-validating outline-highlight focus-visible:focus-outline data-checked:border-primary-fg data-invalid:border-danger-fg flex size-5 items-center justify-center rounded-full border shadow",
            ),
          })}
        >
          <BaseUIRadio.Indicator
            {...mergeProps(indicatorProps, {
              className: tw(
                "before:bg-primary data-invalid:before:bg-danger flex before:size-3 before:rounded-full data-unchecked:hidden",
              ),
            })}
          />
        </BaseUIRadio.Root>
        <span id={labelId}>{label}</span>
      </label>
      {infoPopover && (
        <InfoPopover fieldLabel={label}>{infoPopover}</InfoPopover>
      )}
    </div>
  );
}
