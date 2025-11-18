import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse, Movie } from '../../utils/types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchSearchMovies = createAsyncThunk<
  { movies: Movie[]; totalResults: string; page: number; searchQuery: string },
  { searchQuery: string; page?: number }
>('movies/search', async ({ searchQuery, page = 1 }) => {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please check your .env file');
  }

  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}&page=${page}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  if (data.Response === 'False') {
    throw new Error(data.Error || 'Unknown error occurred');
  }

  return {
    movies: data.Search || [],
    totalResults: data.totalResults || '0',
    page,
    searchQuery
  };
});
