import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

const resetSQL = `
DROP TABLE IF EXISTS tagging CASCADE;
DROP TABLE IF EXISTS users_creating_snippets CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS Snippets CASCADE;
DROP TABLE IF EXISTS Tags CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users(
   Users_id SERIAL,
   pseudo VARCHAR(50)  NOT NULL,
   email VARCHAR(255)  NOT NULL,
   password VARCHAR(255)  NOT NULL,
   creation_date TIMESTAMPTZ NOT NULL,
   modification_date TIMESTAMPTZ NOT NULL,
   PRIMARY KEY(Users_id),
   UNIQUE(pseudo),
   UNIQUE(email)
);

CREATE TABLE Snippets(
   Snippets_id TEXT,
   langage VARCHAR(20)  NOT NULL,
   title VARCHAR(50)  NOT NULL,
   description TEXT,
   code TEXT NOT NULL,
   visibility VARCHAR(20)  NOT NULL,
   creation_date TIMESTAMPTZ NOT NULL,
   modification_date TIMESTAMPTZ NOT NULL,
   Users_id INTEGER NOT NULL,
   PRIMARY KEY(Snippets_id),
   FOREIGN KEY(Users_id) REFERENCES Users(Users_id)
);

CREATE TABLE comments(
   Comment_id SERIAL,
   content TEXT,
   creation_date TIMESTAMPTZ,
   Snippets_id TEXT NOT NULL,
   Users_id INTEGER NOT NULL,
   PRIMARY KEY(Comment_id),
   FOREIGN KEY(Snippets_id) REFERENCES Snippets(Snippets_id),
   FOREIGN KEY(Users_id) REFERENCES Users(Users_id)
);

CREATE TABLE Tags(
   tags_id SERIAL,
   name VARCHAR(50)  NOT NULL,
   PRIMARY KEY(tags_id),
   UNIQUE(name)
);

CREATE TABLE users_creating_snippets(
   Users_id INTEGER,
   Snippets_id TEXT,
   content TEXT,
   creation_date TIMESTAMPTZ,
   PRIMARY KEY(Users_id, Snippets_id),
   FOREIGN KEY(Users_id) REFERENCES Users(Users_id),
   FOREIGN KEY(Snippets_id) REFERENCES Snippets(Snippets_id)
);

CREATE TABLE tagging(
   Snippets_id TEXT,
   tags_id INTEGER,
   PRIMARY KEY(Snippets_id, tags_id),
   FOREIGN KEY(Snippets_id) REFERENCES Snippets(Snippets_id),
   FOREIGN KEY(tags_id) REFERENCES Tags(tags_id)
);
`;

async function resetDatabase() {
  try {
    await pool.query(resetSQL);
    console.log('Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await pool.end();
  }
}

resetDatabase();