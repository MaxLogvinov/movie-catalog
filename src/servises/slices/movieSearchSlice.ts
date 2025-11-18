import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchSearchMovies } from '../thunks/searchMoviesThunk';
import type { MovieSearchState } from '../../utils/types';

const initialState: MovieSearchState = {
  movies: [],
  allMovies: [],
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearMovies: state => {
      state.movies = [];
      state.allMovies = [];
      state.error = false;
      state.errorMessage = '';
      state.currentPage = 1;
      state.totalResults = '0';
      state.hasMore = false;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        const { movies, totalResults, page, searchQuery } = action.payload;

        if (page === 1) {
          state.allMovies = movies;
          state.movies = movies;
        } else {
          state.allMovies = [...state.allMovies, ...movies];
          state.movies = state.allMovies;
        }

        state.totalResults = totalResults;
        state.currentPage = page;
        state.searchQuery = searchQuery;
        state.isLoading = false;
        state.error = false;
        state.errorMessage = '';

        const total = parseInt(totalResults);
        const loaded = state.allMovies.length;
        state.hasMore = loaded < total;
      })
      .addCase(fetchSearchMovies.pending, state => {
        state.isLoading = true;
        state.error = false;
        state.errorMessage = '';
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage =
          action.error.message || 'Произошла неизвестная ошибка. Попробуйте повторить позже';
      });
  }
});

export const { setSearchQuery, clearMovies, setCurrentPage } = movieSearchSlice.actions;
export default movieSearchSlice.reducer;
