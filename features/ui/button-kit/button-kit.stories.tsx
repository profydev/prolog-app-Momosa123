import { Meta, StoryObj } from "@storybook/react";
import { ButtonKit, ButtonColor, ButtonIcon, ButtonSize } from "./button-kit";

export default {
  title: "UI/ButtonKit",
  component: ButtonKit,
} as Meta<typeof ButtonKit>;

type Story = StoryObj<typeof ButtonKit>;

export const Primary: Story = {
  args: {
    color: ButtonColor.primary,
    size: ButtonSize.md,
    icon: ButtonIcon.leading,
    iconSource: "icons/circle-icon.svg",
  },
  argTypes: {
    color: {
      control: "select",
      options: Object.values(ButtonColor),
    },
  },
};

Primary.parameters = {
  viewMode: "docs",
};
