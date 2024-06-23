import classNames from "classnames";
import styles from "./button-kit.module.scss";
import { ButtonHTMLAttributes } from "react";
import { Button } from "../button/button";
export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xlg = "xlg",
}
export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "empty-gray",
  error = "error",
  emptyError = "empty-error",
}
export enum ButtonIcon {
  leading = "leading",
  trailing = "trailing",
  only = "only",
}
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  color?: ButtonColor;
  icon?: ButtonIcon;
  iconSource: string;
};

export function ButtonKit({
  size = ButtonSize.md,
  color = ButtonColor.primary,
  icon = ButtonIcon.leading,
  iconSource,
}: ButtonProps) {
  const iconStyle = {
    order: icon === "leading" ? 0 : 1,
  };
  const textStyle = {
    display: icon === "only" ? "none" : "inline",
  };
  return (
    <Button className={classNames(styles.button, styles[size], styles[color])}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img style={iconStyle} src={iconSource} alt="" />
      <span style={textStyle}>Button CTA</span>
    </Button>
  );
}
