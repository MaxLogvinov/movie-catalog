import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FullMovie, Movie } from '../../types/types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMultipleMovieDetails = createAsyncThunk<FullMovie[], Movie[]>(
  'movies/fetchMultipleDetails',
  async (movies: Movie[]) => {
    if (!API_KEY) throw new Error('API key is not configured');

    const promises = movies.map(async (movie): Promise<FullMovie> => {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error(data.Error || 'Failed to load movie details');
      }

      return data;
    });

    return await Promise.all(promises);
  }
);
