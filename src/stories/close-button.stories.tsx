import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { CloseButton } from "../components/close-button";

const meta = {
  title: "Components/CloseButton",
  component: CloseButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof CloseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const TopRight: Story = {
  args: {
    position: "top-right",
  },
  render: (args) => (
    <div className="card relative size-50">
      <CloseButton {...args} />
    </div>
  ),
};

export const CustomVariant: Story = {
  args: {
    variant: "secondary",
  },
};
