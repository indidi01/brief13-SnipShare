import pool from '../utils/database';
import { hashPassword, verifyPassword } from '../utils/password';
import { User, RegisterData, LoginData } from '../types';

export const userModel = {
  async create(userData: RegisterData): Promise<User> {
    const { pseudo, email, password } = userData;
    const hashedPassword = await hashPassword(password);
    
    const result = await pool.query(
      'INSERT INTO Users (pseudo, email, password, creation_date, modification_date) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING users_id, pseudo, email, creation_date, modification_date',
      [pseudo, email, hashedPassword]
    );
    return result.rows[0];
  },

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM Users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  },

  async findById(id: number): Promise<User | null> {
    const result = await pool.query(
      'SELECT users_id, pseudo, email, creation_date, modification_date FROM Users WHERE users_id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async verifyCredentials(loginData: LoginData): Promise<User | null> {
    const user = await this.findByEmail(loginData.email);
    if (!user || !user.password) return null;

    const isValid = await verifyPassword(user.password, loginData.password);
    return isValid ? user : null;
  },

  async findByPseudo(pseudo: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT users_id, pseudo, email, creation_date, modification_date FROM Users WHERE pseudo = $1',
      [pseudo]
    );
    return result.rows[0] || null;
  },
};