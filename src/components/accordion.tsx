import {
  Accordion as BaseAccordion,
  AccordionItemProps as BaseAccordionItemProps,
  AccordionRootProps as BaseAccordionRootProps,
} from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";

export type AccordionProps = BaseAccordionRootProps;

export function Accordion({ className, ...props }: AccordionProps) {
  return <BaseAccordion.Root className={cn("w-full", className)} {...props} />;
}

export interface AccordionItemProps extends BaseAccordionItemProps {
  trigger: React.ReactNode;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
  triggerClassName?: string;
  panelClassName?: string;
}

export function AccordionItem({
  children,
  className,
  trigger,
  iconProps: { className: iconClassName, ...iconProps } = {},
  triggerClassName,
  panelClassName,
  ...props
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item className={cn("border-b", className)} {...props}>
      <BaseAccordion.Header className="flex w-full">
        <BaseAccordion.Trigger
          className={cn(
            "focus-visible:outline-highlight group flex flex-1 cursor-pointer items-center justify-between gap-2 py-4 text-left font-medium transition-all outline-none",
            triggerClassName,
          )}
        >
          {trigger}
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
      >
        <div className="pb-4 text-sm">{children}</div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}
