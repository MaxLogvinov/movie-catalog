import { useCallback } from 'react';
import type { FullMovie } from '../types/types';

export const useMoviesCache = () => {
  const getCachedMovie = useCallback((imdbID: string): FullMovie | null => {
    try {
      const cached = localStorage.getItem('moviesCache');
      if (cached) {
        const moviesCache: { [key: string]: FullMovie } = JSON.parse(cached);
        return moviesCache[imdbID] || null;
      }
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
    }
    return null;
  }, []);

  const getAllCachedMovies = useCallback((): { [key: string]: FullMovie } => {
    try {
      const cached = localStorage.getItem('moviesCache');
      return cached ? JSON.parse(cached) : {};
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return {};
    }
  }, []);

  const saveMovieToCache = useCallback((movie: FullMovie) => {
    try {
      const cached = localStorage.getItem('moviesCache');
      const moviesCache = cached ? JSON.parse(cached) : {};
      moviesCache[movie.imdbID] = movie;
      localStorage.setItem('moviesCache', JSON.stringify(moviesCache));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, []);

  return { getCachedMovie, getAllCachedMovies, saveMovieToCache };
};
