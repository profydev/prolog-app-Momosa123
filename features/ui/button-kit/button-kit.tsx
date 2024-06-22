import classNames from "classnames";
import styles from "./button-kit.module.scss";
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
type ButtonProps = {
  size?: ButtonSize;
  color?: ButtonColor;
  icon?: ButtonIcon;
};

export function ButtonKit({
  size = ButtonSize.md,
  color = ButtonColor.primary,
  icon = ButtonIcon.leading,
}: ButtonProps) {
  const iconStyle = {
    order: icon === "leading" ? 0 : 1,
  };
  const textStyle = {
    display: icon === "only" ? "none" : "inline",
  };
  return (
    <button className={classNames(styles.button, styles[size], styles[color])}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img style={iconStyle} src="./icons/circle-icon.svg" alt="" />
      <span style={textStyle}>Button CTA</span>
    </button>
  );
}
