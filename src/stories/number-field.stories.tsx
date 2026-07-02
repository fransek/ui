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
    description: "Choose how many items to add.",
    defaultValue: 1,
    min: 0,
    max: 10,
    step: 1,
    isValidating: false,
    isValidatingMessage: "Checking availability...",
    infoPopover: "You can add between 0 and 10 items to your cart.",
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    errorMessage: "Please choose a valid quantity.",
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Formatted: Story = {
  args: {
    label: "Price",
    description: "Enter the amount in USD.",
    defaultValue: 9.99,
    min: 0,
    max: undefined,
    step: 0.5,
    format: {
      style: "currency",
      currency: "USD",
    },
  },
};
