import pool from '../utils/database';
import { Comment } from '../types';

export const commentModel = {
  async findBySnippetId(snippetId: string): Promise<Comment[]> {
    const result = await pool.query(`
      SELECT c.*, u.pseudo as author_pseudo
      FROM comments c
      LEFT JOIN Users u ON c.users_id = u.users_id
      WHERE c.snippets_id = $1
      ORDER BY c.creation_date ASC
    `, [snippetId]);
    return result.rows;
  },

  async create(content: string, snippetId: string, userId: number): Promise<Comment> {
    const result = await pool.query(
      `INSERT INTO comments (content, creation_date, snippets_id, users_id)
       VALUES ($1, NOW(), $2, $3)
       RETURNING *, (SELECT pseudo FROM Users WHERE users_id = $3) as author_pseudo`,
      [content, snippetId, userId]
    );
    return result.rows[0];
  },
};