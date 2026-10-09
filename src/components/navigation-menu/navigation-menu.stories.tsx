import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, screen, waitFor } from "storybook/test";
import { NavigationMenu } from "./navigation-menu";

const overviewLinks = [
  {
    href: "#quick-start",
    title: "Quick Start",
    description: "Install and assemble your first component.",
  },
  {
    href: "#accessibility",
    title: "Accessibility",
    description: "Learn how the components are made accessible.",
  },
  {
    href: "#releases",
    title: "Releases",
    description: "See what's new in the latest versions.",
  },
  {
    href: "#about",
    title: "About",
    description: "Learn more about the project and its goals.",
  },
];

const handbookLinks = [
  {
    href: "#styling",
    title: "Styling",
    description: "Customize components with Tailwind CSS and theme tokens.",
  },
  {
    href: "#animation",
    title: "Animation",
    description: "Animate components with CSS transitions.",
  },
  {
    href: "#composition",
    title: "Composition",
    description: "Compose components with your own existing components.",
  },
];

type LinkData = (typeof overviewLinks)[number];

const LinkList = ({
  links,
  className,
}: {
  links: LinkData[];
  className?: string;
}) => (
  <ul className={className}>
    {links.map((link) => (
      <li key={link.href}>
        <NavigationMenu.Link href={link.href}>
          <NavigationMenu.LinkTitle>{link.title}</NavigationMenu.LinkTitle>
          <NavigationMenu.LinkDescription>
            {link.description}
          </NavigationMenu.LinkDescription>
        </NavigationMenu.Link>
      </li>
    ))}
  </ul>
);

const meta = {
  title: "Components/NavigationMenu",
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Overview</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <LinkList
            links={overviewLinks}
            className="xs:grid-cols-[12rem_12rem] grid grid-cols-1"
          />
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Handbook</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <LinkList links={handbookLinks} className="flex max-w-100 flex-col" />
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link variant="trigger" href="#github">
          GitHub
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu>
  ),
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onValueChange: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole("navigation")).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "#github",
    );

    await userEvent.click(canvas.getByRole("button", { name: "Overview" }));
    const link = await screen.findByRole("link", { name: /Quick Start/ });
    await expect(args.onValueChange).toHaveBeenCalled();
    await expect(
      canvas.getByRole("button", { name: "Overview" }),
    ).toHaveAttribute("aria-expanded", "true");

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(link).not.toBeInTheDocument());
  },
};

/**
 * Set `arrow` to render an arrow on the popup that follows the open trigger.
 */
export const WithArrow: Story = {
  args: {
    arrow: true,
  },
};

/**
 * Set `backdrop` to dim the page behind the popup while it is open.
 */
export const WithBackdrop: Story = {
  args: {
    backdrop: true,
  },
};

/**
 * Set `orientation` to `"vertical"` to stack the items. The popup then opens
 * to the right of the triggers.
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  play: async ({ canvas }) => {
    const overview = canvas.getByRole("button", { name: "Overview" });
    const handbook = canvas.getByRole("button", { name: "Handbook" });
    await expect(handbook.getBoundingClientRect().top).toBeGreaterThan(
      overview.getBoundingClientRect().bottom - 1,
    );
  },
};

/**
 * Pass `icon` to a trigger to replace its chevron, or `null` to remove it.
 */
export const CustomIcon: Story = {
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger icon={<span aria-hidden>+</span>}>
          Overview
        </NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <LinkList links={overviewLinks} className="flex max-w-100 flex-col" />
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger icon={null}>Handbook</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <LinkList links={handbookLinks} className="flex max-w-100 flex-col" />
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu>
  ),
};
