import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FullMovie } from '../../types/types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchSingleMovieDetails = createAsyncThunk<FullMovie, string>(
  'movies/fetchSingleDetails',
  async (imdbID: string) => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Failed to load movie details');
    }

    return data;
  }
);
