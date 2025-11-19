import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchMovies } from '../thunks/searchMoviesThunk';
import { fetchTopMovies } from '../thunks/fetchTopMoviesThunk';
import type { MovieSearchState } from '../../types/types';

const initialState: MovieSearchState = {
  movies: [],
  topMovies: [],
  isLoading: false,
  error: false,
  errorMessage: '',
  searchQuery: '',
  currentPage: 1,
  totalResults: '0',
  hasMore: false
};

const movieSearchSlice = createSlice({
  name: 'movieSearch',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearMovies: state => {
      Object.assign(state, initialState);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchMovies.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
        state.errorMessage = '';
        const arg = action.meta.arg;
        if (arg?.page === 1) {
          state.movies = [];
          state.totalResults = '0';
          state.currentPage = 1;
        }
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        const { movies, totalResults, page, searchQuery } = action.payload;
        state.movies = movies;
        state.totalResults = totalResults;
        state.currentPage = page;
        state.searchQuery = searchQuery;
        state.isLoading = false;
        state.error = false;
        state.errorMessage = '';
        const total = parseInt(totalResults);
        state.hasMore = page < Math.ceil(total / 10);
      })

      .addCase(fetchSearchMovies.rejected, (state, action) => {
        const msg = action.payload as string | undefined;
        if (msg === 'aborted') {
          state.isLoading = false;
          return;
        }
        state.isLoading = false;
        state.error = true;
        state.errorMessage = msg || action.error.message || 'Unknown error occurred';
      })

      .addCase(fetchTopMovies.fulfilled, (state, action) => {
        state.topMovies = action.payload;
      })
      .addCase(fetchTopMovies.rejected, action => {
        console.error('Failed to fetch top movies:', action.error);
      });
  }
});

export const { setSearchQuery, clearMovies } = movieSearchSlice.actions;
export default movieSearchSlice.reducer;
