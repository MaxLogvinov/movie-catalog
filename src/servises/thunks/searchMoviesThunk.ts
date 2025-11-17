import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiResponse, Movie } from '../../utils/types';

const API_KEY = import.meta.env.OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchSearchMovies = createAsyncThunk<Movie[], string>(
  'movies/search',
  async (searchQuery: string) => {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`
    );
    const data: ApiResponse = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Unknown error occurred');
    }

    return data.Search || [];
  }
);
