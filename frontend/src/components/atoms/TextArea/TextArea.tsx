// frontend/src/components/atoms/TextArea/TextArea.tsx
import React from 'react';
import styles from './TextArea.module.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  fullWidth = false,
  resize = 'vertical',
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      
      <textarea
        className={`${styles.textarea} ${styles[resize]} ${error ? styles.error : ''} ${className}`}
        {...props}
      />
      
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};