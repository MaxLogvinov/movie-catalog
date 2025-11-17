import './App.scss';
import SearchForm from './components/SearchForm/SearchForm';
import { useSelector } from 'react-redux';
import type { RootState } from './servises/store';

function App() {
  const { movies, isLoading, error, errorMessage } = useSelector(
    (state: RootState) => state.movieSearch
  );

  return (
    <>
      <header className="header">
        <h1 style={{ flexWrap: 'nowrap' }}>Movie Catalog</h1>
        <SearchForm />
      </header>
      <main className="main">
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
        {movies.length > 0 && (
          <div className="movies-list">
            {movies.map(movie => (
              <div key={movie.imdbID} className="movie-item">
                <h3>
                  {movie.Title} ({movie.Year})
                </h3>
                {movie.Poster !== 'N/A' && (
                  <img src={movie.Poster} alt={movie.Title} style={{ width: '200px' }} />
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <footer>
        <h4 style={{ margin: '0' }}>Inc Corp</h4>
      </footer>
    </>
  );
}

export default App;
