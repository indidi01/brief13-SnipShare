// frontend/src/types/index.ts
export interface User {
  users_id: number;
  pseudo: string;
  email: string;
  password?: string; // Optionnel car pas retourné par l'API
  creation_date: string;
  modification_date?: string;
}

export interface Snippet {
  snippets_id: string;
  langage: string;
  title: string;
  description: string | null;
  code: string;
  visibility: 'public' | 'private' | 'unlisted';
  creation_date: string;
  modification_date: string;
  users_id: number;
  author_pseudo?: string;
  tags?: Tag[];
  comments?: Comment[]; // ✅ CORRIGÉ : était "Components"
  likes_count?: number;
  is_liked?: boolean;
}

export interface Comment {
  comment_id: number;
  content: string | null;
  creation_date: string;
  snippets_id: string; // ✅ CORRIGÉ : devrait être string, pas number
  users_id: number;
  author_pseudo?: string;
}

export interface Tag {
  tags_id: number;
  name: string;
}

export interface SnippetTag {
  snippets_id: string;
  tags_id: number;
}

export interface UserSnippetsLike {
  users_id: number;
  snippets_id: string;
  creation_date?: string;
}

export type Theme = 'light' | 'dark' | 'nord' | 'cyber' | 'nature' | 'sunset';

export interface CreateSnippetData {
  title: string;
  langage: string; // ✅ Gardé "langage" pour correspondre au backend
  code: string;
  description?: string;
  visibility: 'public' | 'private' | 'unlisted';
  tags: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  pseudo: string;
  email: string;
  password: string;
}