import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    pseudo: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Données de validation invalides' });
  }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Données de validation invalides' });
  }
};

export const validateSnippet = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    title: z.string().min(1).max(50),
    langage: z.string().min(1).max(20),
    code: z.string().min(1),
    description: z.string().optional(),
    visibility: z.enum(['public', 'private', 'unlisted']),
    tags: z.array(z.string()).max(5),
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Données de validation invalides' });
  }
};