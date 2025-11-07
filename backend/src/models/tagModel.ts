import pool from '../utils/database';
import { Tag } from '../types';

export const tagModel = {
  async findAll(): Promise<Tag[]> {
    const result = await pool.query('SELECT * FROM Tags ORDER BY name');
    return result.rows;
  },
};