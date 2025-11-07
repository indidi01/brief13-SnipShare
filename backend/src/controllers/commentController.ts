import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { commentModel } from '../models/commentModel';

export const commentController = {
  async getBySnippetId(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const comments = await commentModel.findBySnippetId(id);
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
    }
  },

  async create(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user!.userId;

      if (!content) {
        return res.status(400).json({ error: 'Le contenu du commentaire est obligatoire' });
      }

      const comment = await commentModel.create(content, id, userId);
      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la création du commentaire' });
    }
  },
};