import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth';
import snippetRoutes from './routes/snippets';
import commentRoutes from './routes/comments';
import userRoutes from './routes/users';

dotenv.config();

const app = express();
const PORT = process.env['BACKEND_PORT'] || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/snippets', commentRoutes); // Les commentaires sont sous /api/snippets/:id/comments
app.use('/api/users', userRoutes);

// Route de santé
app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});