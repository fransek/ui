import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { Separator } from "./separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    width: 320,
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="heading-sm text-foreground">Fransek UI</h2>
        <p className="body-sm text-body">
          An accessible React component library built on Base UI.
        </p>
      </div>
      <Separator {...args} />
      <p className="body-sm text-body">
        Separators divide groups of related content.
      </p>
    </div>
  ),
  play: async ({ canvas }) => {
    const separator = canvas.getByRole("separator");
    await expect(separator).toHaveAttribute("aria-orientation", "horizontal");
  },
};

/**
 * Inside a row, a vertical separator stretches to the height of its siblings.
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="body-sm text-body flex h-5 items-center gap-4">
      <span>Docs</span>
      <Separator {...args} />
      <span>Components</span>
      <Separator {...args} />
      <span>Theme</span>
    </div>
  ),
  play: async ({ canvas }) => {
    const separators = canvas.getAllByRole("separator");
    await expect(separators).toHaveLength(2);
    for (const separator of separators) {
      await expect(separator).toHaveAttribute("aria-orientation", "vertical");
      await expect(separator.getBoundingClientRect().height).toBeGreaterThan(0);
    }
  },
};
