// frontend/src/components/pages/Profile/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../organisms/Header/Header';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Button } from '../../atoms/Button/Button';
import { SnippetCard } from '../../molecules/SnippetCard/SnippetCard';
import { useAuth } from '../../../contexts/AuthContext';
import { useSnippets } from '../../../contexts/SnippetContext';
import { useTheme } from '../../../contexts/ThemeContext';
import type { Snippet } from '../../../types';
import { LogOut, Code, Heart, Calendar, Palette } from 'lucide-react';
import styles from './ProfilePage.module.css';

export const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { snippets, toggleLike } = useSnippets();
  const { theme, setTheme, themes } = useTheme();
  
  const [activeTab, setActiveTab] = useState<'my-snippets' | 'liked'>('my-snippets');
  const [userSnippets, setUserSnippets] = useState<Snippet[]>([]);
  const [likedSnippets, setLikedSnippets] = useState<Snippet[]>([]);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    loadUserData();
  }, [userId, snippets]);

  const loadUserData = () => {
    if (!user) return;

    // Filter snippets by current user
    const mySnippets = snippets.filter(s => s.users_id === user.users_id);
    const liked = snippets.filter(s => s.is_liked);

    setUserSnippets(mySnippets);
    setLikedSnippets(liked);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLike = async (id: string) => {
    if (!user) return;
    
    try {
      await toggleLike(id, user.users_id);
      loadUserData();
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setThemeMenuOpen(false);
  };

  const handleSnippetClick = (id: string) => {
    navigate(`/snippet/${id}`);
  };

  if (!user) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.notAuthenticated}>
          <h1>Accès refusé</h1>
          <p>Vous devez être connecté pour accéder à cette page.</p>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric',
    });
  };

  const displayedSnippets = activeTab === 'my-snippets' ? userSnippets : likedSnippets;

  return (
    <div className={styles.page}>
      <Header />
      
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <Avatar name={user.pseudo} size="xl" />
            <div className={styles.userInfo}>
              <h1 className={styles.userName}>{user.pseudo}</h1>
              <p className={styles.userEmail}>{user.email}</p>
              <div className={styles.joinDate}>
                <Calendar size={16} />
                <span>Membre depuis {formatDate(user.creation_date)}</span>
              </div>
            </div>
          </div>

          <div className={styles.profileActions}>
            {/* Sélecteur de thème */}
            <div className={styles.themeSelector}>
              <Button
                variant="outline"
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                icon={<Palette size={18} />}
              >
                Thème
              </Button>

              {themeMenuOpen && (
                <div className={styles.themeMenu}>
                  <div className={styles.themeOptions}>
                    {themes.map((themeOption) => (
                      <button
                        key={themeOption.name}
                        className={`${styles.themeOption} ${
                          theme === themeOption.name ? styles.active : ''
                        }`}
                        onClick={() => handleThemeChange(themeOption.name)}
                      >
                        <span className={styles.themeIcon}>{themeOption.icon}</span>
                        <span>{themeOption.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="danger"
              icon={<LogOut size={18} />}
              onClick={handleLogout}
            >
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statIcon}>
              <Code size={24} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{userSnippets.length}</span>
              <span className={styles.statLabel}>Snippets</span>
            </div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statIcon}>
              <Heart size={24} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>
                {userSnippets.reduce((sum, s) => sum + (s.likes_count || 0), 0)}
              </span>
              <span className={styles.statLabel}>Likes reçus</span>
            </div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statIcon}>
              <Heart size={24} fill="currentColor" />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{likedSnippets.length}</span>
              <span className={styles.statLabel}>Snippets likés</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'my-snippets' ? styles.active : ''}`}
            onClick={() => setActiveTab('my-snippets')}
          >
            <Code size={20} />
            Mes snippets ({userSnippets.length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'liked' ? styles.active : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            <Heart size={20} />
            Snippets likés ({likedSnippets.length})
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {displayedSnippets.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>
                {activeTab === 'my-snippets'
                  ? 'Vous n\'avez pas encore créé de snippet'
                  : 'Vous n\'avez pas encore liké de snippet'}
              </p>
              <p className={styles.emptySubtitle}>
                {activeTab === 'my-snippets'
                  ? 'Créez votre premier snippet pour commencer à partager votre code !'
                  : 'Explorez les snippets et likez ceux qui vous plaisent !'}
              </p>
              <Button
                variant="primary"
                onClick={() => navigate(activeTab === 'my-snippets' ? '/create' : '/explore')}
              >
                {activeTab === 'my-snippets' ? 'Créer un snippet' : 'Explorer'}
              </Button>
            </div>
          ) : (
            <div className={styles.snippetGrid}>
              {displayedSnippets.map((snippet) => (
                <SnippetCard
                  key={snippet.snippets_id}
                  snippet={snippet}
                  onLike={handleLike}
                  onClick={handleSnippetClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};