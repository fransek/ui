import * as BaseUI from "@base-ui/react/fieldset";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";

export interface FieldsetProps extends BaseUI.FieldsetRootProps {
  legend?: React.ReactNode;
  legendProps?: BaseUI.FieldsetLegendProps;
  contentProps?: React.ComponentProps<"div">;
}

export function Fieldset(props: FieldsetProps) {
  const { legend, legendProps, contentProps, children, ...restProps } = props;

  const hasLegend = legend != null;

  return (
    <BaseUI.Fieldset.Root
      {...mergeProps(restProps, {
        className: tw("rounded-lg border p-4"),
      })}
    >
      {hasLegend && (
        <BaseUI.Fieldset.Legend
          {...mergeProps(legendProps, {
            className: tw("text-body text-sm"),
            render: <legend />,
          })}
        >
          {legend}
        </BaseUI.Fieldset.Legend>
      )}
      <div
        {...mergeProps(contentProps, {
          className: tw("flex flex-col gap-4"),
        })}
      >
        {children}
      </div>
    </BaseUI.Fieldset.Root>
  );
}
