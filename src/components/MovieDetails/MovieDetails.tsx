import './MovieDetails.scss';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { RootState, AppDispatch } from '../../servises/store';
import { fetchSingleMovieDetails } from '../../servises/thunks/fetchSingleMovieDetails';
import { useMoviesCache } from '../../hooks/useMoviesCache';
import FallbackImage from '../FallbackImage/FallbackImage';

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { moviesDetails } = useSelector((state: RootState) => state.movieSearch);
  const { getCachedMovie, saveMovieToCache } = useMoviesCache();

  const movie = id ? moviesDetails[id] || getCachedMovie(id) : null;

  useEffect(() => {
    if (id && !moviesDetails[id] && !getCachedMovie(id)) {
      dispatch(fetchSingleMovieDetails(id))
        .unwrap()
        .then(movieData => {
          saveMovieToCache(movieData);
        })
        .catch(error => {
          console.error('Failed to load movie details:', error);
        });
    }
  }, [id, dispatch, moviesDetails, getCachedMovie, saveMovieToCache]);

  if (!movie) {
    return (
      <div className="movie-details">
        <Link to="/" className="movie-details__back">
          ← Back to search
        </Link>
        <div className="movie-details-not-found">
          <h2>Movie not found</h2>
          <p>The movie you're looking for doesn't exist or failed to load.</p>
        </div>
      </div>
    );
  }

  const formatActors = (actors: string) => {
    return actors.split(', ').slice(0, 6);
  };

  return (
    <div className="movie-details">
      <Link to="/" className="movie-details__back">
        ← Back to search
      </Link>

      <div className="movie-details__content">
        <div className="movie-details__poster-section">
          <FallbackImage className="movie-details__poster" src={movie.Poster} alt={movie.Title} />
        </div>

        <div className="movie-details__info">
          <div>
            <h1 className="movie-details__title">{movie.Title}</h1>
            <p className="movie-details__year">
              {movie.Year} • {movie.Runtime}
            </p>
          </div>

          {movie.imdbRating !== 'N/A' && (
            <div className="movie-details__ratings">
              <div className="movie-details__imdb-rating">
                <span className="movie-details__imdb-badge">IMDb</span>
                <span className="movie-details__rating-value">{movie.imdbRating}</span>
                <span className="movie-details__rating-votes">
                  /10 {movie.imdbVotes !== 'N/A' && `(${movie.imdbVotes} votes)`}
                </span>
              </div>
            </div>
          )}

          <div className="movie-details__meta-grid">
            {movie.Rated !== 'N/A' && (
              <div className="movie-details__meta-item">
                <span className="movie-details__meta-label">Rated</span>
                <span className="movie-details__meta-value">{movie.Rated}</span>
              </div>
            )}

            {movie.Genre !== 'N/A' && (
              <div className="movie-details__meta-item">
                <span className="movie-details__meta-label">Genre</span>
                <span className="movie-details__meta-value">{movie.Genre}</span>
              </div>
            )}

            {movie.Released !== 'N/A' && (
              <div className="movie-details__meta-item">
                <span className="movie-details__meta-label">Released</span>
                <span className="movie-details__meta-value">{movie.Released}</span>
              </div>
            )}

            {movie.Director !== 'N/A' && (
              <div className="movie-details__meta-item">
                <span className="movie-details__meta-label">Director</span>
                <span className="movie-details__meta-value">{movie.Director}</span>
              </div>
            )}

            {movie.Writer !== 'N/A' && (
              <div className="movie-details__meta-item">
                <span className="movie-details__meta-label">Writer</span>
                <span className="movie-details__meta-value">{movie.Writer}</span>
              </div>
            )}

            {movie.Country !== 'N/A' && (
              <div className="movie-details__meta-item">
                <span className="movie-details__meta-label">Country</span>
                <span className="movie-details__meta-value">{movie.Country}</span>
              </div>
            )}

            {movie.Language !== 'N/A' && (
              <div className="movie-details__meta-item">
                <span className="movie-details__meta-label">Language</span>
                <span className="movie-details__meta-value">{movie.Language}</span>
              </div>
            )}
          </div>

          {movie.Actors !== 'N/A' && (
            <div className="movie-details__meta-item">
              <span className="movie-details__meta-label">Cast</span>
              <div className="movie-details__cast">
                {formatActors(movie.Actors).map((actor, index) => (
                  <span key={index} className="movie-details__actor">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {movie.Plot !== 'N/A' && (
            <div className="movie-details__plot">
              <h3>Synopsis</h3>
              <p>{movie.Plot}</p>
            </div>
          )}

          {movie.Awards !== 'N/A' && movie.Awards !== '' && (
            <div className="movie-details__awards">
              <h3>Awards</h3>
              <p>{movie.Awards}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
