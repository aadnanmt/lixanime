// src/hooks/useDetail.js

import { useState, useEffect } from 'react';
import { jikanApi } from '../services/jikanApi';

export const useDetail = (animeId) => {
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!animeId) return;

    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Ambil detail dulu
        const detailData = await jikanApi.getDetail(animeId);
        setAnime(detailData);

        // Baru ambil karakter (biar kalau error karakter, detail tetep muncul)
        try {
          const charData = await jikanApi.getCharacters(animeId);
          setCharacters(charData);
        } catch (err) {
          console.warn("Gagal ambil karakter, tapi gapapa.");
        }

      } catch (err) {
        console.error("Error pd detail:", err);
        setError("Anime tidak ditemukan atau terjadi kesalahan.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [animeId]);

  return { anime, characters, isLoading, error };
};