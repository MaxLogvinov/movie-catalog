import './MoviesCard.scss';
import { type Movie } from '../../types/types';
import FallbackImage from '../FallbackImage/FallbackImage';

interface MoviesCardProps {
  movie: Movie;
  onMouseEnter: (event: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function MoviesCard({ movie, onMouseEnter, onMouseLeave, onClick }: MoviesCardProps) {
  return (
    <li className="card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
      <FallbackImage className="card__image" src={movie.Poster} alt={movie.Title} />

      <div className="card__container">
        <h2 className="card__title">{movie.Title}</h2>
        <p className="card__year">{movie.Year}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
