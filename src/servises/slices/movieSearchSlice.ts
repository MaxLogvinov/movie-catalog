import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchMovies } from '../thunks/searchMoviesThunk';
import type { MovieSearchState } from '../../utils/types';

const initialState: MovieSearchState = {
  movies: [],
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
      .addCase(fetchSearchMovies.pending, state => {
        state.isLoading = true;
        state.error = false;
        state.errorMessage = '';
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.error.message || 'Unknown error occurred';
      });
  }
});

export const { setSearchQuery, clearMovies } = movieSearchSlice.actions;
export default movieSearchSlice.reducer;
