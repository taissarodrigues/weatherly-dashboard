import React, { type ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "icon";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const buttonClass = `${styles.btn} ${styles[variant]} ${className}`;
  
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};