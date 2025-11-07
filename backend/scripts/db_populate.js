import { Pool } from 'pg';
import { hashPassword } from '../src/utils/password.js';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

async function populateDatabase() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Créer des utilisateurs
    const users = [
      { pseudo: 'JeanDev', email: 'jean@collectivite.fr', password: await hashPassword('password123') },
      { pseudo: 'MarieCode', email: 'marie@collectivite.fr', password: await hashPassword('password123') },
      { pseudo: 'DevMaster', email: 'dev@collectivite.fr', password: await hashPassword('password123') }
    ];

    const createdUsers = [];
    for (const user of users) {
      const result = await client.query(
        'INSERT INTO Users (pseudo, email, password, creation_date, modification_date) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING users_id',
        [user.pseudo, user.email, user.password]
      );
      createdUsers.push({ ...user, users_id: result.rows[0].users_id });
    }

    // Créer des tags
    const tags = ['javascript', 'react', 'nodejs', 'python', 'database', 'typescript', 'html', 'css'];
    const createdTags = [];
    for (const tag of tags) {
      const result = await client.query(
        'INSERT INTO Tags (name) VALUES ($1) RETURNING tags_id',
        [tag]
      );
      createdTags.push({ name: tag, tags_id: result.rows[0].tags_id });
    }

    // Créer des snippets
    const snippets = [
      {
        id: 'snippet_1',
        title: "Validation d'email avec Regex",
        langage: 'javascript',
        description: "Fonction utilitaire pour valider les adresses email",
        code: `function validateEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}`,
        visibility: 'public',
        userId: createdUsers[0].users_id,
        tags: ['javascript', 'regex']
      },
      {
        id: 'snippet_2',
        title: "Connection PostgreSQL",
        langage: 'python',
        description: "Connection sécurisée à une base PostgreSQL",
        code: `import psycopg2\n\ndef get_db_connection():\n    conn = psycopg2.connect(\n        host="localhost",\n        database="snipshare",\n        user="admin",\n        password="password"\n    )\n    return conn`,
        visibility: 'public',
        userId: createdUsers[1].users_id,
        tags: ['python', 'database']
      },
      {
        id: 'snippet_3',
        title: "Composant React Button",
        langage: 'typescript',
        description: "Composant Button réutilisable avec TypeScript",
        code: `interface ButtonProps {\n  children: React.ReactNode;\n  variant?: 'primary' | 'secondary';\n  onClick?: () => void;\n}\n\nexport const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {\n  return (\n    <button className={\`btn btn-\${variant}\`} onClick={onClick}>\n      {children}\n    </button>\n  );\n};`,
        visibility: 'public',
        userId: createdUsers[2].users_id,
        tags: ['react', 'typescript']
      }
    ];

    for (const snippet of snippets) {
      await client.query(
        `INSERT INTO Snippets (snippets_id, langage, title, description, code, visibility, creation_date, modification_date, users_id)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), $7)`,
        [snippet.id, snippet.langage, snippet.title, snippet.description, snippet.code, snippet.visibility, snippet.userId]
      );

      // Associer les tags
      for (const tagName of snippet.tags) {
        const tag = createdTags.find(t => t.name === tagName);
        if (tag) {
          await client.query(
            'INSERT INTO tagging (snippets_id, tags_id) VALUES ($1, $2)',
            [snippet.id, tag.tags_id]
          );
        }
      }
    }

    // Créer des commentaires
    const comments = [
      {
        content: "Super fonction ! Je l'utilise dans tous mes projets.",
        snippetId: 'snippet_1',
        userId: createdUsers[1].users_id
      },
      {
        content: "Très utile, merci pour le partage !",
        snippetId: 'snippet_1',
        userId: createdUsers[2].users_id
      },
      {
        content: "Je préfère utiliser les pools de connexion pour de meilleures performances.",
        snippetId: 'snippet_2',
        userId: createdUsers[0].users_id
      }
    ];

    for (const comment of comments) {
      await client.query(
        'INSERT INTO comments (content, creation_date, snippets_id, users_id) VALUES ($1, NOW(), $2, $3)',
        [comment.content, comment.snippetId, comment.userId]
      );
    }

    // Créer des likes
    const likes = [
      { userId: createdUsers[1].users_id, snippetId: 'snippet_1' },
      { userId: createdUsers[2].users_id, snippetId: 'snippet_1' },
      { userId: createdUsers[0].users_id, snippetId: 'snippet_2' },
      { userId: createdUsers[1].users_id, snippetId: 'snippet_3' }
    ];

    for (const like of likes) {
      await client.query(
        'INSERT INTO users_creating_snippets (users_id, snippets_id, creation_date) VALUES ($1, $2, NOW())',
        [like.userId, like.snippetId]
      );
    }

    await client.query('COMMIT');
    console.log('Database populated successfully with sample data');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error populating database:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

populateDatabase();