import './MoviePreview.scss';
import type { Movie } from '../../types/types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../servises/store';

interface MoviePreviewProps {
  movie: Movie;
  position?: 'top' | 'bottom';
}

function MoviePreview({ movie, position = 'top' }: MoviePreviewProps) {
  const { moviesDetails } = useSelector((state: RootState) => state.movieSearch);
  const movieDetails = moviesDetails[movie.imdbID];

  const rating = movieDetails?.imdbRating || '-';
  const genre = movieDetails?.Genre || '';
  const country = movieDetails?.Country || '';

  const mainGenre = genre.split(',')[0];
  const mainCountry = country.split(',')[0];

  return (
    <div className={`movie-preview movie-preview--${position}`}>
      <div className="movie-preview__content">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'}
          alt={movie.Title}
          className="movie-preview__poster"
        />
        <div className="movie-preview__info">
          <h3 className="movie-preview__title">{movie.Title}</h3>
          <p className="movie-preview__year">{movie.Year}</p>

          <div className="movie-preview__meta">
            {mainGenre && <span className="movie-preview__genre">{mainGenre}</span>}
            {mainCountry && <span className="movie-preview__country">{mainCountry}</span>}
          </div>

          <div className="movie-preview__rating">
            <span className="movie-preview__imdb">IMDb</span>
            <span className="movie-preview__score">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePreview;
