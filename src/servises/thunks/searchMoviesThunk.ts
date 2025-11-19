import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse, Movie } from '../../types/types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchSearchMovies = createAsyncThunk<
  { movies: Movie[]; totalResults: string; page: number; searchQuery: string },
  { searchQuery: string; page?: number }
>('movies/search', async ({ searchQuery, page = 1 }) => {
  if (!API_KEY) throw new Error('API key is not configured');

  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}&page=${page}`
  );

  if (!response.ok) {
    if (response.status >= 500) throw new Error('Server error, try again later');
    if (response.status === 401) throw new Error('Invalid API key');
    throw new Error(`Network error: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  if (data.Response === 'False') {
    if (data.Error?.includes('Movie not found')) {
      throw new Error('No movies found for your search');
    }
    if (data.Error?.includes('Too many results')) {
      throw new Error('Too many results, refine your search');
    }
    throw new Error(data.Error || 'Unknown error');
  }

  let movies = data.Search || [];

  const unique = Array.from(new Map(movies.map(m => [m.imdbID, m])).values());

  movies = unique.slice(0, 10);

  return {
    movies,
    totalResults: data.totalResults ?? '0',
    page,
    searchQuery
  };
});
