import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "../components/select";

const meta = {
  title: "Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    isValidatingMessage: { control: "text" },
    description: { control: "text" },
    placeholder: { control: "text" },
  },
  args: {
    label: "Fruit",
    description: "Select your favorite fruit from the list.",
    isValidating: false,
    isValidatingMessage: "Validating...",
    items: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" },
    ],
    placeholder: "Select a fruit",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    errorMessage: "This field is required.",
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
  },
};
