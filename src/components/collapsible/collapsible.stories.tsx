import type { Meta, StoryObj } from "@storybook/react-vite";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../button";
import { Collapsible } from "./collapsible";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    summary: "Recovery keys",
    children: (
      <>
        <div>alien-bean-pasta</div>
        <div>wild-irish-burrito</div>
        <div>horse-battery-staple</div>
      </>
    ),
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Recovery keys" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByText("alien-bean-pasta")).toBeNull();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("alien-bean-pasta")).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "Recovery keys" }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("horse-battery-staple")).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Recovery keys" });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};

export const CustomTrigger: Story = {
  render: () => (
    <Collapsible
      trigger={(props, state) => (
        <Button variant="secondary" {...props}>
          {state.open ? (
            <EyeOff className="size-5" />
          ) : (
            <Eye className="size-5" />
          )}
          Recovery keys
        </Button>
      )}
    >
      <div>alien-bean-pasta</div>
      <div>wild-irish-burrito</div>
      <div>horse-battery-staple</div>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Recovery keys" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("alien-bean-pasta")).toBeVisible();
  },
};
