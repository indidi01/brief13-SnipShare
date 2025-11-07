import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { userModel } from '../models/userModel';

export const userController = {
  async getMe(req: AuthRequest, res: Response) {
    try {
      const user = await userModel.findById(req.user!.userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  },

  async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const user = await userModel.findById(parseInt(id));
      
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  },
};