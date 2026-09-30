import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CheckCircle,
  ChevronRight,
  Info,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";
import React from "react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { useMediaQuery } from "../lib/utils";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, possimus praesentium? Possimus ullam laudantium nisi, laboriosam illum voluptatem nesciunt quidem?";

export const Basic: Story = {
  render: () => (
    <Card className="max-w-100">
      <Card.Close />
      <Card.Content>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Description>{description}</Card.Description>
        </Card.Body>
        <Card.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </Card.Footer>
      </Card.Content>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="max-w-100">
      <Card.Image src="https://picsum.photos/800/400" alt="Card image" />
      <Card.Close variant="secondary" />
      <Card.Content>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Description>{description}</Card.Description>
        </Card.Body>
        <Card.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </Card.Footer>
      </Card.Content>
    </Card>
  ),
};

export const Responsive: Story = {
  render: () => {
    const sm = useMediaQuery("sm");
    return (
      <Card className="max-w-100 sm:max-w-180 sm:flex-row">
        <Card.Image
          src="https://picsum.photos/400/400"
          className="hidden size-60 sm:block"
          alt="Card image"
        />
        <Card.Image
          src="https://picsum.photos/800/400"
          className="sm:hidden"
          alt="Card image"
        />
        <Card.Close variant={sm ? "ghost" : "secondary"} />
        <Card.Content>
          <Card.Header>
            <Card.Title>Card Title</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Description>{description}</Card.Description>
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save</Button>
          </Card.Footer>
        </Card.Content>
      </Card>
    );
  },
};

export const InfoCard: Story = {
  render: () => (
    <Card className="max-w-100">
      <Card.Close />
      <Card.Content className="pr-10">
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  ),
};

export const LinkCard: Story = {
  render: () => (
    <Card
      className="group max-w-100 transition-transform hover:-translate-y-1"
      render={<a href="/" />}
    >
      <Card.Content className="flex-row items-center gap-4">
        <div className="flex flex-col gap-2">
          <Card.Header>
            <Card.Title>Card Title</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Description>{description}</Card.Description>
          </Card.Body>
        </div>
        <div>
          <ChevronRight className="text-muted-fg transition-transform group-active:translate-x-1" />
        </div>
      </Card.Content>
    </Card>
  ),
};

export const ColoredCards: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="bg-primary/5 border-primary-fg max-w-100">
        <Card.Content>
          <Card.Header>
            <Card.Title className="text-primary-fg flex items-center gap-2">
              <Info className="size-5" />
              Primary
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Description className="text-primary-fg">
              {description}
            </Card.Description>
          </Card.Body>
        </Card.Content>
      </Card>
      <Card className="bg-success/5 border-success-fg max-w-100">
        <Card.Content>
          <Card.Header>
            <Card.Title className="text-success-fg flex items-center gap-2">
              <CheckCircle className="size-5" />
              Success
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Description className="text-success-fg">
              {description}
            </Card.Description>
          </Card.Body>
        </Card.Content>
      </Card>
      <Card className="bg-warning/5 border-warning-fg max-w-100">
        <Card.Content>
          <Card.Header>
            <Card.Title className="text-warning-fg flex items-center gap-2">
              <TriangleAlert className="size-5" />
              Warning
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Description className="text-warning-fg">
              {description}
            </Card.Description>
          </Card.Body>
        </Card.Content>
      </Card>
      <Card className="bg-danger/5 border-danger-fg max-w-100">
        <Card.Content>
          <Card.Header>
            <Card.Title className="text-danger-fg flex items-center gap-2">
              <ShieldAlert className="size-5" />
              Danger
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Description className="text-danger-fg">
              {description}
            </Card.Description>
          </Card.Body>
        </Card.Content>
      </Card>
    </div>
  ),
};
