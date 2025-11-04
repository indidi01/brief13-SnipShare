// frontend/src/components/atoms/Input/Input.tsx
import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div className={styles.inputWrapper}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          className={`${styles.input} ${icon ? styles.withIcon : ''} ${error ? styles.error : ''} ${className}`}
          {...props}
        />
      </div>
      
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};