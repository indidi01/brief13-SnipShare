import pool from '../utils/database';
import { Snippet, CreateSnippetData } from '../types';

export const snippetModel = {
  async findAll(userId?: number): Promise<Snippet[]> {
    let query = `
      SELECT 
        s.*,
        u.pseudo as author_pseudo,
        COUNT(DISTINCT l.users_id) as likes_count,
        EXISTS(SELECT 1 FROM users_creating_snippets l2 WHERE l2.snippets_id = s.snippets_id AND l2.users_id = $1) as is_liked,
        ARRAY_AGG(DISTINCT t.tags_id) as tag_ids,
        ARRAY_AGG(DISTINCT t.name) as tag_names
      FROM Snippets s
      LEFT JOIN Users u ON s.users_id = u.users_id
      LEFT JOIN users_creating_snippets l ON s.snippets_id = l.snippets_id
      LEFT JOIN tagging tg ON s.snippets_id = tg.snippets_id
      LEFT JOIN Tags t ON tg.tags_id = t.tags_id
      WHERE s.visibility = 'public' OR s.users_id = $1
      GROUP BY s.snippets_id, u.pseudo
      ORDER BY s.creation_date DESC
    `;
    
    const result = await pool.query(query, [userId || 0]);
    
    return result.rows.map((row: { tag_ids: number[]; tag_names: any[]; }) => ({
      ...row,
      tags: row.tag_ids.map((id: number, index: number) => ({
        tags_id: id,
        name: row.tag_names[index]
      })).filter((tag: any) => tag.tags_id !== null)
    }));
  },

  async findById(id: string, userId?: number): Promise<Snippet | null> {
    const result = await pool.query(`
      SELECT 
        s.*,
        u.pseudo as author_pseudo,
        COUNT(DISTINCT l.users_id) as likes_count,
        EXISTS(SELECT 1 FROM users_creating_snippets l2 WHERE l2.snippets_id = s.snippets_id AND l2.users_id = $2) as is_liked,
        ARRAY_AGG(DISTINCT t.tags_id) as tag_ids,
        ARRAY_AGG(DISTINCT t.name) as tag_names
      FROM Snippets s
      LEFT JOIN Users u ON s.users_id = u.users_id
      LEFT JOIN users_creating_snippets l ON s.snippets_id = l.snippets_id
      LEFT JOIN tagging tg ON s.snippets_id = tg.snippets_id
      LEFT JOIN Tags t ON tg.tags_id = t.tags_id
      WHERE s.snippets_id = $1 AND (s.visibility = 'public' OR s.users_id = $2)
      GROUP BY s.snippets_id, u.pseudo
    `, [id, userId || 0]);
    
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      ...row,
      tags: row.tag_ids.map((id: number, index: number) => ({
        tags_id: id,
        name: row.tag_names[index]
      })).filter((tag: any) => tag.tags_id !== null)
    };
  },

  async create(snippetData: CreateSnippetData, userId: number): Promise<Snippet> {
    const { tags } = snippetData;
    const snippets_id = `snippet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Insertion du snippet

      // Gestion des tags
      for (const tagName of tags) {
        let tagResult = await client.query(
          'SELECT tags_id FROM Tags WHERE name = $1',
          [tagName]
        );

        let tagId;
        if (tagResult.rows.length === 0) {
          // Créer le tag s'il n'existe pas
          tagResult = await client.query(
            'INSERT INTO Tags (name) VALUES ($1) RETURNING tags_id',
            [tagName]
          );
          tagId = tagResult.rows[0].tags_id;
        } else {
          tagId = tagResult.rows[0].tags_id;
        }

        // Lier le tag au snippet
        await client.query(
          'INSERT INTO tagging (snippets_id, tags_id) VALUES ($1, $2)',
          [snippets_id, tagId]
        );
      }

      await client.query('COMMIT');

      // Récupérer le snippet complet avec les tags
      const newSnippet = await this.findById(snippets_id, userId);
      return newSnippet!;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async findByUserId(userId: number): Promise<Snippet[]> {
    const result = await pool.query(`
      SELECT 
        s.*,
        u.pseudo as author_pseudo,
        COUNT(DISTINCT l.users_id) as likes_count,
        EXISTS(SELECT 1 FROM users_creating_snippets l2 WHERE l2.snippets_id = s.snippets_id AND l2.users_id = $1) as is_liked,
        ARRAY_AGG(DISTINCT t.tags_id) as tag_ids,
        ARRAY_AGG(DISTINCT t.name) as tag_names
      FROM Snippets s
      LEFT JOIN Users u ON s.users_id = u.users_id
      LEFT JOIN users_creating_snippets l ON s.snippets_id = l.snippets_id
      LEFT JOIN tagging tg ON s.snippets_id = tg.snippets_id
      LEFT JOIN Tags t ON tg.tags_id = t.tags_id
      WHERE s.users_id = $1
      GROUP BY s.snippets_id, u.pseudo
      ORDER BY s.creation_date DESC
    `, [userId]);
    
    return result.rows.map((row: { tag_ids: number[]; tag_names: any[]; }) => ({
      ...row,
      tags: row.tag_ids.map((id: number, index: number) => ({
        tags_id: id,
        name: row.tag_names[index]
      })).filter((tag: any) => tag.tags_id !== null)
    }));
  },

  async toggleLike(snippetId: string, userId: number): Promise<{ likes_count: number; is_liked: boolean }> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Vérifier si l'utilisateur a déjà liké
      const likeResult = await client.query(
        'SELECT * FROM users_creating_snippets WHERE snippets_id = $1 AND users_id = $2',
        [snippetId, userId]
      );

      if (likeResult.rows.length > 0) {
        // Supprimer le like
        await client.query(
          'DELETE FROM users_creating_snippets WHERE snippets_id = $1 AND users_id = $2',
          [snippetId, userId]
        );
      } else {
        // Ajouter le like
        await client.query(
          'INSERT INTO users_creating_snippets (snippets_id, users_id, creation_date) VALUES ($1, $2, NOW())',
          [snippetId, userId]
        );
      }

      // Compter le nombre de likes
      const countResult = await client.query(
        'SELECT COUNT(*) as likes_count FROM users_creating_snippets WHERE snippets_id = $1',
        [snippetId]
      );
      const likes_count = parseInt(countResult.rows[0].likes_count);

      // Vérifier si l'utilisateur aime actuellement
      const isLikedResult = await client.query(
        'SELECT 1 FROM users_creating_snippets WHERE snippets_id = $1 AND users_id = $2',
        [snippetId, userId]
      );
      const is_liked = isLikedResult.rows.length > 0;

      await client.query('COMMIT');

      return { likes_count, is_liked };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};