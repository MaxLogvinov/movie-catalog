import './MoviesCard.scss';
import { type Movie } from '../../utils/types';

interface MoviesCardProps {
  movie: Movie;
}

function MoviesCard({ movie }: MoviesCardProps) {
  // Форматирование длительности (если есть в API)
  const formatDuration = (runtime: string) => {
    if (!runtime || runtime === 'N/A') return 'N/A';

    const minutes = parseInt(runtime);
    if (isNaN(minutes)) return runtime;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return hours > 0 ? `${hours}ч ${remainingMinutes}мин` : `${remainingMinutes}мин`;
  };

  // Обработчик ошибки загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-movie.jpg'; // Запасное изображение
  };

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__title">{movie.Title}</h2>
        <p className="card__year">{movie.Year}</p>
        <p className="card__type">{movie.Type}</p>
      </div>

      <div className="card__image-container">
        <img
          className="card__image"
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
          alt={movie.Title}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="card__overlay">
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            className="card__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on IMDB
          </a>
        </div>
      </div>

      <div className="card__info">
        <p className="card__duration">Duration: {formatDuration(movie.Runtime || 'N/A')}</p>
        <p className="card__genre">Genre: {movie.Genre || 'N/A'}</p>
        <p className="card__rating">IMDB Rating: {movie.imdbRating || 'N/A'}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
