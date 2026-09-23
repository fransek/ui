import { Popover as BaseUIPopover } from "@base-ui/react/popover";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, screen } from "storybook/test";
import { Button } from "../components/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverTitle,
} from "../components/popover";

const meta = {
  title: "Components/Popover",
  render: (args) => (
    <Popover
      {...args}
      trigger={<Button variant="outline">Open Popover</Button>}
    >
      <PopoverClose />
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

export const Basic: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open Popover" }));
    await expect(
      await screen.findByText("Popover content"),
    ).toBeInTheDocument();
  },
};

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

const detachedPopover = BaseUIPopover.createHandle();

export const DetachedTrigger: Story = {
  render: (args) => {
    return (
      <>
        <BaseUIPopover.Trigger
          handle={detachedPopover}
          render={<Button variant="outline">Open detached</Button>}
        />
        <Popover {...args} handle={detachedPopover}>
          <PopoverTitle>Detached popover</PopoverTitle>
        </Popover>
      </>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(1);
    await userEvent.click(
      canvas.getByRole("button", { name: "Open detached" }),
    );
    await expect(
      await screen.findByText("Detached popover"),
    ).toBeInTheDocument();
  },
};
