import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, within } from "storybook/test";
import { Tabs } from "./tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    defaultValue: "overview",
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="projects">Projects</Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel className="h-50" value="overview">
        Workspace stats and activity.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="projects">
        Milestones and deadlines.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="account">
        Profile and preferences.
      </Tabs.Panel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="projects" disabled>
          Projects
        </Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel className="h-50" value="overview">
        Workspace stats and activity.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="projects">
        Milestones and deadlines.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="account">
        Profile and preferences.
      </Tabs.Panel>
    </Tabs>
  ),
};

export const CustomStyle: Story = {
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <Tabs {...args} className="card body-sm">
      <Tabs.List className="border-b">
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="projects">Projects</Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel className="h-50" value="overview">
        Workspace stats and activity.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="projects">
        Milestones and deadlines.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="account">
        Profile and preferences.
      </Tabs.Panel>
    </Tabs>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overview = canvas.getByRole("tab", { name: "Overview" });
    await expect(canvas.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
    await userEvent.click(overview);
    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("tab", { name: "Projects" })).toHaveFocus();
  },
};
