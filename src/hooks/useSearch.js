// src/hooks/useSearch.js
import { useState } from 'react';
import { jikanApi } from '../services/jikanApi';

export const useSearch = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchAnime = async (query) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const data = await jikanApi.search(query);
      if (data.length === 0) {
        setError("Tidak ada anime yang cocok dengan pencarianmu.");
      }
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
      setError("Gagal melakukan pencarian.");
    } finally {
      setIsLoading(false);
    }
  };

  return { results, isLoading, error, searchAnime };
};