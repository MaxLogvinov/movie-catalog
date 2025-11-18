import './App.scss';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function App() {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Movie Catalog</h1>
        <SearchForm />
      </header>

      <main className="main">
        <MoviesCardList />
      </main>

      <footer className="footer">
        <h4 style={{ margin: '0' }}>Inc Corp</h4>
      </footer>
    </>
  );
}

export default App;
