import React from "react";
import "./Button.css";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  onClick,
  ...props
}) => {
  const buttonClasses = [
    "button",
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? "button-full-width" : "",
    disabled ? "button-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
