// frontend/src/components/pages/Create/CreatePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../organisms/Header/Header';
import { Input } from '../../atoms/Input/Input';
import { TextArea } from '../../atoms/TextArea/TextArea';
import { Select } from '../../atoms/Select/Select';
import { Tag } from '../../atoms/Tag/Tag';
import { Button } from '../../atoms/Button/Button';
import { CodeBlock } from '../../molecules/CodeBlock/CodeBlock';
import { Code, Plus } from 'lucide-react';
import styles from './CreatePage.module.css';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'sql', label: 'SQL' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

const VISIBILITIES = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Privé' },
  { value: 'unlisted', label: 'Non listé' },
];

export const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    language: 'javascript',
    code: '',
    description: '',
    visibility: 'public' as 'public' | 'private' | 'unlisted',
  });
  
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim()) && tags.length < 5) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    if (!formData.code.trim()) {
      newErrors.code = 'Le code est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // TODO: Intégrer avec le SnippetContext ou appeler l'API
    console.log('Snippet créé:', { ...formData, tags });
    
    // Rediriger vers la page d'accueil après création
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div className={styles.titleWrapper}>
              <Code size={32} className={styles.icon} />
              <h1 className={styles.pageTitle}>Créer un nouveau snippet</h1>
            </div>
            <p className={styles.subtitle}>
              Partagez votre code avec la communauté
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Title */}
            <Input
              label="Titre"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ex: Validation d'email avec Regex"
              error={errors.title}
              fullWidth
              required
            />

            {/* Language & Visibility */}
            <div className={styles.row}>
              <Select
                label="Langage"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                options={LANGUAGES}
                fullWidth
                required
              />
              
              <Select
                label="Visibilité"
                name="visibility"
                value={formData.visibility}
                onChange={handleInputChange}
                options={VISIBILITIES}
                fullWidth
                required
              />
            </div>

            {/* Description */}
            <TextArea
              label="Description (optionnelle)"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez votre snippet..."
              fullWidth
              rows={3}
            />

            {/* Code */}
            <TextArea
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              placeholder="// Votre code ici..."
              error={errors.code}
              fullWidth
              rows={15}
              required
              className={styles.codeTextarea}
            />

            {/* Tags */}
            <div className={styles.tagsSection}>
              <label className={styles.label}>
                Tags (max 5) - Appuyez sur Entrée pour ajouter
              </label>
              <Input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Ajouter un tag..."
                disabled={tags.length >= 5}
                icon={<Plus size={18} />}
                fullWidth
              />
              
              {tags.length > 0 && (
                <div className={styles.tagsList}>
                  {tags.map((tag) => (
                    <Tag
                      key={tag}
                      variant="primary"
                      onRemove={() => handleRemoveTag(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
            </div>

            {/* Preview Toggle */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              fullWidth
            >
              {showPreview ? 'Masquer l\'aperçu' : 'Afficher l\'aperçu'}
            </Button>

            {/* Preview */}
            {showPreview && formData.code && (
              <div className={styles.preview}>
                <h3 className={styles.previewTitle}>Aperçu</h3>
                <CodeBlock
                  code={formData.code}
                  language={formData.language}
                  showLineNumbers
                />
              </div>
            )}

            {/* Actions */}
            <div className={styles.actions}>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Annuler
              </Button>
              <Button type="submit" variant="primary">
                Publier le snippet
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};