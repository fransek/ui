import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, screen } from "storybook/test";
import { DatePicker } from "../components/date-picker";

const meta = {
  title: "Components/Fields/DatePicker",
  component: DatePicker,
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
    infoPopover: { control: "text" },
    invalid: { control: "boolean" },
  },
  args: {
    label: "Date of birth",
    description: "Please select your date of birth.",
    isValidating: false,
    isValidatingMessage: "Checking availability...",
    infoPopover:
      "Your date of birth is used to verify your age and provide a personalized experience. Please ensure it's accurate.",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

const defaultBirthDate = "01/15/1990";

export const WithDefaultValue: Story = {
  args: {
    defaultValue: defaultBirthDate,
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
    defaultValue: "03/10/2026",
  },
};

export const WithCustomFormat: Story = {
  args: {
    format: "yyyy-MM-dd",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [date, setDate] = React.useState("05/20/1995");
    return (
      <DatePicker
        {...args}
        value={date}
        onValueChange={(newDate) => setDate(newDate)}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "12/25/2000");
    await expect(input).toHaveValue("12/25/2000");
    const button = canvas.getByRole("button", { name: "Select date" });
    await userEvent.click(button);
    const dateCell = screen.getByRole("button", {
      name: "Wednesday, December 20th, 2000",
    });
    await userEvent.click(dateCell);
    await userEvent.click(button);
    await expect(input).toHaveValue("12/20/2000");
  },
};
