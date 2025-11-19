import './MoviesCard.scss';
import { type Movie } from '../../types/types';

interface MoviesCardProps {
  movie: Movie;
}

function MoviesCard({ movie }: MoviesCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/no-poster-found.jpg';
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster-found.jpg'}
        alt={movie.Title}
        onError={handleImageError}
        loading="lazy"
      />

      <div className="card__container">
        <h2 className="card__title">{movie.Title}</h2>
        <p className="card__year">{movie.Year}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
