import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@brodora/ui";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Brodora Button",
        disabled: false,
        startNode: null,
        endNode: null
    }
};
