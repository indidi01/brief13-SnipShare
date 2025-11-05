// frontend/src/components/molecules/CommentItem/CommentItem.tsx
import React from 'react';
import { Avatar } from '../../atoms/Avatar/Avatar';
import type { Comment } from '../../../types';
import styles from './CommentItem.module.css';

export interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'À l\'instant';
    if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
    if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} h`;
    if (diffInSeconds < 604800) return `Il y a ${Math.floor(diffInSeconds / 86400)} j`;
    
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <div className={styles.comment}>
      <Avatar name={comment.author_pseudo} size="sm" />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.author}>{comment.author_pseudo}</span>
          <span className={styles.date}>{formatDate(comment.creation_date)}</span>
        </div>
        <p className={styles.text}>{comment.content}</p>
      </div>
    </div>
  );
};