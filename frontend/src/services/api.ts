// frontend/src/services/api.ts
import type { User, Snippet, Comment, Tag, CreateSnippetData, LoginData, RegisterData } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('snipshare-token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Erreur réseau');
  }
  return response.json();
};

export const apiService = {
  // Auth
  async login(credentials: LoginData): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  async register(userData: RegisterData): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Snippets
  async getSnippets(): Promise<Snippet[]> {
    const response = await fetch(`${API_URL}/snippets`);
    return handleResponse(response);
  },

  async getSnippetById(id: string): Promise<Snippet | null> {
    const response = await fetch(`${API_URL}/snippets/${id}`);
    if (response.status === 404) {
      return null;
    }
    return handleResponse(response);
  },

  async createSnippet(snippetData: CreateSnippetData, userId: number): Promise<Snippet> {
    const response = await fetch(`${API_URL}/snippets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(snippetData),
    });
    return handleResponse(response);
  },

  // Tags
  async getTags(): Promise<Tag[]> {
    const response = await fetch(`${API_URL}/tags`);
    return handleResponse(response);
  },

  // Comments
  async addComment(snippetId: string, content: string, userId: number): Promise<Comment> {
    const response = await fetch(`${API_URL}/snippets/${snippetId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ content }),
    });
    return handleResponse(response);
  },

  // Likes
  async toggleLike(snippetId: string, userId: number): Promise<{ likes_count: number; is_liked: boolean }> {
    const response = await fetch(`${API_URL}/snippets/${snippetId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return handleResponse(response);
  },
};