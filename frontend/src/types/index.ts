

export interface User {
users_id: number;
    pseudo: string;
    email: string;
    password: string;
    creation_date: string;
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
    tags?: [];
    Components?: Comment[];
    likes_count?: number;
    is_liked?: boolean;
}

export interface Comment {
    comment_id: number;
    content: string | null;
    creation_date: string;
    snippets_id: number;
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

export type Theme = 'light' | 'dark' | 'nord' | 'nord' | 'cyber' | 'nature' | 'sunset';

export interface CreateSnippetData {
    title: string;
    langages: string;
    code: string;
    description?: string;
    visibility: 'public' | 'private' | 'unlisted';
    tags: string[];
}

export interface LoginData {
    email:string;
    password: string;
}

export interface RegisterData {
    pseudo: string;
    email: string;
    password: string;
}