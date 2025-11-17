import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchSearchMovies } from '../thunks/searchMoviesThunk';
import type { MovieSearchState } from '../../utils/types';

const initialState: MovieSearchState = {
  movies: [],
  isLoading: false,
  error: false,
  errorMessage: '',
  searchQuery: ''
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
      state.error = false;
      state.errorMessage = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.isLoading = false;
        state.error = false;
        state.errorMessage = '';
      })
      .addCase(fetchSearchMovies.pending, state => {
        state.movies = [];
        state.isLoading = true;
        state.error = false;
        state.errorMessage = '';
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.movies = [];
        state.isLoading = false;
        state.error = true;
        state.errorMessage =
          action.error.message || 'Произошла неизвестная ошибка. Попробуйте повторить позже';
      });
  }
});

export const { setSearchQuery, clearMovies } = movieSearchSlice.actions;
export default movieSearchSlice.reducer;
