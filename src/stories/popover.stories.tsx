import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, screen } from "storybook/test";
import { Button } from "../components/button";
import { Popover } from "../components/popover";

const meta = {
  title: "Components/Popover",
  render: (args) => (
    <Popover
      {...args}
      trigger={<Button variant="outline">Open Popover</Button>}
    >
      <Popover.Close />
      <Popover.Title className="mb-2">Popover content</Popover.Title>
      <Popover.Description className="mb-4">
        This popover can contain contextual information or actions.
      </Popover.Description>
      <div className="flex justify-end">
        <Popover.Close render={<Button size="sm">Close</Button>} />
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

export const DetachedTrigger: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={buttonRef} variant="outline" onClick={() => setOpen(true)}>
          Open detached
        </Button>
        <Popover
          {...args}
          open={open}
          onOpenChange={setOpen}
          positionerProps={{ anchor: buttonRef }}
        >
          <Popover.Title>Detached popover</Popover.Title>
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
