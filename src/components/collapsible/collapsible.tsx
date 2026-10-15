import * as BaseUI from "@base-ui/react/collapsible";
import { ChevronRight } from "lucide-react";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";

export interface CollapsibleProps extends BaseUI.CollapsibleRootProps {
  /** Content rendered inside the trigger button, before the chevron. */
  summary?: React.ReactNode;
  /** Custom trigger */
  trigger?: BaseUI.CollapsibleTriggerProps["render"];
  /** Props forwarded to the chevron icon. */
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
  /** Props forwarded to the `Trigger`. */
  triggerProps?: Omit<BaseUI.CollapsibleTriggerProps, "children" | "render">;
  /** Props forwarded to the `Panel`. */
  panelProps?: Omit<BaseUI.CollapsiblePanelProps, "children">;
  /** Props forwarded to the padded element wrapping the panel's content. */
  contentProps?: Omit<React.ComponentPropsWithoutRef<"div">, "children">;
}

export function Collapsible(props: CollapsibleProps) {
  const {
    children,
    summary,
    iconProps,
    triggerProps,
    panelProps,
    contentProps,
    trigger,
    ...restProps
  } = props;

  return (
    <BaseUI.Collapsible.Root
      {...mergeProps(restProps, {
        className: tw("flex min-w-48 flex-col justify-center"),
      })}
    >
      {trigger ? (
        <BaseUI.Collapsible.Trigger render={trigger} {...triggerProps} />
      ) : summary ? (
        <BaseUI.Collapsible.Trigger
          {...mergeProps(triggerProps, {
            className: tw(
              "group hover:not-data-disabled:bg-hover focus-visible:focus-outline active:not-data-disabled:bg-active disabled:text-muted-fg data-disabled:text-muted-fg flex h-8 items-center justify-between gap-2 rounded-lg pr-2 pl-3 text-sm leading-none font-normal whitespace-nowrap select-none focus-visible:outline-2 focus-visible:-outline-offset-1",
            ),
          })}
        >
          {summary}
          <ChevronRight
            {...mergeProps(iconProps, {
              className: tw(
                "size-4 shrink-0 transition-transform group-data-panel-open:rotate-90",
              ),
            })}
          />
        </BaseUI.Collapsible.Trigger>
      ) : null}
      <BaseUI.Collapsible.Panel
        {...mergeProps(panelProps, {
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
    </BaseUI.Collapsible.Root>
  );
}
