import { useNavigate } from '@tanstack/react-router';
import Fuse from 'fuse.js';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// project-imports
import SearchModal from 'components/SearchMenu/SearchModal';
import { getAllSearchableItems, SearchableItem } from 'config/searchConfig';
import useAuth from 'hooks/useAuth';
import useSubApp from 'hooks/useSubApp';

// ==============================|| SEARCH CONTEXT - TYPES ||============================== //

export interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchableItem[];
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  setIsOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  handleSelect: (item: SearchableItem) => void;
  searchableItems: SearchableItem[];
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

// ==============================|| SEARCH PROVIDER ||============================== //

export function SearchProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { activeSubApp, changeSubApp } = useSubApp();
  const navigate = useNavigate();

  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  // Indexed searchable items for current user role
  const searchableItems = useMemo(() => {
    return getAllSearchableItems(user);
  }, [user]);

  // Fuse.js instance
  const fuse = useMemo(() => {
    return new Fuse(searchableItems, {
      keys: [
        { name: 'title.id', weight: 0.35 },
        { name: 'title.en', weight: 0.35 },
        { name: 'keywords', weight: 0.25 },
        { name: 'subTitle.id', weight: 0.15 },
        { name: 'subTitle.en', weight: 0.15 },
        { name: 'subAppName.id', weight: 0.1 },
        { name: 'subAppName.en', weight: 0.1 },
        { name: 'description.id', weight: 0.1 },
        { name: 'description.en', weight: 0.1 },
        { name: 'category.id', weight: 0.05 },
        { name: 'category.en', weight: 0.05 }
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 1
    });
  }, [searchableItems]);

  // Search results
  const results = useMemo<SearchableItem[]>(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return searchableItems.slice(0, 8);
    }
    return fuse.search(trimmed).map((res) => res.item);
  }, [query, fuse, searchableItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Global Ctrl + K / Cmd + K listener (Single Global Listener)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle item navigation & sub-app switching
  const handleSelect = useCallback(
    (item: SearchableItem) => {
      closeSearch();

      if (item.external) {
        window.open(item.url, item.target ? '_blank' : '_self', item.target ? 'noopener,noreferrer' : undefined);
        return;
      }

      if (item.subAppId && item.subAppId !== activeSubApp.id) {
        changeSubApp(item.subAppId);
      }

      navigate({ to: item.url as any });
    },
    [activeSubApp.id, changeSubApp, closeSearch, navigate]
  );

  const contextValue = useMemo(
    () => ({
      query,
      setQuery,
      results,
      isOpen,
      openSearch,
      closeSearch,
      setIsOpen,
      selectedIndex,
      setSelectedIndex,
      handleSelect,
      searchableItems
    }),
    [query, results, isOpen, openSearch, closeSearch, setIsOpen, selectedIndex, setSelectedIndex, handleSelect, searchableItems]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
      <SearchModal
        open={isOpen}
        onClose={closeSearch}
        query={query}
        onQueryChange={setQuery}
        results={results}
        selectedIndex={selectedIndex}
        onSelectedIndexChange={setSelectedIndex}
        onSelect={handleSelect}
      />
    </SearchContext.Provider>
  );
}

// ==============================|| HOOK - USE MENU SEARCH ||============================== //

export function useMenuSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useMenuSearch must be used within a SearchProvider');
  }
  return context;
}

export default useMenuSearch;
