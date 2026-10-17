import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rocket } from "lucide-react";
import React, { useState } from "react";
import { expect } from "storybook/test";
import { Button } from "../button";
import { Alert } from "./alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    width: 480,
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger"],
    },
  },
  args: {
    variant: "info",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Alert {...args}>
      <Alert.Title>Scheduled maintenance</Alert.Title>
      <Alert.Description>
        The dashboard will be read-only on Sunday between 02:00 and 04:00 UTC.
      </Alert.Description>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const alert = canvasElement.querySelector("[data-variant]");
    await expect(alert).toHaveAttribute("data-variant", "info");
    await expect(alert).not.toHaveAttribute("role");
    await expect(alert?.querySelector("svg")?.parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Alert {...args} variant="info">
        <Alert.Title>A new version is available</Alert.Title>
        <Alert.Description>Reload the page to update.</Alert.Description>
      </Alert>
      <Alert {...args} variant="success">
        <Alert.Title>Payment received</Alert.Title>
        <Alert.Description>Your receipt is on its way.</Alert.Description>
      </Alert>
      <Alert {...args} variant="warning">
        <Alert.Title>Your trial ends in 3 days</Alert.Title>
        <Alert.Description>
          Add a payment method to keep your projects.
        </Alert.Description>
      </Alert>
      <Alert {...args} variant="danger">
        <Alert.Title>Deployment failed</Alert.Title>
        <Alert.Description>
          The build exited with code 1. Check the logs for details.
        </Alert.Description>
      </Alert>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args} variant="success">
      <Alert.Title>Your changes have been saved.</Alert.Title>
    </Alert>
  ),
};

/** Pass any element as `icon`, or `null` to render no icon. */
export const CustomIcon: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Alert {...args} icon={<Rocket />}>
        <Alert.Title>Launch week</Alert.Title>
        <Alert.Description>New features ship every day.</Alert.Description>
      </Alert>
      <Alert {...args} icon={null}>
        <Alert.Description>An alert without an icon.</Alert.Description>
      </Alert>
    </div>
  ),
  play: async ({ canvas }) => {
    const plain = canvas.getByText("An alert without an icon.");
    await expect(
      plain.closest("[data-variant]")?.querySelector("svg"),
    ).toBeNull();
  },
};

export const WithActions: Story = {
  render: (args) => (
    <Alert {...args} variant="warning">
      <Alert.Title>Unsaved changes</Alert.Title>
      <Alert.Description>
        You have edits that haven&apos;t been published yet.
      </Alert.Description>
      <Alert.Actions>
        <Button size="sm">Publish</Button>
        <Button size="sm" variant="danger-subtle">
          Discard
        </Button>
      </Alert.Actions>
    </Alert>
  ),
};

/**
 * `Alert.Close` adds a dismiss button. The alert doesn't hide itself, so
 * keep its visibility in state.
 */
export const Dismissible: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(true);

    return open ? (
      <Alert {...args}>
        <Alert.Title>Tip</Alert.Title>
        <Alert.Description>
          You can drag and drop files anywhere on this page.
        </Alert.Description>
        <Alert.Close onClick={() => setOpen(false)} />
      </Alert>
    ) : (
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="m-auto"
      >
        Show tip
      </Button>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(canvas.queryByText("Tip")).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Show tip" }));
    await expect(canvas.getByText("Tip")).toBeInTheDocument();
  },
};

/**
 * Alerts render no live region by default. When an alert appears in response
 * to something the user did, give it `role="alert"` so screen readers
 * announce it.
 */
export const Announced: Story = {
  render: function Render(args) {
    const [error, setError] = useState(false);

    return (
      <div className="flex flex-col items-start gap-4">
        <Button onClick={() => setError(true)}>Submit</Button>
        {error && (
          <Alert {...args} variant="danger" role="alert">
            <Alert.Close onClick={() => setError(false)} />
            <Alert.Title>Couldn&apos;t submit the form</Alert.Title>
            <Alert.Description>
              Check your connection and retry.
            </Alert.Description>
          </Alert>
        )}
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Couldn't submit the form",
    );
  },
};
