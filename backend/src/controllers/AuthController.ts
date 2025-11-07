import { Request, Response } from 'express';
import { userModel } from '../models/userModel';
import { generateToken } from '../utils/jwt';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { pseudo, email, password } = req.body;

      // Vérifier si l'email ou le pseudo existe déjà
      const existingEmail = await userModel.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email déjà utilisé' });
      }

      const existingPseudo = await userModel.findByPseudo(pseudo);
      if (existingPseudo) {
        return res.status(400).json({ error: 'Pseudo déjà utilisé' });
      }

      // Créer l'utilisateur
      const user = await userModel.create({ pseudo, email, password });
      const token = generateToken(user.users_id);

      res.status(201).json({
        user: {
          users_id: user.users_id,
          pseudo: user.pseudo,
          email: user.email,
          creation_date: user.creation_date,
          modification_date: user.modification_date,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await userModel.verifyCredentials({ email, password });
      if (!user) {
        return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
      }

      const token = generateToken(user.users_id);

      res.json({
        user: {
          users_id: user.users_id,
          pseudo: user.pseudo,
          email: user.email,
          creation_date: user.creation_date,
          modification_date: user.modification_date,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
  },
};