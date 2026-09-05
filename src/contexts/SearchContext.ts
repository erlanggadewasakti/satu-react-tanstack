import { createContext, useContext } from 'react';
import { SearchableItem } from 'config/searchConfig';

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

// ==============================|| HOOK - USE MENU SEARCH ||============================== //

export function useMenuSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useMenuSearch must be used within a SearchProvider');
  }
  return context;
}

export default useMenuSearch;
