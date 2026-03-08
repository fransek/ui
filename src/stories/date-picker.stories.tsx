import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { DatePicker } from "../components/date-picker";

const meta = {
  title: "Components/DatePicker",
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
  },
  args: {
    label: "Date of birth",
    description: "Please select your date of birth.",
    placeholder: "Pick a date",
    isValidating: false,
    isValidatingMessage: "Checking availability...",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
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
export const KeyboardOnly: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: "Date of birth" });

    await userEvent.tab();
    await expect(trigger).toHaveFocus();

    await userEvent.keyboard("{Enter}");

    const firstFocusedDay = canvasElement.ownerDocument
      .activeElement as HTMLButtonElement;
    await expect(firstFocusedDay.tagName).toBe("BUTTON");
    await expect(firstFocusedDay.getAttribute("aria-label")).toMatch(/\d{4}/);
    await expect(firstFocusedDay).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    const nextFocusedDay = canvasElement.ownerDocument
      .activeElement as HTMLButtonElement;
    await expect(nextFocusedDay).not.toBe(firstFocusedDay);
    await expect(nextFocusedDay).toHaveFocus();
  },
};
