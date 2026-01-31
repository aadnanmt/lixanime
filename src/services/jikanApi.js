// src/services/jikanApi.js

const BASE_API_JIKAN = "https://api.jikan.moe/v4";

// --- PRIVATE HELPER --

// Fungsi delay biar gak kena Banned Jikan, cuy (Rate Limit)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Wrapper Fetch
async function fetchAPI(endpoint, retries = 3, backoff = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`${BASE_API_JIKAN}${endpoint}`);

      // jika rate limit capai 400, maka console warn aktif. kamu bisa ganti rate limit kok {bbas}
      if (response.status === 400) {
        console.warn(`Tar, Rate limit kena nih. Nunggu ${backoff}ms...`);
        await delay(backoff * (i + 1));
        continue;
      }

      // jika error, maka
      if (!response.ok) {
        throw new Error(`API lagi Error cuy: ${response.status} ${response.statusText}`);
      }
      
      const json = await response.json();
      return json.data; // return data-ny

    } catch (error) {
      if (i === retries - 1) throw error;
      
      // jika belum, coba lagi setelah jeda (btw 500ms ya)
      await delay(backoff);
    }
  }
}

// --- PUBLIC METHODS ----

export const jikanApi = {

  // Take Anime Trending
  getTrending: () => fetchAPI("/seasons/now?limit=6"),
  
  // Take Top Anime
  getTop: () => fetchAPI("/top/anime?limit=6"),
  
  // Take Anime Season Upcoming
  getUpcoming: () => fetchAPI("/seasons/upcoming?limit=6"),
  
  // Search Anime
  search: (query) => fetchAPI(`/anime?q=${encodeURIComponent(query)}&limit=6`),
  
  // Take Detail Anime with ID
  getDetail: (id) => fetchAPI(`/anime/${id}`),
  
  // Take Characters Anime
  getCharacters: (id) => fetchAPI(`/anime/${id}/characters`),
};