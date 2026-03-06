import {
  Accordion as BaseAccordion,
  AccordionHeaderProps as BaseAccordionHeaderProps,
  AccordionItemProps as BaseAccordionItemProps,
  AccordionPanelProps as BaseAccordionPanelProps,
  AccordionRootProps as BaseAccordionRootProps,
  AccordionTriggerProps as BaseAccordionTriggerProps,
} from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";

export type AccordionProps = BaseAccordionRootProps;

export function Accordion({ className, ...props }: AccordionProps) {
  return <BaseAccordion.Root className={cn("w-full", className)} {...props} />;
}

export interface AccordionPanelProps extends BaseAccordionItemProps {
  summary: React.ReactNode;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
  headerProps?: Omit<BaseAccordionHeaderProps, "children">;
  triggerProps?: Omit<BaseAccordionTriggerProps, "children">;
  panelProps?: Omit<BaseAccordionPanelProps, "children">;
}

export function AccordionPanel({
  children,
  className,
  summary,
  iconProps: { className: iconClassName, ...iconProps } = {},
  headerProps: { className: headerClassName, ...headerProps } = {},
  triggerProps: { className: triggerClassName, ...triggerProps } = {},
  panelProps: { className: panelClassName, ...panelProps } = {},
  ...props
}: AccordionPanelProps) {
  return (
    <BaseAccordion.Item className={cn("border-b", className)} {...props}>
      <BaseAccordion.Header
        className={cn("flex w-full", headerClassName)}
        {...headerProps}
      >
        <BaseAccordion.Trigger
          className={cn(
            "focus-visible:outline-highlight group flex flex-1 cursor-pointer items-center justify-between gap-2 py-4 text-left font-medium transition-all outline-none",
            triggerClassName,
          )}
          {...triggerProps}
        >
          {summary}
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
        <div className="pb-4 text-sm">{children}</div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}
