import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse, Movie } from '../../utils/types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchSearchMovies = createAsyncThunk<Movie[], string>(
  'movies/search',
  async (searchQuery: string) => {
    console.log('API Key:', API_KEY);

    if (!API_KEY) {
      throw new Error('API key is not configured. Please check your .env file');
    }

    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Unknown error occurred');
    }

    return data.Search || [];
  }
);
