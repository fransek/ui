import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Field } from "../components/field";

const meta = {
  title: "Field",
  component: Field,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    isValidatingMessage: { control: "text" },
    description: { control: "text" },
  },
  args: {
    label: "Username",
    description: "Please enter your username.",
    isValidating: false,
    isValidatingMessage: "Checking availability...",
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderWithInput = (args: React.ComponentProps<typeof Field>) => (
  <Field {...args}>
    <input
      className="w-full min-w-40 rounded-lg border p-2 transition-colors outline-none"
      placeholder="Enter username"
    />
  </Field>
);

export const Basic: Story = {
  render: renderWithInput,
  args: {},
};

export const Error: Story = {
  render: renderWithInput,
  args: {
    errorMessage: "This field is required.",
  },
};

export const Validating: Story = {
  render: renderWithInput,
  args: {
    isValidating: true,
  },
};
