import type { Meta, StoryObj } from "@storybook/react-vite";
import { Trash } from "lucide-react";
import React from "react";
import { expect, fn, screen, waitFor } from "storybook/test";
import { ContextMenu } from "./context-menu";

const triggerArea = (
  <div className="text-muted-fg flex h-40 w-72 items-center justify-center rounded-lg border border-dashed text-sm select-none">
    Right click here
  </div>
);

const meta = {
  title: "Components/ContextMenu",
  render: (args) => (
    <ContextMenu {...args} trigger={triggerArea}>
      <ContextMenu.Item>Cut</ContextMenu.Item>
      <ContextMenu.Item>Copy</ContextMenu.Item>
      <ContextMenu.Item>Paste</ContextMenu.Item>
      <ContextMenu.Submenu trigger="Share">
        <ContextMenu.Item>Email</ContextMenu.Item>
        <ContextMenu.Item>Copy link</ContextMenu.Item>
      </ContextMenu.Submenu>
      <ContextMenu.Separator />
      <ContextMenu.Item variant="danger">
        <Trash className="size-4" />
        Delete
      </ContextMenu.Item>
    </ContextMenu>
  ),
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onOpenChange: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.pointer({
      keys: "[MouseRight]",
      target: canvas.getByText("Right click here"),
    });
    const copy = await screen.findByRole("menuitem", { name: "Copy" });
    await expect(args.onOpenChange).toHaveBeenCalledWith(
      true,
      expect.anything(),
    );
    await expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveClass(
      "text-danger-fg",
    );
    await userEvent.click(copy);
    await waitFor(() =>
      expect(
        screen.queryByRole("menuitem", { name: "Copy" }),
      ).not.toBeInTheDocument(),
    );
  },
};

/**
 * Set `disabled` to let the browser's native context menu open instead.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Groups, checkbox items and radio items work the same as in `Menu`.
 */
export const Grouped: Story = {
  render: (args) => (
    <ContextMenu {...args} trigger={triggerArea}>
      <ContextMenu.Group label="View">
        <ContextMenu.CheckboxItem defaultChecked>Grid</ContextMenu.CheckboxItem>
        <ContextMenu.CheckboxItem>Hidden files</ContextMenu.CheckboxItem>
      </ContextMenu.Group>
      <ContextMenu.Group label="Sort by">
        <ContextMenu.RadioGroup defaultValue="name">
          <ContextMenu.RadioItem value="name">Name</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="size">Size</ContextMenu.RadioItem>
        </ContextMenu.RadioGroup>
      </ContextMenu.Group>
    </ContextMenu>
  ),
};
