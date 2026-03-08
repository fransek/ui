import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
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
    placeholder: "Pick a date",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox");

    await expect(combobox).toBeInTheDocument();
    await expect(combobox).toHaveAttribute("aria-haspopup", "dialog");
    await expect(combobox).toHaveAttribute("readonly");

    await combobox.click();
    await expect(combobox).toHaveAttribute("aria-expanded", "true");
  },
};

const defaultBirthDate = new Date(1990, 0, 15);

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
    defaultValue: new Date(),
  },
};
