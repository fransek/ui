import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import { ToastProvider, ToastType, useToast } from "../components/toast";

function ToastButtons() {
  const toast = useToast();

  const notify = (type?: ToastType) =>
    toast.add({
      type,
      title: type ? `${type[0].toUpperCase()}${type.slice(1)}` : "Notification",
      description: "This is a toast notification.",
    });

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => notify()}>
        Default
      </Button>
      <Button variant="outline" onClick={() => notify("info")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => notify("success")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => notify("warning")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => notify("error")}>
        Error
      </Button>
    </div>
  );
}

const meta = {
  title: "Components/Toast",
  component: ToastProvider,
  render: (args) => (
    <ToastProvider {...args}>
      <ToastButtons />
    </ToastProvider>
  ),
  parameters: {
    layout: "centered",
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    timeout: { control: "number" },
    limit: { control: "number" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    timeout: 5000,
  },
};

export const TopCenter: Story = {
  args: {
    position: "top-center",
  },
};

export const Persistent: Story = {
  args: {
    timeout: 0,
  },
};

/**
 * `position` also accepts a responsive map keyed by breakpoint. Here toasts are
 * full-width and bottom-centered on small screens, then move to the top-right
 * corner from `md` up. Resize the viewport to see the anchor flip.
 */
export const Responsive: Story = {
  args: {
    position: {
      base: "bottom-center",
      md: "top-right",
    },
  },
};
