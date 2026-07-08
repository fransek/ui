import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ScrollArea } from "../components/scroll-area";

const paragraphs = Array.from(
  { length: 12 },
  (_, i) =>
    `Paragraph ${i + 1}. Vernacular architecture is building done outside any academic tradition, and without professional guidance.`,
);

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    className: "h-64 w-96 max-w-[calc(100vw-3rem)] rounded-lg border",
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex flex-col gap-4 p-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="body-2 text-body">
            {paragraph}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Horizontal: Story = {
  args: {
    horizontalScrollbar: true,
    className: "h-64 w-96 max-w-[calc(100vw-3rem)] rounded-lg border",
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex w-[80rem] flex-col gap-4 p-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="body-2 text-body text-nowrap">
            {paragraph}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};
