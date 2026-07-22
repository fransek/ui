import {
  Fieldset as BaseUIFieldset,
  FieldsetLegendProps,
  FieldsetRootProps,
} from "@base-ui/react/fieldset";
import React from "react";
import { mergeProps, tw } from "../lib/utils";

export interface FieldsetProps extends FieldsetRootProps {
  legend?: React.ReactNode;
  legendProps?: FieldsetLegendProps;
  contentProps?: React.ComponentProps<"div">;
}

export function Fieldset(props: FieldsetProps) {
  const { legend, legendProps, contentProps, children, ...restProps } = props;

  const hasLegend = legend != null;

  return (
    <BaseUIFieldset.Root
      {...mergeProps(restProps, {
        className: tw("rounded-lg border p-4"),
      })}
    >
      {hasLegend && (
        <BaseUIFieldset.Legend
          {...mergeProps(legendProps, {
            className: tw("text-body text-sm"),
            render: <legend />,
          })}
        >
          {legend}
        </BaseUIFieldset.Legend>
      )}
      <div
        {...mergeProps(contentProps, {
          className: tw("flex flex-col gap-4"),
        })}
      >
        {children}
      </div>
    </BaseUIFieldset.Root>
  );
}
