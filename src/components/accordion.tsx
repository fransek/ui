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

export type AccordionItemProps = BaseAccordionItemProps;

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item className={cn("border-b", className)} {...props} />
  );
}

export interface AccordionTriggerProps extends BaseAccordionTriggerProps {
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
}

export function AccordionTrigger({
  children,
  className,
  iconProps: { className: iconClassName, ...iconProps } = {},
  ...props
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="flex">
      <BaseAccordion.Trigger
        className={cn(
          "focus-visible:outline-highlight group flex flex-1 cursor-pointer items-center justify-between py-4 text-left font-medium transition-all outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform duration-200 group-data-[panel-open]:rotate-180",
            iconClassName,
          )}
          {...iconProps}
        />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export type AccordionPanelProps = BaseAccordionPanelProps;

export function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0",
        className,
      )}
      {...props}
    >
      <div className="pb-4 text-sm">{children}</div>
    </BaseAccordion.Panel>
  );
}

export type AccordionHeaderProps = BaseAccordionHeaderProps;

export function AccordionHeader({ className, ...props }: AccordionHeaderProps) {
  return <BaseAccordion.Header className={cn("flex", className)} {...props} />;
}
