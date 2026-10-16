import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { tw } from "../../lib/utils";
import { Button } from "../button";
import { Progress } from "./progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["primary", "muted", "danger", "success", "warning"],
    },
    label: { control: "text" },
    showValue: { control: "boolean" },
    value: { control: "number" },
  },
  args: {
    className: tw("w-56"),
    label: "Uploading files",
    value: 40,
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvas }) => {
    const progressbar = canvas.getByRole("progressbar", {
      name: "Uploading files",
    });
    await expect(progressbar).toHaveAttribute("aria-valuenow", "40");
    await expect(canvas.getByText("40%")).toBeVisible();
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Loading",
    value: null,
  },
  play: async ({ canvas }) => {
    const progressbar = canvas.getByRole("progressbar", { name: "Loading" });
    await expect(progressbar).not.toHaveAttribute("aria-valuenow");
    await expect(progressbar).toHaveAttribute("data-indeterminate");
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    "aria-label": "Uploading files",
  },
};

export const WithoutValue: Story = {
  args: {
    showValue: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress label="Small" size="sm" value={40} />
      <Progress label="Medium" size="md" value={40} />
      <Progress label="Large" size="lg" value={40} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Progress label="Primary" variant="primary" value={65} />
      <Progress label="Muted" variant="muted" value={65} />
      <Progress label="Success" variant="success" value={65} />
      <Progress label="Warning" variant="warning" value={65} />
      <Progress label="Danger" variant="danger" value={65} />
    </div>
  ),
};

export const CustomRange: Story = {
  args: {
    label: "Steps completed",
    min: 0,
    max: 5,
    value: 3,
    format: { style: "decimal" },
    getAriaValueText: (formattedValue, value) =>
      value == null ? "Indeterminate" : `${formattedValue} of 5 steps`,
  },
};

export const Simulated: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState(0);
    const [running, setRunning] = React.useState(false);

    React.useEffect(() => {
      if (!running) return;
      const id = setInterval(() => {
        setValue((current) => {
          const next = Math.min(100, current + Math.round(Math.random() * 15));
          if (next === 100) setRunning(false);
          return next;
        });
      }, 400);
      return () => clearInterval(id);
    }, [running]);

    return (
      <div className="flex flex-col items-start gap-4">
        <Progress
          {...args}
          value={value}
          variant={value === 100 ? "success" : "primary"}
        />
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setValue(0);
            setRunning(true);
          }}
          disabled={running}
        >
          {value === 100 ? "Restart" : "Start"}
        </Button>
      </div>
    );
  },
};
