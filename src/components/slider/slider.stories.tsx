import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Slider } from "./slider";

const meta = {
  title: "Components/Fields/Slider",
  component: Slider,
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
    showValue: { control: "boolean" },
  },
  args: {
    label: "Volume",
    defaultValue: 25,
    isValidating: false,
    isValidatingMessage: "Validating...",
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvas, userEvent }) => {
    const slider = canvas.getByRole("slider", { name: "Volume" });
    await expect(slider).toHaveValue("25");
    await userEvent.click(slider);
    await userEvent.keyboard("{ArrowRight}");
    await expect(slider).toHaveValue("26");
    await expect(canvas.getByText("26")).toBeInTheDocument();
  },
};

export const WithDescription: Story = {
  args: {
    description: "Adjust the playback volume.",
    infoPopover: "The volume is applied to all output devices.",
  },
};

export const WithoutValue: Story = {
  args: {
    showValue: false,
  },
};

export const Range: Story = {
  args: {
    label: "Price range",
    defaultValue: [25, 75],
    format: { style: "currency", currency: "USD", maximumFractionDigits: 0 },
    thumbProps: {
      getAriaLabel: (index) =>
        index === 0 ? "Minimum price" : "Maximum price",
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("slider", { name: "Minimum price" }),
    ).toHaveValue("25");
    await expect(
      canvas.getByRole("slider", { name: "Maximum price" }),
    ).toHaveValue("75");
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    errorMessage: "Volume is too high.",
    defaultValue: 90,
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("slider", { name: "Volume" }),
    ).toHaveAttribute("aria-orientation", "vertical");
  },
};
