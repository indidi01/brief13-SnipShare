// frontend/src/components/pages/Explorer/ExplorerPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../organisms/Header/Header';
import { SearchBar } from '../../molecules/SearchBar/SearchBar';
import { SnippetCard } from '../../molecules/SnippetCard/SnippetCard';
import { Select } from '../../atoms/Select/Select';
import { Tag } from '../../atoms/Tag/Tag';
import { apiService } from '../../../services/api';
import type { Snippet } from '../../../types';
import { Compass, Filter } from 'lucide-react';
import styles from './ExplorerPage.module.css';

const SORT_OPTIONS = [
  { value: 'recent', label: 'Plus récents' },
  { value: 'popular', label: 'Plus populaires' },
  { value: 'comments', label: 'Plus commentés' },
];

const LANGUAGE_FILTERS = [
  { value: 'all', label: 'Tous les langages' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'php', label: 'PHP' },
];

export const ExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Charger les snippets au montage
  useEffect(() => {
    loadSnippets();
  }, []);

  // Appliquer les filtres quand ils changent
  useEffect(() => {
    applyFilters();
  }, [snippets, searchQuery, sortBy, languageFilter, selectedTags]);

  const loadSnippets = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSnippets();
      setSnippets(data);
    } catch (error) {
      console.error('Erreur lors du chargement des snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...snippets];

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.author_pseudo?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par langage
    if (languageFilter !== 'all') {
      filtered = filtered.filter((s) => s.langage === languageFilter);
    }

    // Filtre par tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((s) =>
        selectedTags.some((tag) => s.tags?.some((t) => t.name === tag))
      );
    }

    // Tri
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
        break;
      case 'comments':
        filtered.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
        break;
      case 'recent':
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime()
        );
        break;
    }

    setFilteredSnippets(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLike = async (id: string) => {
    try {
      const result = await apiService.toggleLike(id, 1); // TODO: Utiliser le vrai user ID
      setSnippets((prev) =>
        prev.map((s) =>
          s.snippets_id === id
            ? { ...s, likes_count: result.likes_count, is_liked: result.is_liked }
            : s
        )
      );
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const handleSnippetClick = (id: string) => {
    navigate(`/snippet/${id}`);
  };

  // Extraire tous les tags uniques
  const allTags = Array.from(
    new Set(snippets.flatMap((s) => s.tags?.map((t) => t.name) || []))
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div className={styles.titleWrapper}>
            <Compass size={32} className={styles.icon} />
            <h1 className={styles.pageTitle}>Explorer les snippets</h1>
          </div>
          <p className={styles.subtitle}>
            Découvrez {filteredSnippets.length} snippet{filteredSnippets.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Barre de recherche */}
        <div className={styles.searchSection}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filtres */}
        <div className={styles.filters}>
          <div className={styles.filterHeader}>
            <Filter size={20} />
            <span>Filtres</span>
          </div>

          <div className={styles.filterRow}>
            <Select
              name="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={SORT_OPTIONS}
              className={styles.filterSelect}
            />

            <Select
              name="language"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              options={LANGUAGE_FILTERS}
              className={styles.filterSelect}
            />
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className={styles.tagsFilter}>
              <span className={styles.tagsLabel}>Tags populaires:</span>
              <div className={styles.tagsList}>
                {allTags.slice(0, 10).map((tag) => (
                  <Tag
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'primary' : 'default'}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className={styles.tag}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Liste des snippets */}
        {loading ? (
          <div className={styles.loading}>Chargement des snippets...</div>
        ) : filteredSnippets.length === 0 ? (
          <div className={styles.empty}>
            <p>Aucun snippet trouvé.</p>
            <p className={styles.emptyHint}>
              Essayez de modifier vos critères de recherche ou de créer un nouveau snippet !
            </p>
          </div>
        ) : (
          <div className={styles.snippetGrid}>
            {filteredSnippets.map((snippet) => (
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
  );
};