// frontend/src/components/molecules/SnippetCard/SnippetCard.tsx
import React from 'react';
import { Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Tag } from '../../atoms/Tag/Tag';
import { Button } from '../../atoms/Button/Button';
// import { CodeBlock } from '../CodeBlock/CodeBlock';
import type { Snippet } from '../../../types';
import styles from './SnippetCard.module.css';

export interface SnippetCardProps {
  snippet: Snippet;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({
  snippet,
  onLike,
  onComment,
  onShare,
  onClick,
}) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(snippet.snippets_id);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLike) {
      onLike(snippet.snippets_id);
    }
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onComment) {
      onComment(snippet.snippets_id);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare(snippet.snippets_id);
    }
  };

  return (
    <article 
      className={`${styles.card} ${onClick ? styles.clickable : ''}`}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className={styles.header}>
        <Avatar name={snippet.author_pseudo} size="md" />
        <div className={styles.info}>
          <h3 className={styles.title}>{snippet.title}</h3>
          <p className={styles.author}>{snippet.author_pseudo}</p>
        </div>
      </div>

      {/* Description */}
      {snippet.description && (
        <p className={styles.description}>{snippet.description}</p>
      )}

      {/* Code */}
      {/* <CodeBlock
        code={snippet.code}
        language={snippet.langage}
        maxHeight="300px"
      /> */}

      {/* Tags */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className={styles.tags}>
          {snippet.tags.map((tag) => (
            <Tag key={tag.tags_id} variant="primary" size="sm">
              {tag.name}
            </Tag>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className={styles.footer}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          icon={<Heart size={18} fill={snippet.is_liked ? 'currentColor' : 'none'} />}
          className={snippet.is_liked ? styles.liked : ''}
        >
          {snippet.likes_count || 0}
        </Button>

        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleComment}
            icon={<MessageCircle size={18} />}
          >
            {snippet.comments?.length || 0}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            icon={<Share2 size={18} />}
          />
          
          <Button
            variant="ghost"
            size="sm"
            icon={<Eye size={18} />}
          />
        </div>
      </div>
    </article>
  );
};