import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { snippetModel } from '../models/snippetModel';

export const snippetController = {
  async getAll(req: AuthRequest, res: Response) {
    try {
      const snippets = await snippetModel.findAll(req.user?.userId);
      res.json(snippets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des snippets' });
    }
  },

  async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const snippet = await snippetModel.findById(id, req.user?.userId);
      
      if (!snippet) {
        return res.status(404).json({ error: 'Snippet non trouvé' });
      }
      
      res.json(snippet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération du snippet' });
    }
  },

  async create(req: AuthRequest, res: Response) {
    try {
      const snippetData = req.body;
      const userId = req.user!.userId;

      const snippet = await snippetModel.create(snippetData, userId);
      res.status(201).json(snippet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la création du snippet' });
    }
  },

  async getByUser(req: AuthRequest, res: Response) {
    try {
      const userId = parseInt(req.params.userId) || req.user!.userId;
      const snippets = await snippetModel.findByUserId(userId);
      res.json(snippets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des snippets' });
    }
  },

  async toggleLike(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      const result = await snippetModel.toggleLike(id, userId);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors du like' });
    }
  },
};