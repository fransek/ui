import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import React from "react";
import { expect, within } from "storybook/test";
import { Button } from "../button";
import { ButtonGroup } from "./button-group";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SplitButton: Story = {
  args: {
    "aria-label": "Save options",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="tertiary">Save</Button>
      <Button variant="tertiary" size="icon" aria-label="More save options">
        <ChevronDown className="size-5" />
      </Button>
    </ButtonGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group", { name: "Save options" });
    await expect(within(group).getAllByRole("button")).toHaveLength(2);
  },
};

export const Segmented: Story = {
  args: {
    "aria-label": "Text alignment",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: {
    "aria-label": "View",
    orientation: "vertical",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  ),
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole("group", { name: "View" });
    await expect(group).toHaveAttribute("data-orientation", "vertical");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ButtonGroup key={size} size={size} aria-label={`Size ${size}`}>
          <Button variant="tertiary">Save</Button>
          <Button variant="tertiary" size="icon" aria-label="More options">
            <ChevronDown className="size-5" />
          </Button>
        </ButtonGroup>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const small = within(canvas.getByRole("group", { name: "Size sm" }));
    const large = within(canvas.getByRole("group", { name: "Size lg" }));
    // Group size reaches the buttons; an explicit `size="icon"` still wins.
    await expect(small.getByRole("button", { name: "Save" })).toHaveClass(
      "text-xs",
    );
    await expect(large.getByRole("button", { name: "Save" })).toHaveClass(
      "text-base",
    );
    await expect(
      large.getByRole("button", { name: "More options" }),
    ).not.toHaveClass("text-base");
  },
};
