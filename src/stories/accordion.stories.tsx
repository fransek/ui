import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Accordion, AccordionPanel } from "../components/accordion";

const items = [
  {
    value: "item-1",
    title: "What is Base UI?",
    content:
      "Base UI is an open-source library of accessible, unstyled UI components for React.",
  },
  {
    value: "item-2",
    title: "Is it accessible?",
    content:
      "Yes. All components follow WAI-ARIA guidelines and are keyboard navigable.",
  },
  {
    value: "item-3",
    title: "Can I customize the styles?",
    content:
      "Absolutely. Components are unstyled by default and styled here with Tailwind CSS.",
  },
];

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    className: "w-[400px]",
  },
  render: (args) => (
    <Accordion {...args}>
      {items.map(({ value, title, content }) => (
        <AccordionPanel key={value} value={value} summary={title}>
          <p className="body-2 text-body">{content}</p>
        </AccordionPanel>
      ))}
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultValue: ["item-1"],
  },
};
