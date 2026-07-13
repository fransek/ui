import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../components/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    defaultValue: "overview",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="projects">Projects</TabsTab>
        <TabsTab value="account">Account</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Workspace stats and activity.</TabsPanel>
      <TabsPanel value="projects">Milestones and deadlines.</TabsPanel>
      <TabsPanel value="account">Profile and preferences.</TabsPanel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="projects" disabled>
          Projects
        </TabsTab>
        <TabsTab value="account">Account</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Workspace stats and activity.</TabsPanel>
      <TabsPanel value="projects">Milestones and deadlines.</TabsPanel>
      <TabsPanel value="account">Profile and preferences.</TabsPanel>
    </Tabs>
  ),
};

export const WithoutIndicator: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList hideIndicator>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="projects">Projects</TabsTab>
        <TabsTab value="account">Account</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Workspace stats and activity.</TabsPanel>
      <TabsPanel value="projects">Milestones and deadlines.</TabsPanel>
      <TabsPanel value="account">Profile and preferences.</TabsPanel>
    </Tabs>
  ),
};
