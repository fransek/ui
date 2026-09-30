import * as BaseUI from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";

export type AccordionProps = BaseUI.AccordionRootProps;

export function Accordion(props: AccordionProps) {
  return (
    <BaseUI.Accordion.Root
      {...mergeProps(props, { className: tw("w-full") })}
    />
  );
}

export interface AccordionPanelProps extends BaseUI.AccordionItemProps {
  summary: React.ReactNode;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
  headerProps?: Omit<BaseUI.AccordionHeaderProps, "children">;
  triggerProps?: Omit<BaseUI.AccordionTriggerProps, "children">;
  panelProps?: Omit<BaseUI.AccordionPanelProps, "children">;
}

export function AccordionPanel(props: AccordionPanelProps) {
  const {
    children,
    summary,
    iconProps,
    headerProps,
    triggerProps,
    panelProps,
    ...restProps
  } = props;

  return (
    <BaseUI.Accordion.Item
      {...mergeProps(restProps, { className: tw("border-b") })}
    >
      <BaseUI.Accordion.Header
        {...mergeProps(headerProps, { className: tw("flex w-full") })}
      >
        <BaseUI.Accordion.Trigger
          {...mergeProps(triggerProps, {
            className: tw(
              "group hover:bg-muted/10 outline-highlight focus-visible:focus-outline relative flex w-full items-center justify-between gap-4 px-3 py-2 text-left font-medium transition-colors focus-visible:z-1",
            ),
          })}
        >
          {summary}
          <ChevronDown
            {...mergeProps(iconProps, {
              className: tw(
                "size-4 shrink-0 transition-transform duration-200 group-data-panel-open:rotate-180",
              ),
            })}
          />
        </BaseUI.Accordion.Trigger>
      </BaseUI.Accordion.Header>
      <BaseUI.Accordion.Panel
        {...mergeProps(panelProps, {
          className: tw(
            "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0",
          ),
        })}
      >
        <div className="pb-4 text-sm">{children}</div>
      </BaseUI.Accordion.Panel>
    </BaseUI.Accordion.Item>
  );
}

Accordion.Panel = AccordionPanel;
