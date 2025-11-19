import './MoviesCardList.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import type { AppDispatch, RootState } from '../../servises/store';
import { fetchSearchMovies } from '../../servises/thunks/searchMoviesThunk';
import { fetchTopMovies } from '../../servises/thunks/fetchTopMoviesThunk';
import WelcomeSlider from '../WelcomeSlider/WelcomeSlider';

function MoviesCardList() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    topMovies,
    isLoading,
    error,
    errorMessage,
    totalResults,
    searchQuery,
    currentPage
  } = useSelector((state: RootState) => state.movieSearch);

  const [isChangingPage, setIsChangingPage] = useState(false);
  const lastPageRef = useRef<number | null>(null);

  useEffect(() => {
    dispatch(fetchTopMovies());
  }, [dispatch]);

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
              <MoviesCard key={movie.imdbID} movie={movie} />
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
    </section>
  );
}

export default MoviesCardList;
