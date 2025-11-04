// frontend/src/components/atoms/Tag/Tag.tsx
import React from 'react';
import { X } from 'lucide-react';
import styles from './Tag.module.css';

export interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onRemove?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  onRemove,
  className = '',
}) => {
  return (
    <span className={`${styles.tag} ${styles[variant]} ${styles[size]} ${className}`}>
      {children}
      {onRemove && (
        <button
          className={styles.removeButton}
          onClick={onRemove}
          aria-label="Supprimer"
          type="button"
        >
          <X size={14} />
        </button>
      )}
    </span>
  );
};