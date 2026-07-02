import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "../components/select";

const meta = {
  title: "Components/Fields/Select",
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
    infoPopover: { control: "text" },
    invalid: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    label: "Fruit",
    description: "Select your favorite fruit from the list.",
    isValidating: false,
    isValidatingMessage: "Validating...",
    infoPopover:
      "Fruits are a great source of vitamins and minerals. Choose wisely!",
    items: [
      { label: "🍎 Apple", value: "apple" },
      { label: "🍌 Banana", value: "banana" },
      { label: "🍊 Orange", value: "orange" },
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

/**
 * Pass an array of groups (each with a `label` heading and its own `items`) to
 * render grouped options.
 */
export const Grouped: Story = {
  args: {
    label: "Produce",
    description: "Select your favorite produce from the list.",
    isValidating: false,
    isValidatingMessage: "Validating...",
    infoPopover: "Produce includes fruits and vegetables. Choose wisely!",
    placeholder: "Select a produce",
    items: [
      {
        label: "Fruits",
        items: [
          { label: "🍎 Apple", value: "apple" },
          { label: "🍌 Banana", value: "banana" },
          { label: "🍊 Orange", value: "orange" },
        ],
      },
      {
        label: "Vegetables",
        items: [
          { label: "🥕 Carrot", value: "carrot" },
          { label: "🥦 Broccoli", value: "broccoli" },
          { label: "🥬 Spinach", value: "spinach" },
        ],
      },
    ],
  },
};

/**
 * Pass a `Record` that maps each value to its label as a shorthand for a flat
 * list of items.
 */
export const RecordItems: Story = {
  args: {
    items: {
      apple: "🍎 Apple",
      banana: "🍌 Banana",
      orange: "🍊 Orange",
    },
  },
};
