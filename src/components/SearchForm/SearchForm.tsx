import './SearchForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../servises/store';
import { setSearchQuery } from '../../servises/slices/movieSearchSlice';
import { fetchSearchMovies } from '../../servises/thunks/searchMoviesThunk';
import type { ChangeEvent, FormEvent } from 'react';

function SearchForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery } = useSelector((state: RootState) => state.movieSearch);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchQuery(e.target.value));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(fetchSearchMovies(searchQuery));
    }
  }

  return (
    <section className="search-form">
      <form onSubmit={handleSubmit} noValidate>
        <div className="search-form__input-container">
          <input
            placeholder="Enter movie title..."
            type="text"
            required
            className="search-form__input"
            onChange={handleChange}
            value={searchQuery}
          />
          <button type="submit" className="search-form__button">
            Search
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
