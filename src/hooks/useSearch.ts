'use client';

import { useState } from 'react';

export function useSearchState() {
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  return {
    searchTerm,
    updateSearchTerm,
  };
}