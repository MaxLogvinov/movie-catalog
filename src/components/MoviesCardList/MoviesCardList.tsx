import './MoviesCardList.scss';
import MoviesCard from '../MoviesCard/MoviesCard';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import type { AppDispatch, RootState } from '../../servises/store';
import { fetchSearchMovies } from '../../servises/thunks/searchMoviesThunk';

function MoviesCardList() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, isLoading, error, errorMessage, totalResults, searchQuery, currentPage } =
    useSelector((state: RootState) => state.movieSearch);

  const [isChangingPage, setIsChangingPage] = useState(false);
  const lastPageRef = useRef<number | null>(null);

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

  const getErrorMessage = () => {
    if (errorMessage?.includes('Server error')) {
      return 'Server error, please try again later';
    } else if (errorMessage?.includes('Network error')) {
      return 'Network error, please check your connection';
    } else if (errorMessage?.includes('API key')) {
      return 'API configuration error';
    } else if (errorMessage?.includes('No movies found')) {
      return 'No movies found for your search';
    } else if (errorMessage?.includes('Too many results')) {
      return 'Too many results, please refine your search';
    } else {
      return 'No results found for your query';
    }
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
          <p>{getErrorMessage()}</p>
        </div>
      )}

      {!error && movies.length > 0 && (
        <div className="movies__results">
          <p>
            Found for your query: "{searchQuery}" ({totalResults} results)
            <br />
            Showing {movies.length} movies on page {currentPage} of {totalPages}
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
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
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
          />
        </>
      ) : (
        !isLoading &&
        !error && (
          <div className="movies__no-results">
            <p>Welcome</p>
          </div>
        )
      )}
    </section>
  );
}

export default MoviesCardList;
