import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronRight, MoreVertical } from "lucide-react";
import React from "react";
import { expect, fn } from "storybook/test";
import { Avatar } from "../avatar";
import { Button } from "../button";
import { Card } from "../card";
import { List } from "./list";

const meta = {
  title: "Components/List",
  component: List,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const people = [
  { name: "Ada Lovelace", email: "ada.lovelace@email.com" },
  { name: "Alan Turing", email: "alan.turing@email.com" },
  { name: "Grace Hopper", email: "grace.hopper@email.com" },
];

const onAlanClick = fn();

export const Basic: Story = {
  render: () => (
    <List className="max-w-100">
      {people.map((person) => (
        <List.Item key={person.email}>
          <List.ItemContent>
            <List.ItemTitle>{person.name}</List.ItemTitle>
            <List.ItemDescription>{person.email}</List.ItemDescription>
          </List.ItemContent>
        </List.Item>
      ))}
    </List>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
    await expect(canvas.queryByRole("button")).toBeNull();
    // Fills the available width, up to `max-w-100` (25rem).
    await expect(canvas.getByRole("list").getBoundingClientRect().width).toBe(
      400,
    );
  },
};

export const Mixed: Story = {
  render: () => (
    <List className="max-w-100">
      <List.Item>
        <List.ItemContent>
          <List.ItemTitle>Ada Lovelace</List.ItemTitle>
          <List.ItemDescription>ada.lovelace@email.com</List.ItemDescription>
        </List.ItemContent>
      </List.Item>
      <List.Item>
        <List.ItemButton onClick={onAlanClick}>
          <List.ItemContent>
            <List.ItemTitle>Alan Turing</List.ItemTitle>
            <List.ItemDescription>alan.turing@email.com</List.ItemDescription>
          </List.ItemContent>
          <ChevronRight className="size-5" />
        </List.ItemButton>
      </List.Item>
      <List.Item>
        <List.ItemContent>
          <List.ItemTitle>Grace Hopper</List.ItemTitle>
          <List.ItemDescription>grace.hopper@email.com</List.ItemDescription>
        </List.ItemContent>
        <Button variant="ghost" size="icon" tooltip="More actions">
          <MoreVertical className="size-5" />
        </Button>
      </List.Item>
    </List>
  ),
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
    await userEvent.click(canvas.getByRole("button", { name: /Alan Turing/ }));
    await expect(onAlanClick).toHaveBeenCalledOnce();
    await expect(
      canvas.getByRole("button", { name: "More actions" }),
    ).toBeVisible();
  },
};

export const Interactive: Story = {
  render: () => (
    <List className="max-w-100">
      {people.map((person) => (
        <List.Item key={person.email}>
          <List.ItemButton>
            <List.ItemContent>
              <List.ItemTitle>{person.name}</List.ItemTitle>
              <List.ItemDescription>{person.email}</List.ItemDescription>
            </List.ItemContent>
            <ChevronRight className="size-5" />
          </List.ItemButton>
        </List.Item>
      ))}
      <List.Item>
        <List.ItemButton disabled>
          <List.ItemContent>
            <List.ItemTitle>Margaret Hamilton</List.ItemTitle>
            <List.ItemDescription>Invitation pending</List.ItemDescription>
          </List.ItemContent>
          <ChevronRight className="size-5" />
        </List.ItemButton>
      </List.Item>
    </List>
  ),
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole("listitem");
    await expect(items).toHaveLength(4);
    // The button fills the row, so the item itself has no padding.
    await expect(getComputedStyle(items[0]).paddingTop).toBe("0px");
    await expect(
      canvas.getByRole("button", { name: /Margaret Hamilton/ }),
    ).toBeDisabled();
  },
};

export const Links: Story = {
  render: () => (
    <List className="max-w-100">
      {people.map((person) => (
        <List.Item key={person.email}>
          <List.ItemLink href={`mailto:${person.email}`}>
            <List.ItemContent>
              <List.ItemTitle>{person.name}</List.ItemTitle>
              <List.ItemDescription>{person.email}</List.ItemDescription>
            </List.ItemContent>
            <ChevronRight className="size-5" />
          </List.ItemLink>
        </List.Item>
      ))}
    </List>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("link", { name: /Ada Lovelace/ }),
    ).toHaveAttribute("href", "mailto:ada.lovelace@email.com");
  },
};

export const WithAvatar: Story = {
  render: () => (
    <List className="max-w-100">
      {people.map((person) => (
        <List.Item key={person.email} className="justify-start gap-3">
          <Avatar alt={person.name} />
          <List.ItemContent>
            <List.ItemTitle>{person.name}</List.ItemTitle>
            <List.ItemDescription>{person.email}</List.ItemDescription>
          </List.ItemContent>
          <Button variant="ghost" size="icon" tooltip="More actions">
            <MoreVertical className="size-5" />
          </Button>
        </List.Item>
      ))}
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List render={<ol />} className="max-w-100">
      {people.map((person, index) => (
        <List.Item key={person.email} className="justify-start gap-3">
          <span className="text-body w-4 text-sm tabular-nums">
            {index + 1}
          </span>
          <List.ItemContent>
            <List.ItemTitle>{person.name}</List.ItemTitle>
            <List.ItemDescription>{person.email}</List.ItemDescription>
          </List.ItemContent>
        </List.Item>
      ))}
    </List>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("list").tagName).toBe("OL");
  },
};

export const InCard: Story = {
  render: () => (
    <Card className="w-full max-w-100">
      <List>
        {people.map((person) => (
          <List.Item key={person.email}>
            <List.ItemButton>
              <List.ItemContent>
                <List.ItemTitle>{person.name}</List.ItemTitle>
                <List.ItemDescription>{person.email}</List.ItemDescription>
              </List.ItemContent>
              <ChevronRight className="size-5" />
            </List.ItemButton>
          </List.Item>
        ))}
      </List>
    </Card>
  ),
};
