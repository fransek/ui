import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkles } from "lucide-react";
import React from "react";
import { expect, screen, waitFor } from "storybook/test";
import { Button } from "../button";
import { ToastProvider, ToastType, useToast } from "./toast";

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
      <Button variant="outline" onClick={() => notify("danger")}>
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

function ActionButtons() {
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "File deleted",
            description: "report.pdf was moved to the trash.",
            actions: [
              {
                label: "Undo",
                variant: "primary",
                onClick: () => toast.add({ title: "File restored" }),
              },
              { label: "View trash", variant: "ghost", closeOnClick: false },
            ],
          })
        }
      >
        Delete file
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "New version available",
            icon: <Sparkles className="text-primary-fg" />,
            closeButton: false,
            timeout: 0,
            actions: [
              { label: "Reload", variant: "primary" },
              { label: "Later" },
            ],
          })
        }
      >
        Custom icon
      </Button>
    </div>
  );
}

/**
 * Pass `actions` to render a row of buttons. Each one takes `Button` props
 * and closes the toast when clicked, unless it sets `closeOnClick: false`.
 * Use `icon` to replace the type's icon (or `null` to hide it), and
 * `closeButton` to override the provider's setting for one toast.
 */
export const Actions: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ActionButtons />
    </ToastProvider>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Delete file" }));
    const viewTrash = await screen.findByRole("button", { name: "View trash" });
    await userEvent.click(viewTrash);
    await expect(screen.getByText("File deleted")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Undo" }));
    await expect(await screen.findByText("File restored")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText("File deleted")).not.toBeInTheDocument(),
    );
  },
};

function PromiseButton() {
  const toast = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast
          .promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: { title: "Saving…" },
            success: { title: "Saved", description: "Your changes are live." },
            error: { title: "Couldn't save" },
          })
          .catch(() => {})
      }
    >
      Save
    </Button>
  );
}

/**
 * `toast.promise()` shows a spinner while the promise is pending, then
 * switches to the success or error icon. A `loading` toast never times out.
 */
export const PromiseToast: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <PromiseButton />
    </ToastProvider>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await expect(await screen.findByText("Saving…")).toBeInTheDocument();
    await expect(
      await screen.findByText("Saved", {}, { timeout: 3000 }),
    ).toBeInTheDocument();
  },
};
