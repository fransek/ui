import {
  Fieldset as BaseUIFieldset,
  FieldsetLegendProps,
  FieldsetRootProps,
} from "@base-ui/react/fieldset";
import React from "react";
import { cnBaseUI } from "../lib/utils";

export interface FieldsetProps extends FieldsetRootProps {
  legend?: React.ReactNode;
  legendProps?: FieldsetLegendProps;
}

export function Fieldset(props: FieldsetProps) {
  const {
    legend,
    legendProps: {
      className: legendClassName,
      render: legendRender,
      ...legendProps
    } = {},
    className,
    children,
    ...restProps
  } = props;

  return (
    <BaseUIFieldset.Root
      className={cnBaseUI(
        "flex w-full flex-col gap-4 rounded-lg border p-4",
        className,
      )}
      {...restProps}
    >
      {legend != null && (
        <BaseUIFieldset.Legend
          render={legendRender ?? <legend />}
          className={cnBaseUI("text-body text-sm", legendClassName)}
          {...legendProps}
        >
          {legend}
        </BaseUIFieldset.Legend>
      )}
      {children}
    </BaseUIFieldset.Root>
  );
}
