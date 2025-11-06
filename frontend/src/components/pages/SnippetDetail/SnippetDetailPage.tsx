// frontend/src/components/pages/SnippetDetail/SnippetDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../organisms/Header/Header';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Tag } from '../../atoms/Tag/Tag';
import { Button } from '../../atoms/Button/Button';
import { TextArea } from '../../atoms/TextArea/TextArea';
import { CodeBlock } from '../../molecules/CodeBlock/CodeBlock';
import { CommentItem } from '../../molecules/CommentItem/CommentItem';
import { useSnippets } from '../../../contexts/SnippetContext';
import { useAuth } from '../../../contexts/AuthContext';
import type { Snippet } from '../../../types';
import { Heart, MessageCircle, Share2, Calendar, Eye, Edit, Trash2, ArrowLeft } from 'lucide-react';
import styles from './SnippetDetailPage.module.css';

export const SnippetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSnippetById, toggleLike, addComment } = useSnippets();
  const { user, isAuthenticated } = useAuth();
  
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    loadSnippet();
  }, [id]);

  const loadSnippet = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await getSnippetById(id);
      setSnippet(data);
    } catch (error) {
      console.error('Erreur lors du chargement du snippet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!snippet || !isAuthenticated || !user) return;
    
    try {
      await toggleLike(snippet.snippets_id, user.users_id);
      // Recharger le snippet pour avoir les données à jour
      await loadSnippet();
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!snippet || !commentText.trim() || !isAuthenticated || !user) return;
    
    try {
      setIsSubmittingComment(true);
      await addComment(snippet.snippets_id, commentText, user.users_id);
      setCommentText('');
      // Recharger le snippet pour avoir les commentaires à jour
      await loadSnippet();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShare = () => {
    if (snippet) {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.loading}>
          <div className={styles.spinner}>⏳</div>
          <p>Chargement du snippet...</p>
        </div>
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.notFound}>
          <h1>Snippet introuvable</h1>
          <p>Ce snippet n'existe pas ou a été supprimé.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  const isAuthor = user && snippet.users_id === user.users_id;

  return (
    <div className={styles.page}>
      <Header />
      
      <div className={styles.container}>
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          icon={<ArrowLeft size={20} />}
          className={styles.backButton}
        >
          Retour
        </Button>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.snippetHeader}>
            <div className={styles.authorSection}>
              <Avatar name={snippet.author_pseudo} size="lg" />
              <div className={styles.authorInfo}>
                <h1 className={styles.title}>{snippet.title}</h1>
                <div className={styles.meta}>
                  <span className={styles.author}>{snippet.author_pseudo}</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.date}>
                    <Calendar size={14} />
                    {formatDate(snippet.creation_date)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              {isAuthor && (
                <>
                  <Button
                    variant="outline"
                    icon={<Edit size={18} />}
                    onClick={() => navigate(`/snippet/${snippet.snippets_id}/edit`)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    icon={<Trash2 size={18} />}
                  >
                    Supprimer
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          {snippet.description && (
            <p className={styles.description}>{snippet.description}</p>
          )}

          {/* Tags */}
          {snippet.tags && snippet.tags.length > 0 && (
            <div className={styles.tags}>
              {snippet.tags.map((tag) => (
                <Tag key={tag.tags_id} variant="primary" size="md">
                  {tag.name}
                </Tag>
              ))}
            </div>
          )}

          {/* Code Block */}
          <div className={styles.codeSection}>
            <CodeBlock
              code={snippet.code}
              language={snippet.langage}
              showLineNumbers
            />
          </div>

          {/* Stats & Interactions */}
          <div className={styles.interactions}>
            <Button
              variant={snippet.is_liked ? 'primary' : 'outline'}
              onClick={handleLike}
              icon={<Heart size={20} fill={snippet.is_liked ? 'currentColor' : 'none'} />}
              disabled={!isAuthenticated}
            >
              {snippet.likes_count || 0} J'aime
            </Button>

            <Button
              variant="outline"
              icon={<MessageCircle size={20} />}
            >
              {snippet.comments?.length || 0} Commentaires
            </Button>

            <Button
              variant="outline"
              onClick={handleShare}
              icon={<Share2 size={20} />}
            >
              Partager
            </Button>

            <Button
              variant="ghost"
              icon={<Eye size={20} />}
            >
              Voir le code
            </Button>
          </div>

          {/* Comments Section */}
          <div className={styles.commentsSection}>
            <h2 className={styles.commentsTitle}>
              Commentaires ({snippet.comments?.length || 0})
            </h2>

            {/* Add Comment Form */}
            {isAuthenticated ? (
              <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                <TextArea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  rows={4}
                  fullWidth
                />
                <div className={styles.commentFormActions}>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!commentText.trim() || isSubmittingComment}
                    loading={isSubmittingComment}
                  >
                    Publier
                  </Button>
                </div>
              </form>
            ) : (
              <div className={styles.loginPrompt}>
                <p>Vous devez être connecté pour commenter.</p>
                <Button variant="primary" onClick={() => navigate('/login')}>
                  Se connecter
                </Button>
              </div>
            )}

            {/* Comments List */}
            <div className={styles.commentsList}>
              {snippet.comments && snippet.comments.length > 0 ? (
                snippet.comments.map((comment) => (
                  <CommentItem key={comment.comment_id} comment={comment} />
                ))
              ) : (
                <p className={styles.noComments}>
                  Aucun commentaire pour le moment. Soyez le premier à commenter !
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};