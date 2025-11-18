import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse, Movie } from '../../utils/types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchSearchMovies = createAsyncThunk<
  { movies: Movie[]; totalResults: string; page: number; searchQuery: string },
  { searchQuery: string; page?: number }
>('movies/search', async ({ searchQuery, page = 1 }) => {
  if (!API_KEY) {
    throw new Error('API key is not configured');
  }

  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}&page=${page}`
  );

  if (!response.ok) {
    // Обработка HTTP ошибок
    if (response.status >= 500) {
      throw new Error('Server error, please try again later');
    } else if (response.status === 401) {
      throw new Error('API key is invalid');
    } else {
      throw new Error(`Network error: ${response.status}`);
    }
  }

  const data: ApiResponse = await response.json();

  if (data.Response === 'False') {
    if (data.Error?.includes('Movie not found')) {
      throw new Error('No movies found for your search');
    } else if (data.Error?.includes('Too many results')) {
      throw new Error('Too many results, please refine your search');
    } else {
      throw new Error(data.Error || 'Unknown error occurred');
    }
  }

  return {
    movies: data.Search || [],
    totalResults: data.totalResults || '0',
    page,
    searchQuery
  };
});
