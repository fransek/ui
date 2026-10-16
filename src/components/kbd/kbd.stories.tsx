import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowBigUp, Command, Save } from "lucide-react";
import React from "react";
import { expect, screen } from "storybook/test";
import { Button } from "../button";
import { Menu } from "../menu";
import { Tooltip } from "../tooltip";
import { Kbd, KbdGroup } from "./kbd";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "Esc",
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvas }) => {
    const key = canvas.getByText("Esc");
    await expect(key.tagName).toBe("KBD");
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Kbd {...args} size="sm" />
      <Kbd {...args} size="md" />
    </div>
  ),
};

/**
 * Use the `current` variant on colored surfaces. It derives its colors from
 * the surrounding text, so it stays legible wherever it is placed.
 */
export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Kbd {...args} variant="default" />
      <Button>
        Close
        <Kbd {...args} variant="current" />
      </Button>
    </div>
  ),
};

/**
 * Wrap keys in a `KbdGroup` to mark them up as one key combination.
 * Icons can be used for modifier keys; give them an accessible name.
 */
export const Combination: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-3">
      <KbdGroup>
        <Kbd {...args}>Ctrl</Kbd>+<Kbd {...args}>Shift</Kbd>+
        <Kbd {...args}>P</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd {...args}>
          <Command aria-label="Command" />
        </Kbd>
        <Kbd {...args}>
          <ArrowBigUp aria-label="Shift" />
        </Kbd>
        <Kbd {...args}>P</Kbd>
      </KbdGroup>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Command")).toBeInTheDocument();
  },
};

export const InText: Story = {
  render: (args) => (
    <p className="body">
      Press{" "}
      <KbdGroup>
        <Kbd {...args}>Ctrl</Kbd>+<Kbd {...args}>K</Kbd>
      </KbdGroup>{" "}
      to open the command palette.
    </p>
  ),
};

export const InTooltip: Story = {
  render: (args) => (
    <Tooltip
      trigger={
        <Button variant="outline" size="icon" aria-label="Save">
          <Save className="size-4" />
        </Button>
      }
    >
      <span className="flex items-center gap-2">
        Save
        <KbdGroup>
          <Kbd {...args} variant="current" size="sm">
            Ctrl
          </Kbd>
          <Kbd {...args} variant="current" size="sm">
            S
          </Kbd>
        </KbdGroup>
      </span>
    </Tooltip>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(canvas.getByRole("button", { name: "Save" }));
    await expect(await screen.findByText("Ctrl")).toBeInTheDocument();
  },
};

export const InMenu: Story = {
  render: (args) => (
    <Menu trigger={<Button variant="outline">Edit</Button>}>
      {[
        ["Undo", "Z"],
        ["Redo", "Y"],
        ["Copy", "C"],
        ["Paste", "V"],
      ].map(([label, key]) => (
        <Menu.Item key={label}>
          {label}
          <KbdGroup className="ml-auto pl-4">
            <Kbd {...args} variant="current" size="sm">
              Ctrl
            </Kbd>
            <Kbd {...args} variant="current" size="sm">
              {key}
            </Kbd>
          </KbdGroup>
        </Menu.Item>
      ))}
    </Menu>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Edit" }));
    await expect(
      await screen.findByRole("menuitem", { name: /Copy/ }),
    ).toBeInTheDocument();
  },
};
