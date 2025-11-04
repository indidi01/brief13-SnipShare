// frontend/src/contexts/SnippetContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Snippet } from '../types';

interface SnippetContextType {
  snippets: Snippet[];
  isLoading: boolean;
  addSnippet: (snippet: Omit<Snippet, 'snippets_id' | 'creation_date' | 'modification_date' | 'likes_count' | 'is_liked'>) => void;
  toggleLike: (id: string) => void;
  searchSnippets: (query: string) => Snippet[];
  filterByLanguage: (language: string) => Snippet[];
  filterByTags: (tags: string[]) => Snippet[];
}

const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

// Données de démo
const initialSnippets: Snippet[] = [
  {
    snippets_id: '1',
    langage: 'JavaScript',
    title: "Validation d'email avec Regex",
    description: "Fonction utilitaire pour valider les adresses email",
    code: `function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}`,
    visibility: 'public',
    creation_date: '2024-10-20T09:00:00Z',
    modification_date: '2024-10-20T09:00:00Z',
    users_id: 1,
    author_pseudo: 'JeanDev',
    tags: [
      { tags_id: 1, name: 'validation' },
      { tags_id: 2, name: 'email' },
      { tags_id: 3, name: 'regex' }
    ],
    likes_count: 12,
    is_liked: false
  },
  {
    snippets_id: '2',
    langage: 'Python',
    title: "Connection PostgreSQL",
    description: "Connection sécurisée à une base PostgreSQL",
    code: `import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="snipshare",
        user="admin",
        password="password"
    )
    return conn`,
    visibility: 'public',
    creation_date: '2024-10-19T16:45:00Z',
    modification_date: '2024-10-19T16:45:00Z',
    users_id: 2,
    author_pseudo: 'MarieCode',
    tags: [
      { tags_id: 4, name: 'database' },
      { tags_id: 5, name: 'postgresql' }
    ],
    likes_count: 8,
    is_liked: false
  },
  {
    snippets_id: '3',
    langage: 'TypeScript',
    title: "Hook React personnalisé",
    description: "Custom hook pour gérer le localStorage",
    code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
    visibility: 'public',
    creation_date: '2024-10-18T14:30:00Z',
    modification_date: '2024-10-18T14:30:00Z',
    users_id: 1,
    author_pseudo: 'JeanDev',
    tags: [
      { tags_id: 6, name: 'react' },
      { tags_id: 7, name: 'hooks' },
      { tags_id: 8, name: 'typescript' }
    ],
    likes_count: 25,
    is_liked: true
  }
];

interface SnippetProviderProps {
  children: ReactNode;
}

export const SnippetProvider: React.FC<SnippetProviderProps> = ({ children }) => {
  const [snippets, setSnippets] = useState<Snippet[]>(initialSnippets);
  const [isLoading] = useState(false);

  const addSnippet = (snippet: Omit<Snippet, 'snippets_id' | 'creation_date' | 'modification_date' | 'likes_count' | 'is_liked'>) => {
    const newSnippet: Snippet = {
      ...snippet,
      snippets_id: Date.now().toString(),
      creation_date: new Date().toISOString(),
      modification_date: new Date().toISOString(),
      likes_count: 0,
      is_liked: false,
    };
    
    setSnippets([newSnippet, ...snippets]);
  };

  const toggleLike = (id: string) => {
    setSnippets(snippets.map(snippet => {
      if (snippet.snippets_id === id) {
        return {
          ...snippet,
          is_liked: !snippet.is_liked,
          likes_count: (snippet.likes_count || 0) + (snippet.is_liked ? -1 : 1),
        };
      }
      return snippet;
    }));
  };

  const searchSnippets = (query: string): Snippet[] => {
    if (!query.trim()) return snippets;
    
    const lowerQuery = query.toLowerCase();
    return snippets.filter(snippet =>
      snippet.title.toLowerCase().includes(lowerQuery) ||
      snippet.description?.toLowerCase().includes(lowerQuery) ||
      snippet.langage.toLowerCase().includes(lowerQuery) ||
      snippet.tags?.some(tag => tag.name.toLowerCase().includes(lowerQuery))
    );
  };

  const filterByLanguage = (language: string): Snippet[] => {
    if (!language) return snippets;
    return snippets.filter(snippet => snippet.langage === language);
  };

  const filterByTags = (tags: string[]): Snippet[] => {
    if (tags.length === 0) return snippets;
    return snippets.filter(snippet =>
      tags.some(tag =>
        snippet.tags?.some(t => t.name.toLowerCase() === tag.toLowerCase())
      )
    );
  };

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        isLoading,
        addSnippet,
        toggleLike,
        searchSnippets,
        filterByLanguage,
        filterByTags,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippets = () => {
  const context = useContext(SnippetContext);
  if (!context) {
    throw new Error('useSnippets doit être utilisé dans un SnippetProvider');
  }
  return context;
};