import type { Meta, StoryObj } from "@storybook/react-vite";
import { Save, Trash } from "lucide-react";
import React from "react";
import { Button } from "../components/button";
import { Tooltip, TooltipProvider } from "../components/tooltip";

const meta = {
  title: "Components/Tooltip",
  render: (args) => (
    <Tooltip
      {...args}
      trigger={
        <Button variant="outline" size="icon" aria-label="Save">
          <Save className="size-4" />
        </Button>
      }
    >
      Save
    </Tooltip>
  ),
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithoutArrow: Story = {
  args: {
    arrow: false,
  },
};

export const Side: Story = {
  args: {
    positionerProps: { side: "right" },
  },
};

export const Grouped: Story = {
  render: (args) => (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Tooltip
          {...args}
          trigger={
            <Button variant="outline" size="icon" aria-label="Save">
              <Save className="size-4" />
            </Button>
          }
        >
          Save
        </Tooltip>
        <Tooltip
          {...args}
          trigger={
            <Button variant="outline" size="icon" aria-label="Delete">
              <Trash className="text-danger-fg size-4" />
            </Button>
          }
        >
          Delete
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};
