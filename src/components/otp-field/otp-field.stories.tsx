import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn } from "storybook/test";
import { Button } from "../button";
import { OTPField, OTPFieldInput, OTPFieldSeparator } from "./otp-field";

const meta = {
  title: "Components/Fields/OTPField",
  component: OTPField,
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
    mask: { control: "boolean" },
    length: { control: "number" },
    groupSize: { control: "number" },
    validationType: {
      control: "select",
      options: ["numeric", "alpha", "alphanumeric", "none"],
    },
  },
  args: {
    label: "Verification code",
    description: "Enter the 6-digit code we sent to your email.",
    length: 6,
    isValidating: false,
    isValidatingMessage: "Verifying code...",
    onValueComplete: fn(),
  },
} satisfies Meta<typeof OTPField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const slots = canvas.getAllByRole("textbox", { name: "Verification code" });
    await expect(slots).toHaveLength(6);

    await userEvent.click(slots[0]);
    await userEvent.keyboard("12a3456");

    await expect(args.onValueComplete).toHaveBeenCalledWith(
      "123456",
      expect.anything(),
    );
  },
};

/** Use `groupSize` to split the slots into groups, e.g. `123-456`. */
export const Grouped: Story = {
  args: {
    groupSize: 3,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("separator")).toHaveLength(1);
  },
};

export const Paste: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getAllByRole("textbox")[0]);
    await userEvent.paste("987654");

    const values = canvas
      .getAllByRole<HTMLInputElement>("textbox")
      .map((input) => input.value)
      .join("");
    await expect(values).toBe("987654");
    await expect(args.onValueComplete).toHaveBeenCalled();
  },
};

export const Error: Story = {
  args: {
    defaultValue: "123456",
    errorMessage: "That code is incorrect or has expired.",
  },
};

export const Validating: Story = {
  args: {
    defaultValue: "123456",
    isValidating: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/** `mask` hides entered characters, like a password input. */
export const Masked: Story = {
  args: {
    label: "PIN",
    description: "Enter your 4-digit PIN.",
    length: 4,
    mask: true,
  },
  play: async ({ canvasElement, userEvent }) => {
    const slots = Array.from(
      canvasElement.querySelectorAll<HTMLInputElement>("input"),
    );
    await userEvent.click(slots[0]);
    await userEvent.keyboard("12");

    // The native text stays hidden so iOS can't echo the typed character;
    // filled slots show a painted dot instead.
    await expect(slots[0]).toHaveAttribute("type", "password");
    await expect(getComputedStyle(slots[0]).color).toBe("rgba(0, 0, 0, 0)");
    await expect(getComputedStyle(slots[0]).backgroundImage).toContain(
      "radial-gradient",
    );
    await expect(getComputedStyle(slots[2]).backgroundImage).toBe("none");
  },
};

/** `validationType="alphanumeric"` accepts letters as well as digits. */
export const Alphanumeric: Story = {
  args: {
    label: "Recovery code",
    description: "Codes contain letters and numbers.",
    validationType: "alphanumeric",
    normalizeValue: (value) => value.toUpperCase(),
    groupSize: 3,
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getAllByRole("textbox")[0]);
    await userEvent.keyboard("ab1");
    await expect(
      canvas.getAllByRole<HTMLInputElement>("textbox")[0].value,
    ).toBe("A");
  },
};

/**
 * Pass `children` built from `OTPFieldInput` and `OTPFieldSeparator` for a
 * custom slot layout.
 */
export const CustomLayout: Story = {
  args: {
    label: "Pairing code",
    description: undefined,
    length: 8,
  },
  render: (args) => (
    <OTPField {...args}>
      {Array.from({ length: 4 }, (_, index) => (
        <OTPFieldInput key={index} />
      ))}
      <OTPFieldSeparator className="w-4" />
      {Array.from({ length: 4 }, (_, index) => (
        <OTPFieldInput key={index} />
      ))}
    </OTPField>
  ),
};

/**
 * With `name`, the code is submitted with the owning form. `autoSubmit`
 * submits it as soon as every slot is filled.
 */
export const InForm: Story = {
  args: {
    name: "code",
    required: true,
    autoSubmit: true,
  },
  render: (args) => {
    const [submitted, setSubmitted] = React.useState<string | null>(null);
    return (
      <form
        className="flex flex-col items-start gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(String(new FormData(event.currentTarget).get("code")));
        }}
      >
        <OTPField {...args} />
        <Button type="submit">Verify</Button>
        {submitted && <p className="body">Submitted: {submitted}</p>}
      </form>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getAllByRole("textbox")[0]);
    await userEvent.keyboard("246810");
    await expect(
      await canvas.findByText("Submitted: 246810"),
    ).toBeInTheDocument();
  },
};
