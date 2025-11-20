import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse, Movie } from '../../types/types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchTopMovies = createAsyncThunk<Movie[]>('movies/fetchTop', async () => {
  const randomPage = Math.floor(Math.random() * 100) + 1;

  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=movie&type=movie&page=${randomPage}`
  );

  const data: ApiResponse = await response.json();

  if (data.Response === 'False' || !data.Search) {
    throw new Error('Failed to load top movies');
  }

  return data.Search.slice(0, 10);
});
