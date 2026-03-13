import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker } from "../components/date-range-picker";

const meta = {
  title: "Components/Fields/DateRangePicker",
  component: DateRangePicker,
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
    label: "Vacation dates",
    description: "Please select the start and end dates for your vacation.",
    placeholder: "Pick a date range",
    isValidating: false,
    isValidatingMessage: "Checking availability...",
    infoPopover:
      "Your selected date range helps us estimate availability and pricing.",
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

const defaultDateRange = {
  from: new Date(2026, 5, 10),
  to: new Date(2026, 5, 17),
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: defaultDateRange,
  },
};

export const Error: Story = {
  args: {
    errorMessage: "Please select both start and end dates.",
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
    defaultValue: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
  },
};
