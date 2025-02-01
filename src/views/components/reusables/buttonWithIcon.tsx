import { Icon } from "@iconify/react";
import React from "react";

interface ButtonWithIconProps {
  iconClassName?: string | undefined;
  icon: string | React.ReactElement;
  iconHeight?: number | string;
  iconWidth?: number | string;
  id?: string;
  iconColor?: string;
  className?: string;
  classNames?: string | string[];
  buttonLabel?: string;
  value?: string | number | undefined;
  buttonPlaceHolder?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: object;
  backgroundColor?: string;
  disabled?: boolean;
}

const ButtonWithIcon = (props: ButtonWithIconProps) => {
  return (
    <button
      id={props.id}
      type={props.type}
      style={props.style && props.style}
      value={props.value}
      disabled={props.disabled}
      onClick={props.onClick}
      className={props.className}
    >
      {React.isValidElement(props.icon) ? (
        props.icon
      ) : (
        <Icon
          icon={typeof props.icon === "string" ? props.icon : ""}
          color={props.iconColor}
          width={props.iconWidth && props.iconWidth}
          height={props.iconHeight && props.iconHeight}
          className={props.iconClassName}
        />
      )}
      {props.buttonPlaceHolder}
    </button>
  );
};

export default ButtonWithIcon;
