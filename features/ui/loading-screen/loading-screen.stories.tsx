import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { LoadingScreen } from "./loading-screen";
import { Routes } from "@config/routes";

export default {
  title: "UI/LoadingScreen",
  component: LoadingScreen,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof LoadingScreen>;

const Template: StoryFn<typeof LoadingScreen> = () => <LoadingScreen />;

export const Default = Template.bind({});
Default.parameters = {
  route: Routes.issues,
};
