import './MoviesCardList.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesButton from '../MoviesButton/MoviesButton';
import { useState, useCallback } from 'react';
import { type Movie } from '../../utils/types';

interface MoviesCardListProps {
  movies: Movie[];
}

function MoviesCardList({ movies }: MoviesCardListProps) {
  const getInitialCount = () => {
    const width = window.innerWidth;
    if (width <= 718) return 3;
    if (width <= 1238) return 4;
    return 4;
  };

  const [visibleMovies, setVisibleMovies] = useState(getInitialCount);

  const handleAddCards = useCallback(() => {
    const width = window.innerWidth;
    let moviesToAdd = 3;
    if (width <= 1238) moviesToAdd = 2;
    if (width <= 718) moviesToAdd = 2;

    setVisibleMovies(prev => prev + moviesToAdd);
  }, []);

  const visibleMoviesData = movies.slice(0, visibleMovies);

  return (
    <section className="movies__section">
      {movies.length > 0 ? (
        <>
          <ul className="movies__list">
            {visibleMoviesData.map(movie => (
              <MoviesCard key={movie.imdbID} movie={movie} />
            ))}
          </ul>
          {visibleMovies < movies.length && <MoviesButton handleAddCards={handleAddCards} />}
        </>
      ) : (
        <div className="movies__no-results">
          <p>Ничего не найдено</p>
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;
