import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "../components/popover";

const meta = {
  title: "Components/Popover",
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger
        render={<Button variant="outline">Open Popover</Button>}
      />
      <PopoverTitle className="mb-2">Popover content</PopoverTitle>
      <PopoverDescription className="mb-4">
        This popover can contain contextual information or actions.
      </PopoverDescription>
      <div className="flex justify-end">
        <PopoverClose render={<Button size="sm">Close</Button>} />
      </div>
    </Popover>
  ),
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithArrow: Story = {
  args: {
    arrow: true,
  },
};

export const Modal: Story = {
  args: {
    modal: true,
  },
};
