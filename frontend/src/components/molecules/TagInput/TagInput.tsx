// frontend/src/components/molecules/TagInput/TagInput.tsx
import React, { useState } from 'react';
import { Input } from '../../atoms/Input/Input';
import { Tag } from '../../atoms/Tag/Tag';
import styles from './TagInput.module.css';

export interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  maxTags = 5,
  placeholder = 'Ajouter un tag (Entrée pour valider)',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedTag = inputValue.trim().toLowerCase();
    
    if (!trimmedTag) {
      return;
    }
    
    if (tags.length >= maxTags) {
      setError(`Maximum ${maxTags} tags`);
      return;
    }
    
    if (tags.includes(trimmedTag)) {
      setError('Ce tag existe déjà');
      return;
    }
    
    onTagsChange([...tags, trimmedTag]);
    setInputValue('');
    setError('');
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
    setError('');
  };

  return (
    <div className={styles.container}>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={tags.length >= maxTags}
        error={error}
        fullWidth
      />
      
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              variant="primary"
              onRemove={() => removeTag(tag)}
            >
              {tag}
            </Tag>
          ))}
        </div>
      )}
      
      <p className={styles.helperText}>
        {tags.length}/{maxTags} tags utilisés
      </p>
    </div>
  );
};