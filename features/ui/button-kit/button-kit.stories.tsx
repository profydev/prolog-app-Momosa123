import { Meta, StoryFn } from "@storybook/react";
import { ButtonKit, ButtonColor, ButtonIcon, ButtonSize } from "./button-kit";

export default {
  title: "UI/ButtonKit",
  component: ButtonKit,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof ButtonKit>;

const Template: StoryFn<typeof ButtonKit> = ({ size, color, icon }) => (
  <div style={{ padding: 50 }}>
    <ButtonKit color={color} size={size} icon={icon} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  size: ButtonSize.md,
  color: ButtonColor.primary,
  icon: ButtonIcon.leading,
};
Primary.parameters = {
  viewMode: "docs",
};
