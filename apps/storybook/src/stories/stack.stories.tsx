import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button, Stack } from "@brodora/ui";
import { layoutArgTypes } from "../storybook";

const meta = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    ...layoutArgTypes,
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FiveButtons: Story = {
  args: {
    direction: "column",
    spacing: 2,
    alignItems: "stretch",
  },
  render: (args) => (
    <Stack {...args}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
      <Button>Fourth</Button>
      <Button>Fifth</Button>
    </Stack>
  ),
};
