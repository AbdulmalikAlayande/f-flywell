import { Icon } from "@iconify/react";
import React from "react";
import "../../../styles/components/reusableComponents/buttonWithIcon.css";

interface ButtonWithIconProps {
  icon: string;
  iconHeight?: number | string;
  iconWidth?: number | string;
  id?: string;
  iconColor?: string;
  className?: string;
  classNames?: string | string[];
  buttonLabel?: string;
  value?: any;
  buttonPlaceHolder?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: {};
  backgroundColor?: string;
  disabled?: boolean;
}

const ButtonWithIcon = (props: ButtonWithIconProps) => {


  return (
    <button
      id={props.id}
      type={props.type}
      onClick={props.onClick}
      className={props.className}
      style={props.style && props.style}
      value={props.value}
      disabled={props.disabled}
    >
      <Icon
        icon={props.icon}
        color={props.iconColor}
        width={props.iconWidth && props.iconWidth}
        height={props.iconHeight && props.iconHeight}
      />
      {props.buttonPlaceHolder}
    </button>
  );
};

export default ButtonWithIcon;
