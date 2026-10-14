import * as BaseUI from "@base-ui/react/collapsible";
import { ChevronRight } from "lucide-react";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";

export type CollapsibleProps = BaseUI.CollapsibleRootProps;

export function Collapsible(props: CollapsibleProps) {
  return (
    <BaseUI.Collapsible.Root
      {...mergeProps(props, {
        className: tw("flex min-w-48 flex-col justify-center"),
      })}
    />
  );
}

export interface CollapsibleTriggerProps
  extends BaseUI.CollapsibleTriggerProps {
  /** Props forwarded to the chevron icon. */
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
}

export function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  const { children, iconProps, ...restProps } = props;

  return (
    <BaseUI.Collapsible.Trigger
      {...mergeProps(restProps, {
        className: tw(
          "group hover:not-data-disabled:bg-hover focus-visible:focus-outline active:not-data-disabled:bg-active disabled:text-muted-fg data-disabled:text-muted-fg flex h-8 items-center justify-between gap-2 rounded-lg pr-2 pl-3 text-sm leading-none font-normal whitespace-nowrap select-none focus-visible:outline-2 focus-visible:-outline-offset-1",
        ),
      })}
    >
      {children}
      <ChevronRight
        {...mergeProps(iconProps, {
          className: tw(
            "size-4 shrink-0 transition-transform group-data-panel-open:rotate-90",
          ),
        })}
      />
    </BaseUI.Collapsible.Trigger>
  );
}

export interface CollapsiblePanelProps extends BaseUI.CollapsiblePanelProps {
  /** Props forwarded to the padded element wrapping the panel's content. */
  contentProps?: React.ComponentPropsWithoutRef<"div">;
}

export function CollapsiblePanel(props: CollapsiblePanelProps) {
  const { children, contentProps, ...restProps } = props;

  return (
    <BaseUI.Collapsible.Panel
      {...mergeProps(restProps, {
        className: tw(
          "flex h-(--collapsible-panel-height) flex-col justify-end overflow-hidden text-sm transition-[height] data-ending-style:h-0 data-starting-style:h-0 [&[hidden]:not([hidden='until-found'])]:hidden",
        ),
      })}
    >
      <div
        {...mergeProps(contentProps, {
          className: tw("text-body flex flex-col gap-2 px-3.5 py-2"),
        })}
      >
        {children}
      </div>
    </BaseUI.Collapsible.Panel>
  );
}

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Panel = CollapsiblePanel;
