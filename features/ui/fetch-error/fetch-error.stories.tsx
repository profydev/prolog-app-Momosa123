import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FetchError } from "./fetch-error";
import { Routes } from "@config/routes";

export default {
  title: "UI/FetchError",
  component: FetchError,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof FetchError>;

const Template: StoryFn<typeof FetchError> = ({ page, refetch }) => (
  <FetchError page={page} refetch={refetch} />
);

export const Default = Template.bind({});
Default.parameters = {
  route: Routes.issues,
};
