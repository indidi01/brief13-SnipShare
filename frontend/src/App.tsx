// frontend/src/contexts/SnippetContext.tsx
import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { apiService } from '../services/api';
import type { Snippet, CreateSnippetData, Comment } from '../types';

interface SnippetContextType {
  snippets: Snippet[];
  isLoading: boolean;
  error: string | null;
  loadSnippets: () => Promise<void>;
  getSnippetById: (id: string) => Promise<Snippet | null>;
  createSnippet: (data: CreateSnippetData, userId: number) => Promise<Snippet>;
  toggleLike: (snippetId: string, userId: number) => Promise<void>;
  addComment: (snippetId: string, content: string, userId: number) => Promise<void>;
}

const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

interface SnippetProviderProps {
  children: ReactNode;
}

export const SnippetProvider: React.FC<SnippetProviderProps> = ({ children }) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les snippets au montage
  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getSnippets();
      setSnippets(data);
    } catch (err) {
      setError('Erreur lors du chargement des snippets');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSnippetById = async (id: string): Promise<Snippet | null> => {
    try {
      // D'abord vérifier dans le cache local
      const cachedSnippet = snippets.find((s) => s.snippets_id === id);
      if (cachedSnippet) {
        return cachedSnippet;
      }

      // Sinon charger depuis l'API
      const snippet = await apiService.getSnippetById(id);
      if (snippet) {
        // Ajouter au cache
        setSnippets((prev) => {
          const exists = prev.some((s) => s.snippets_id === id);
          return exists ? prev : [...prev, snippet];
        });
      }
      return snippet;
    } catch (err) {
      console.error('Erreur lors du chargement du snippet:', err);
      return null;
    }
  };

  const createSnippet = async (
    data: CreateSnippetData,
    userId: number
  ): Promise<Snippet> => {
    try {
      const newSnippet = await apiService.createSnippet(data, userId);
      setSnippets((prev) => [newSnippet, ...prev]);
      return newSnippet;
    } catch (err) {
      console.error('Erreur lors de la création du snippet:', err);
      throw err;
    }
  };

  const toggleLike = async (snippetId: string, userId: number) => {
    try {
      const result = await apiService.toggleLike(snippetId, userId);
      
      setSnippets((prev) =>
        prev.map((snippet) =>
          snippet.snippets_id === snippetId
            ? {
                ...snippet,
                likes_count: result.likes_count,
                is_liked: result.is_liked,
              }
            : snippet
        )
      );
    } catch (err) {
      console.error('Erreur lors du like:', err);
      throw err;
    }
  };

  const addComment = async (snippetId: string, content: string, userId: number) => {
    try {
      const newComment = await apiService.addComment(snippetId, content, userId);
      
      setSnippets((prev) =>
        prev.map((snippet) =>
          snippet.snippets_id === snippetId
            ? {
                ...snippet,
                Components: [...(snippet.Components || []), newComment],
              }
            : snippet
        )
      );
    } catch (err) {
      console.error('Erreur lors de l\'ajout du commentaire:', err);
      throw err;
    }
  };

  const value: SnippetContextType = {
    snippets,
    isLoading,
    error,
    loadSnippets,
    getSnippetById,
    createSnippet,
    toggleLike,
    addComment,
  };

  return <SnippetContext.Provider value={value}>{children}</SnippetContext.Provider>;
};

export const useSnippets = () => {
  const context = useContext(SnippetContext);
  if (!context) {
    throw new Error('useSnippets doit être utilisé dans un SnippetProvider');
  }
  return context;
};