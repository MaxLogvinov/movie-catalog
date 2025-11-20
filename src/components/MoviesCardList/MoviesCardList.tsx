import './MoviesCardList.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import type { AppDispatch, RootState } from '../../servises/store';
import { fetchSearchMovies } from '../../servises/thunks/searchMoviesThunk';
import { fetchTopMovies } from '../../servises/thunks/fetchTopMoviesThunk';
import { fetchMultipleMovieDetails } from '../../servises/thunks/fetchMultipleMovieDetailsThunk';
import WelcomeSlider from '../WelcomeSlider/WelcomeSlider';
import MoviePreview from '../MoviePreview/MoviePreview';
import type { Movie } from '../../types/types';

function MoviesCardList() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    topMovies,
    moviesDetails,
    isLoading,
    error,
    errorMessage,
    totalResults,
    searchQuery,
    currentPage
  } = useSelector((state: RootState) => state.movieSearch);

  const [isChangingPage, setIsChangingPage] = useState(false);
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{ top: number; left: number } | null>(
    null
  );
  const lastPageRef = useRef<number | null>(null);

  useEffect(() => {
    dispatch(fetchTopMovies());
  }, [dispatch]);

  useEffect(() => {
    const newMovies = movies.filter(movie => !moviesDetails[movie.imdbID]);
    if (newMovies.length > 0) {
      dispatch(fetchMultipleMovieDetails(newMovies));
    }
  }, [movies, dispatch, moviesDetails]);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;

    if (isChangingPage || newPage === currentPage || newPage === lastPageRef.current) {
      return;
    }

    lastPageRef.current = newPage;
    setIsChangingPage(true);

    dispatch(fetchSearchMovies({ searchQuery, page: newPage })).finally(() => {
      setIsChangingPage(false);
    });
  };

  const totalPages = Math.ceil(parseInt(totalResults) / 10);

  const handleCardMouseEnter = (movie: Movie, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setHoveredMovie(movie);
    setPreviewPosition({
      top: rect.bottom + scrollTop,
      left: rect.left
    });
  };

  const handleCardMouseLeave = () => {
    setHoveredMovie(null);
    setPreviewPosition(null);
  };

  const handleCardClick = (movie: Movie) => {
    window.open(`/movie/${movie.imdbID}`, '_blank', 'noopener,noreferrer');
    setHoveredMovie(null);
    setPreviewPosition(null);
  };

  return (
    <section className="movies__section">
      {isLoading && (
        <div className="movies__loading">
          <p>Searching...</p>
        </div>
      )}
      {error && (
        <div className="movies__error">
          <p>{errorMessage}</p>
        </div>
      )}
      {!error && movies.length > 0 && (
        <div className="movies__results">
          <p>
            Found for your query: "{searchQuery}" ({totalResults} results)
          </p>
        </div>
      )}
      {movies.length > 0 ? (
        <>
          <ul className="movies__list">
            {movies.map(movie => (
              <MoviesCard
                key={movie.imdbID}
                movie={movie}
                onMouseEnter={e => handleCardMouseEnter(movie, e)}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => handleCardClick(movie)}
              />
            ))}
          </ul>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            previousLabel="← Previous"
            onPageChange={handlePageClick}
            pageCount={totalPages}
            forcePage={currentPage - 1}
            containerClassName="pagination"
            pageClassName="pagination__page"
            pageLinkClassName="pagination__link"
            previousClassName="pagination__previous"
            nextClassName="pagination__next"
            breakClassName="pagination__break"
            activeClassName="pagination__active"
            disabledClassName="pagination__disabled"
            renderOnZeroPageCount={null}
            pageRangeDisplayed={window.innerWidth <= 320 ? 1 : 3}
            marginPagesDisplayed={window.innerWidth <= 320 ? 0 : 1}
          />
        </>
      ) : (
        !isLoading && !error && <WelcomeSlider movies={topMovies} />
      )}

      {hoveredMovie && previewPosition && (
        <div
          className="movies__preview-container"
          style={{
            position: 'absolute',
            top: `${previewPosition.top}px`,
            left: `${previewPosition.left}px`,
            zIndex: 1000
          }}
        >
          <MoviePreview movie={hoveredMovie} position="bottom" />
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;
