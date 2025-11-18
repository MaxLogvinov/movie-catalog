import './MoviesCardList.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesButton from '../MoviesButton/MoviesButton';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../servises/store';
import { fetchSearchMovies } from '../../servises/thunks/searchMoviesThunk';

function MoviesCardList() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, isLoading, error, totalResults, searchQuery, currentPage, hasMore } = useSelector(
    (state: RootState) => state.movieSearch
  );

  const getInitialCount = () => {
    const width = window.innerWidth;
    if (width <= 870) return 2;
    if (width <= 1090) return 3;
    if (width <= 1435) return 4;
    return 5;
  };

  const [visibleMovies, setVisibleMovies] = useState(getInitialCount);

  const handleAddCards = useCallback(() => {
    const width = window.innerWidth;
    let moviesToAdd = 5;
    if (width <= 1435) moviesToAdd = 4;
    if (width <= 1090) moviesToAdd = 3;
    if (width <= 870) moviesToAdd = 2;

    setVisibleMovies(prev => prev + moviesToAdd);
  }, []);

  // Автоматическая подгрузка при достижении конца
  useEffect(() => {
    if (visibleMovies >= 5 && visibleMovies >= movies.length && hasMore && !isLoading) {
      dispatch(fetchSearchMovies({ searchQuery, page: currentPage + 1 }));
    }
  }, [visibleMovies, movies.length, hasMore, isLoading, dispatch, searchQuery, currentPage]);

  const handleNextPage = () => {
    if (hasMore && !isLoading) {
      dispatch(fetchSearchMovies({ searchQuery, page: currentPage + 1 }));
      setVisibleMovies(prev => prev + getInitialCount());
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchSearchMovies({ searchQuery, page: currentPage - 1 }));
      setVisibleMovies(getInitialCount());
    }
  };

  const visibleMoviesData = movies.slice(0, visibleMovies);

  return (
    <section className="movies__section">
      {isLoading && (
        <div className="movies__loading">
          <p>Searching...</p>
        </div>
      )}

      {error && (
        <div className="movies__error">
          <p>No results found for your query.</p>
        </div>
      )}

      {!error && movies.length > 0 && (
        <div className="movies__results">
          <p>
            Found for your query: "{searchQuery}" {totalResults} results:
          </p>
        </div>
      )}

      {movies.length > 0 ? (
        <>
          <ul className="movies__list">
            {visibleMoviesData.map(movie => (
              <MoviesCard key={movie.imdbID} movie={movie} />
            ))}
          </ul>

          <div className="movies__pagination">
            <button
              className="pagination-button pagination-button--prev"
              onClick={handlePrevPage}
              disabled={currentPage <= 1 || isLoading}
            >
              ← Previous
            </button>

            <span className="pagination-info">
              Page {currentPage} of {Math.ceil(parseInt(totalResults) / 10)}
            </span>

            <button
              className="pagination-button pagination-button--next"
              onClick={handleNextPage}
              disabled={!hasMore || isLoading}
            >
              Next →
            </button>
          </div>

          {visibleMovies < movies.length && <MoviesButton handleAddCards={handleAddCards} />}
        </>
      ) : (
        !isLoading &&
        !error && (
          <div className="movies__no-results">
            <p>No results found for your query.</p>
          </div>
        )
      )}
    </section>
  );
}

export default MoviesCardList;
