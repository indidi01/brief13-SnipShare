// frontend/src/components/molecules/SearchBar/SearchBar.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Rechercher des snippets...',
  onSearch,
  className = '',
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.searchBar} ${className}`}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        icon={<Search size={20} />}
        fullWidth
        className={styles.input}
      />
      
      {query && (
        <Button
          type="button"
          variant="ghost"
          onClick={handleClear}
          className={styles.clearButton}
        >
          <X size={20} />
        </Button>
      )}
      
      <Button type="submit" variant="primary">
        Rechercher
      </Button>
    </form>
  );
};