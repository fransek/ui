import type { Meta, StoryObj } from "@storybook/react-vite";

import { NumberField } from "../components/number-field";

const meta = {
  title: "Components/Fields/NumberField",
  component: NumberField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    isValidatingMessage: { control: "text" },
    description: { control: "text" },
    infoPopover: { control: "text" },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
  args: {
    label: "Quantity",
    description: "Enter a quantity.",
    isValidating: false,
    isValidatingMessage: "Validating...",
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithMinMax: Story = {
  args: {
    label: "Age",
    description: "Must be between 18 and 99.",
    min: 18,
    max: 99,
    defaultValue: 18,
  },
};

export const WithStep: Story = {
  args: {
    label: "Price",
    description: "Adjust in increments of 0.5.",
    step: 0.5,
    defaultValue: 1,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 5,
  },
};

export const Error: Story = {
  args: {
    errorMessage: "Value must be at least 1.",
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
  },
};
