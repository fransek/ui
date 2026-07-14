import {
  Radio as BaseUIRadio,
  RadioIndicatorProps,
  RadioRootProps,
} from "@base-ui/react/radio";
import * as React from "react";
import { cnBaseUI } from "../lib/utils";
import { useFieldContext } from "./field";

export interface RadioProps extends RadioRootProps {
  label?: React.ReactNode;
  indicatorProps?: RadioIndicatorProps;
}

export function Radio(props: RadioProps) {
  const {
    label,
    indicatorProps: { className: indicatorClassName, ...indicatorProps } = {},
    ...restProps
  } = props;

  const id = React.useId();
  const { isValidating } = useFieldContext();

  return (
    <label className="flex items-center gap-2" id={id}>
      <BaseUIRadio.Root
        className={cnBaseUI(
          "bg-field data-validating:not-data-invalid:animate-validating outline-highlight focus-visible:focus-outline data-checked:border-primary-fg data-invalid:border-danger-fg flex size-5 items-center justify-center rounded-full border shadow",
        )}
        aria-labelledby={id}
        data-validating={isValidating ? "" : undefined}
        {...restProps}
      >
        <BaseUIRadio.Indicator
          className={cnBaseUI(
            "before:bg-primary data-invalid:before:bg-danger flex before:size-3 before:rounded-full data-unchecked:hidden",
            indicatorClassName,
          )}
          {...indicatorProps}
        />
      </BaseUIRadio.Root>
      {label}
    </label>
  );
}
