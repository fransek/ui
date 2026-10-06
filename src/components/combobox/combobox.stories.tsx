import type { Meta, StoryObj } from "@storybook/react-vite";

import { Search } from "lucide-react";
import React from "react";
import { expect, screen, waitFor } from "storybook/test";
import { Combobox } from "./combobox";

const FRUITS = [
  { label: "🍎 Apple", value: "apple" },
  { label: "🍌 Banana", value: "banana" },
  { label: "🍒 Cherry", value: "cherry" },
  { label: "🍇 Grape", value: "grape" },
  { label: "🥭 Mango", value: "mango" },
  { label: "🍊 Orange", value: "orange" },
  { label: "🍓 Strawberry", value: "strawberry" },
];

const meta = {
  title: "Components/Fields/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
    width: 400,
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    isValidatingMessage: { control: "text" },
    description: { control: "text" },
    infoPopover: { control: "text" },
    emptyMessage: { control: "text" },
    invalid: { control: "boolean" },
    clearable: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Fruit",
    description: "Pick a fruit from the list.",
    placeholder: "Select a fruit",
    isValidating: false,
    isValidatingMessage: "Validating...",
    infoPopover:
      "Fruits are a great source of vitamins and minerals. Choose wisely!",
    items: FRUITS,
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("combobox", { name: "Fruit" });
    await userEvent.type(input, "man");
    const option = await screen.findByRole("option", { name: "🥭 Mango" });
    await expect(
      screen.queryByRole("option", { name: "🍎 Apple" }),
    ).not.toBeInTheDocument();
    await userEvent.click(option);
    await waitFor(() => expect(input).toHaveValue("🥭 Mango"));
  },
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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Set `multiple` to select several items. Selections are rendered as removable
 * chips inside the input; `Backspace` on an empty input removes the last one.
 */
export const Multiple: Story = {
  args: {
    label: "Fruits",
    description: "Pick as many fruits as you like.",
    placeholder: "Select fruits",
    multiple: true,
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("combobox", { name: "Fruits" });
    await userEvent.click(input);
    await userEvent.click(
      await screen.findByRole("option", { name: "🍎 Apple" }),
    );
    await userEvent.click(
      await screen.findByRole("option", { name: "🍌 Banana" }),
    );
    await userEvent.keyboard("{Escape}");

    await expect(canvas.getByText("🍎 Apple")).toBeInTheDocument();
    await expect(canvas.getByText("🍌 Banana")).toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole("button", { name: "Remove 🍎 Apple" }),
    );
    await waitFor(() =>
      expect(canvas.queryByText("🍎 Apple")).not.toBeInTheDocument(),
    );
    await expect(input).toBeInTheDocument();
  },
};

/**
 * Items can also be plain strings — the string itself is matched against the
 * query, shown in the input and submitted as the value.
 */
export const StringItems: Story = {
  args: {
    label: "Language",
    description: "Pick a language.",
    placeholder: "Select a language",
    infoPopover: undefined,
    items: ["Go", "JavaScript", "Python", "Rust", "TypeScript", "Zig"],
    defaultValue: "TypeScript",
  },
};

/**
 * Pass an array of groups (each with a `label` heading and its own `items`) to
 * render grouped options. Filtering applies within each group, and empty groups
 * are hidden automatically.
 */
export const Grouped: Story = {
  args: {
    label: "Produce",
    description: "Pick a fruit or a vegetable.",
    placeholder: "Select produce",
    infoPopover: "Produce includes fruits and vegetables. Choose wisely!",
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
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox"), "car");
    await expect(
      await screen.findByRole("option", { name: "🥕 Carrot" }),
    ).toBeInTheDocument();
    await expect(screen.queryByText("Fruits")).not.toBeInTheDocument();
    await expect(screen.getByText("Vegetables")).toBeInTheDocument();
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

/**
 * The selection survives re-renders even when the `Record` is recreated on
 * every render, as an inline literal is.
 */
export const ControlledRecordItems: Story = {
  args: {
    label: "Fruits",
    multiple: true,
  },
  render: function Render(args) {
    const [value, setValue] = React.useState<unknown[]>([]);
    return (
      <Combobox
        {...args}
        items={{ apple: "🍎 Apple", banana: "🍌 Banana", orange: "🍊 Orange" }}
        value={value}
        onValueChange={(next) => setValue(next as unknown[])}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Fruits" }));
    await userEvent.click(
      await screen.findByRole("option", { name: "🍎 Apple" }),
    );
    await waitFor(() =>
      expect(screen.getByRole("option", { name: "🍎 Apple" })).toHaveAttribute(
        "aria-selected",
        "true",
      ),
    );
    // Clicking the selected item again deselects it rather than duplicating it.
    await userEvent.click(screen.getByRole("option", { name: "🍎 Apple" }));
    await waitFor(() =>
      expect(
        canvas.queryByRole("button", { name: "Remove 🍎 Apple" }),
      ).not.toBeInTheDocument(),
    );
  },
};

/**
 * Items of any shape can be used by passing `itemToStringLabel`, which is used
 * to filter, fill the input, and render the options and chips.
 */
export const CustomObjectItems: Story = {
  args: {
    label: "User",
    description: undefined,
    infoPopover: undefined,
    placeholder: "Select users",
    multiple: true,
    items: [
      { id: 1, name: "Ada Lovelace" },
      { id: 2, name: "Alan Turing" },
      { id: 3, name: "Grace Hopper" },
    ],
    itemToStringLabel: (user) => (user as { name: string }).name,
    itemToStringValue: (user) => String((user as { id: number }).id),
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "User" }));
    await userEvent.click(
      await screen.findByRole("option", { name: "Ada Lovelace" }),
    );
    await expect(
      canvas.getByRole("button", { name: "Remove Ada Lovelace" }),
    ).toBeInTheDocument();
  },
};

export const WithLeftAdornment: Story = {
  args: {
    label: "Search",
    description: undefined,
    infoPopover: undefined,
    leftAdornment: <Search className="size-5" />,
  },
};

/**
 * `emptyMessage` is rendered when nothing matches the query, and announced
 * politely to screen readers.
 */
export const CustomEmptyMessage: Story = {
  args: {
    emptyMessage: "No fruit by that name. Try something juicier.",
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox"), "xyz");
    await expect(
      await screen.findByText("No fruit by that name. Try something juicier."),
    ).toBeInTheDocument();
  },
};
