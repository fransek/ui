import {
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionRootProps,
  AccordionTriggerProps,
  Accordion as BaseAccordion,
} from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";

export interface AccordionItem {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps extends AccordionRootProps {
  items: AccordionItem[];
  itemProps?: AccordionItemProps;
  headerProps?: AccordionHeaderProps;
  triggerProps?: AccordionTriggerProps;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
  panelProps?: AccordionPanelProps;
}

export function Accordion({
  items,
  className,
  itemProps: { className: itemClassName, ...itemProps } = {},
  headerProps: { className: headerClassName, ...headerProps } = {},
  triggerProps: { className: triggerClassName, ...triggerProps } = {},
  iconProps: { className: iconClassName, ...iconProps } = {},
  panelProps: { className: panelClassName, ...panelProps } = {},
  ...props
}: AccordionProps) {
  return (
    <BaseAccordion.Root className={cn("w-full", className)} {...props}>
      {items.map(({ value, title, content }) => (
        <BaseAccordion.Item
          key={value}
          value={value}
          className={cn("border-b", itemClassName)}
          {...itemProps}
        >
          <BaseAccordion.Header
            className={cn("flex", headerClassName)}
            {...headerProps}
          >
            <BaseAccordion.Trigger
              className={cn(
                "focus-visible:outline-highlight group flex flex-1 cursor-pointer items-center justify-between py-4 text-left font-medium transition-all outline-none",
                triggerClassName,
              )}
              {...triggerProps}
            >
              {title}
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 transition-transform duration-200 group-data-[panel-open]:rotate-180",
                  iconClassName,
                )}
                {...iconProps}
              />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel
            className={cn(
              "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0",
              panelClassName,
            )}
            {...panelProps}
          >
            <div className="pb-4 text-sm">{content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
