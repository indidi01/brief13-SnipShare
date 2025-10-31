// src/services/api.ts
import { User, Snippet, Comment, Tag, CreateSnippetData, LoginData, RegisterData } from '../types';

// Données mockées basées sur le schéma BDD
let mockUsers: User[] = [
  {
    users_id: 1,
    pseudo: 'JeanDev',
    email: 'jean@collectivite.fr',
    password: 'hashed_password', // En vrai, jamais stocké en clair côté front
    creation_date: '2024-10-15T10:00:00Z',
    modification_date: '2024-10-15T10:00:00Z'
  },
  {
    users_id: 2,
    pseudo: 'MarieCode',
    email: 'marie@collectivite.fr',
    password: 'hashed_password',
    creation_date: '2024-10-16T14:30:00Z',
    modification_date: '2024-10-16T14:30:00Z'
  }
];

let mockSnippets: Snippet[] = [
  {
    snippets_id: 'snippet_1',
    langage: 'javascript',
    title: "Validation d'email avec Regex",
    description: "Fonction utilitaire pour valider les adresses email",
    code: `function validateEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}`,
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
    comments: [
      {
        comment_id: 1,
        content: "Super fonction ! Je l'utilise dans tous mes projets.",
        creation_date: '2024-10-21T14:20:00Z',
        snippets_id: 'snippet_1',
        users_id: 2,
        author_pseudo: 'MarieCode'
      }
    ],
    likes_count: 12,
    is_liked: false
  },
  {
    snippets_id: 'snippet_2',
    langage: 'python',
    title: "Connection PostgreSQL",
    description: "Connection sécurisée à une base PostgreSQL",
    code: `import psycopg2\n\ndef get_db_connection():\n    conn = psycopg2.connect(\n        host="localhost",\n        database="snipshare",\n        user="admin",\n        password="password"\n    )\n    return conn`,
    visibility: 'public',
    creation_date: '2024-10-19T16:45:00Z',
    modification_date: '2024-10-19T16:45:00Z',
    users_id: 2,
    author_pseudo: 'MarieCode',
    tags: [
      { tags_id: 4, name: 'database' },
      { tags_id: 5, name: 'postgresql' },
      { tags_id: 6, name: 'connection' }
    ],
    comments: [],
    likes_count: 8,
    is_liked: true
  }
];

let mockTags: Tag[] = [
  { tags_id: 1, name: 'validation' },
  { tags_id: 2, name: 'email' },
  { tags_id: 3, name: 'regex' },
  { tags_id: 4, name: 'database' },
  { tags_id: 5, name: 'postgresql' },
  { tags_id: 6, name: 'connection' },
  { tags_id: 7, name: 'react' },
  { tags_id: 8, name: 'hooks' }
];

// Service API simulé
export const apiService = {
  // Auth
  async login(credentials: LoginData): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simule latence réseau
    
    const user = mockUsers.find(u => u.email === credentials.email);
    if (!user || user.password !== credentials.password) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // En vrai, le mot de passe serait hashé et vérifié côté backend
    const { password, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword as User,
      token: 'mock_jwt_token_' + user.users_id
    };
  },

  async register(userData: RegisterData): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === userData.email || u.pseudo === userData.pseudo);
    if (existingUser) {
      throw new Error('Email ou pseudo déjà utilisé');
    }

    const newUser: User = {
      users_id: mockUsers.length + 1,
      pseudo: userData.pseudo,
      email: userData.email,
      password: userData.password, // En vrai, hashé côté backend
      creation_date: new Date().toISOString(),
      modification_date: new Date().toISOString()
    };

    mockUsers.push(newUser);
    
    const { password, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword as User,
      token: 'mock_jwt_token_' + newUser.users_id
    };
  },

  // Snippets
  async getSnippets(): Promise<Snippet[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSnippets;
  },

  async getSnippetById(id: string): Promise<Snippet | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSnippets.find(snippet => snippet.snippets_id === id) || null;
  },

  async createSnippet(snippetData: CreateSnippetData, userId: number): Promise<Snippet> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers.find(u => u.users_id === userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const newSnippet: Snippet = {
      snippets_id: `snippet_${Date.now()}`,
      langage: snippetData.langage,
      title: snippetData.title,
      description: snippetData.description || null,
      code: snippetData.code,
      visibility: snippetData.visibility,
      creation_date: new Date().toISOString(),
      modification_date: new Date().toISOString(),
      users_id: userId,
      author_pseudo: user.pseudo,
      tags: snippetData.tags.map((tagName, index) => {
        let tag = mockTags.find(t => t.name === tagName);
        if (!tag) {
          tag = { tags_id: mockTags.length + 1, name: tagName };
          mockTags.push(tag);
        }
        return tag;
      }),
      comments: [],
      likes_count: 0,
      is_liked: false
    };

    mockSnippets.unshift(newSnippet);
    return newSnippet;
  },

  // Tags
  async getTags(): Promise<Tag[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTags;
  },

  // Comments
  async addComment(snippetId: string, content: string, userId: number): Promise<Comment> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers.find(u => u.users_id === userId);
    const snippet = mockSnippets.find(s => s.snippets_id === snippetId);
    
    if (!user || !snippet) {
      throw new Error('Snippet ou utilisateur non trouvé');
    }

    const newComment: Comment = {
      comment_id: (snippet.comments?.length || 0) + 1,
      content,
      creation_date: new Date().toISOString(),
      snippets_id: snippetId,
      users_id: userId,
      author_pseudo: user.pseudo
    };

    if (!snippet.comments) {
      snippet.comments = [];
    }
    snippet.comments.push(newComment);

    return newComment;
  },

  // Likes
  async toggleLike(snippetId: string, userId: number): Promise<{ likes_count: number; is_liked: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const snippet = mockSnippets.find(s => s.snippets_id === snippetId);
    if (!snippet) {
      throw new Error('Snippet non trouvé');
    }

    // Simulation basique du like/dislike
    if (snippet.is_liked) {
      snippet.likes_count = Math.max(0, (snippet.likes_count || 0) - 1);
      snippet.is_liked = false;
    } else {
      snippet.likes_count = (snippet.likes_count || 0) + 1;
      snippet.is_liked = true;
    }

    return {
      likes_count: snippet.likes_count || 0,
      is_liked: snippet.is_liked || false
    };
  }
};