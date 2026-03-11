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
import { cn, cnBaseUI } from "../lib/utils";

export type AccordionProps = BaseUIAccordionRootProps;

export function Accordion(props: AccordionProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUIAccordion.Root
      className={cnBaseUI("w-full", className)}
      {...restProps}
    />
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
    className,
    summary,
    iconProps: { className: iconClassName, ...iconProps } = {},
    headerProps: { className: headerClassName, ...headerProps } = {},
    triggerProps: { className: triggerClassName, ...triggerProps } = {},
    panelProps: { className: panelClassName, ...panelProps } = {},
    ...restProps
  } = props;

  return (
    <BaseUIAccordion.Item
      className={cnBaseUI("border-b", className)}
      {...restProps}
    >
      <BaseUIAccordion.Header
        className={cnBaseUI("flex w-full", headerClassName)}
        {...headerProps}
      >
        <BaseUIAccordion.Trigger
          className={cnBaseUI(
            "group hover:bg-card outline-highlight focus-visible:focus-outline relative flex w-full items-center justify-between gap-4 px-3 py-2 text-left font-medium focus-visible:z-1",
            triggerClassName,
          )}
          {...triggerProps}
        >
          {summary}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 transition-transform duration-200 group-data-panel-open:rotate-180",
              iconClassName,
            )}
            {...iconProps}
          />
        </BaseUIAccordion.Trigger>
      </BaseUIAccordion.Header>
      <BaseUIAccordion.Panel
        className={cnBaseUI(
          "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0",
          panelClassName,
        )}
        {...panelProps}
      >
        <div className="pb-4 text-sm">{children}</div>
      </BaseUIAccordion.Panel>
    </BaseUIAccordion.Item>
  );
}
