import './App.scss';
import SearchForm from './components/SearchForm/SearchForm';
import MoviesCardList from './components/MoviesCardList/MoviesCardList';
import { useSelector } from 'react-redux';
import { type RootState } from './servises/store';

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
        {isLoading && (
          <div className="loading">
            <p>Searching for movies...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Error: {errorMessage}</p>
          </div>
        )}

        <MoviesCardList movies={movies} />
      </main>

      <footer className="footer">
        <h4 style={{ margin: '0' }}>Inc Corp</h4>
      </footer>
    </>
  );
}

export default App;
