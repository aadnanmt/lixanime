import { useState, useEffect } from 'react';
import { jikanApi } from '../services/jikanApi';

const CACHE_KEY = 'Lixanime_LS';
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 Jam dalam milidetik/ms

export const useHome = () => {
  const [data, setData] = useState({
    trending: [],
    top: [],
    upcoming: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkCacheAndFetch = async () => {
      setIsLoading(true);

      // cek LocalStorage
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data: storedData } = JSON.parse(cached);
        const now = new Date().getTime();

        // jika data masih fresh, kita pakai dulu cuy!
        if (now - timestamp < CACHE_EXPIRY) {
          console.log("menggunakan data cache (Mengemat API)");
          setData(storedData);
          setIsLoading(false);
          return; // Stop dulu di sini, gak pakai fetch API
        }
      }

      // jika ls kosong/basi, baru fetch api jikan baru
      console.log("cache expired, mengambil data baru dlu...");
      try {
        // Kita fetch sequential
        const trendingData = await jikanApi.getTrending();
        await new Promise(r => setTimeout(r, 500));

        const topData = await jikanApi.getTop();
        await new Promise(r => setTimeout(r, 500));

        const upcomingData = await jikanApi.getUpcoming();

        const newData = {
            trending: trendingData || [],
            top: topData || [],
            upcoming: upcomingData || []
        };

        // update State
        setData(newData);

        // simpan -> LS(Local Storage)
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: new Date().getTime(),
            data: newData
        }));

      } catch (err) {
        console.error("Gagal ambil data:", err);
        setError("Gagal memuat data baru.");
        
        // Fallback cache lama
        if (cached) {
            const { data: storedData } = JSON.parse(cached);
            setData(storedData);
            console.log("API Error cuy, menggunakan cache lama");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkCacheAndFetch();
  }, []);

  return { ...data, isLoading, error };
};