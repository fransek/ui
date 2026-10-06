import * as BaseUI from "@base-ui/react/radio";
import * as React from "react";
import { mergeProps, tw } from "../../lib/utils";
import { useFieldContext } from "../field";
import { InfoPopover } from "../info-popover";

export interface RadioProps extends BaseUI.RadioRootProps {
  label?: React.ReactNode;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  indicatorProps?: BaseUI.RadioIndicatorProps;
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
        <BaseUI.Radio.Root
          aria-labelledby={labelId}
          data-validating={isValidating ? "" : undefined}
          {...mergeProps(restProps, {
            className: tw(
              "bg-field data-validating:not-data-invalid:animate-validating focus-visible:focus-outline data-checked:border-primary-fg data-invalid:border-danger-fg flex size-5 items-center justify-center rounded-full border shadow-sm",
            ),
          })}
        >
          <BaseUI.Radio.Indicator
            {...mergeProps(indicatorProps, {
              className: tw(
                "before:bg-primary data-invalid:before:bg-danger flex before:size-3 before:rounded-full data-unchecked:hidden",
              ),
            })}
          />
        </BaseUI.Radio.Root>
        <span id={labelId}>{label}</span>
      </label>
      {infoPopover && (
        <InfoPopover fieldLabel={label}>{infoPopover}</InfoPopover>
      )}
    </div>
  );
}
