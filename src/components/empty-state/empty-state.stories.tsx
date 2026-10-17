import type { Meta, StoryObj } from "@storybook/react-vite";
import { FolderOpen, Inbox, Plus, SearchX } from "lucide-react";
import React from "react";
import { expect } from "storybook/test";
import { Button } from "../button";
import { Card } from "../card";
import { Table } from "../table";
import { EmptyState } from "./empty-state";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
    width: 560,
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
    },
  },
  args: {
    size: "md",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyState.Icon>
        <FolderOpen />
      </EmptyState.Icon>
      <EmptyState.Title>No projects yet</EmptyState.Title>
      <EmptyState.Description>
        Projects group your files and collaborators. Create one to get started.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button>
          <Plus />
          New project
        </Button>
        <Button variant="outline">Import</Button>
      </EmptyState.Actions>
    </EmptyState>
  ),
  play: async ({ canvas, canvasElement }) => {
    const root = canvasElement.querySelector("[data-size]");
    await expect(root).toHaveAttribute("data-size", "md");
    await expect(
      canvasElement.querySelector("[data-variant=default]"),
    ).toHaveAttribute("aria-hidden", "true");
    await expect(
      canvas.getByRole("button", { name: "New project" }),
    ).toBeVisible();
  },
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <EmptyState {...args}>
      <EmptyState.Icon>
        <Inbox />
      </EmptyState.Icon>
      <EmptyState.Title>You&apos;re all caught up</EmptyState.Title>
      <EmptyState.Description>
        New notifications show up here.
      </EmptyState.Description>
    </EmptyState>
  ),
};

/** Title and description alone work for the quietest cases. */
export const TextOnly: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyState.Title>Nothing here</EmptyState.Title>
      <EmptyState.Description>
        Items you archive will appear in this list.
      </EmptyState.Description>
    </EmptyState>
  ),
};

/**
 * `variant="plain"` drops the tinted circle, for larger icons or
 * illustrations.
 */
export const PlainIcon: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyState.Icon variant="plain">
        <SearchX className="size-16" strokeWidth={1.25} />
      </EmptyState.Icon>
      <EmptyState.Title>
        No results for &ldquo;invoice 2019&rdquo;
      </EmptyState.Title>
      <EmptyState.Description>
        Check the spelling or try a broader search.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="outline">Clear search</Button>
      </EmptyState.Actions>
    </EmptyState>
  ),
};

/** Use `render` to make the title a real heading when it sits in an outline. */
export const AsHeading: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyState.Icon>
        <Inbox />
      </EmptyState.Icon>
      <EmptyState.Title render={<h2 />}>Your inbox is empty</EmptyState.Title>
      <EmptyState.Description>
        Messages from your team land here.
      </EmptyState.Description>
    </EmptyState>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 2, name: "Your inbox is empty" }),
    ).toBeInTheDocument();
  },
};

export const InCard: Story = {
  render: (args) => (
    <Card className="w-full">
      <EmptyState {...args}>
        <EmptyState.Icon>
          <FolderOpen />
        </EmptyState.Icon>
        <EmptyState.Title>No files uploaded</EmptyState.Title>
        <EmptyState.Description>
          Drag files here or use the button below.
        </EmptyState.Description>
        <EmptyState.Actions>
          <Button>Upload files</Button>
        </EmptyState.Actions>
      </EmptyState>
    </Card>
  ),
};

/** Inside `Table.Empty`, the small size fits the table's rhythm. */
export const InTable: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Invoice</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Empty colSpan={3} className="p-0">
          <EmptyState {...args}>
            <EmptyState.Icon>
              <SearchX />
            </EmptyState.Icon>
            <EmptyState.Title>No invoices match your filters</EmptyState.Title>
            <EmptyState.Description>
              Remove a filter to see more results.
            </EmptyState.Description>
            <EmptyState.Actions>
              <Button size="sm" variant="outline">
                Reset filters
              </Button>
            </EmptyState.Actions>
          </EmptyState>
        </Table.Empty>
      </Table.Body>
    </Table>
  ),
  play: async ({ canvas }) => {
    const cell = canvas.getByRole("cell", {
      name: /No invoices match your filters/,
    });
    await expect(cell).toHaveAttribute("colspan", "3");
  },
};
