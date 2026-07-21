import {
  Accordion as BaseUIAccordion,
  AccordionHeaderProps as BaseUIAccordionHeaderProps,
  AccordionItemProps as BaseUIAccordionItemProps,
  AccordionPanelProps as BaseUIAccordionPanelProps,
  AccordionRootProps as BaseUIAccordionRootProps,
  AccordionTriggerProps as BaseUIAccordionTriggerProps,
} from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { mergeProps, tw } from "../lib/utils";

export type AccordionProps = BaseUIAccordionRootProps;

export function Accordion(props: AccordionProps) {
  return (
    <BaseUIAccordion.Root {...mergeProps(props, { className: tw("w-full") })} />
  );
}

export interface AccordionPanelProps extends BaseUIAccordionItemProps {
  summary: React.ReactNode;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
  headerProps?: Omit<BaseUIAccordionHeaderProps, "children">;
  triggerProps?: Omit<BaseUIAccordionTriggerProps, "children">;
  panelProps?: Omit<BaseUIAccordionPanelProps, "children">;
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
    <BaseUIAccordion.Item
      {...mergeProps(restProps, { className: tw("border-b") })}
    >
      <BaseUIAccordion.Header
        {...mergeProps(headerProps, { className: tw("flex w-full") })}
      >
        <BaseUIAccordion.Trigger
          {...mergeProps(triggerProps, {
            className: tw(
              "group hover:bg-card outline-highlight focus-visible:focus-outline relative flex w-full items-center justify-between gap-4 px-3 py-2 text-left font-medium focus-visible:z-1",
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
        </BaseUIAccordion.Trigger>
      </BaseUIAccordion.Header>
      <BaseUIAccordion.Panel
        {...mergeProps(panelProps, {
          className: tw(
            "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0",
          ),
        })}
      >
        <div className="pb-4 text-sm">{children}</div>
      </BaseUIAccordion.Panel>
    </BaseUIAccordion.Item>
  );
}
