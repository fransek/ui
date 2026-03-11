import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
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

export const Basic: Story = {
  args: {},
};

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

export const WithCalendarProps: Story = {
  args: {
    calendarProps: {
      captionLayout: "dropdown",
      startMonth: new Date(1990, 0, 1),
      endMonth: new Date(2030, 11, 31),
    },
  },
};

export const Controlled: Story = {
  args: {},
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
};
