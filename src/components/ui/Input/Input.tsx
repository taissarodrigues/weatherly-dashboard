import React, { type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ icon, className = "", ...props }) => {
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {icon && <span className={styles.iconArea}>{icon}</span>}
      <input className={styles.inputElement} {...props} />
    </div>
  );
};
