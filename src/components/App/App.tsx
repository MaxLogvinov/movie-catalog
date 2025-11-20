import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <h1 className="header__title header__title--clickable" onClick={handleTitleClick}>
          Movie Catalog
        </h1>
        <SearchForm />
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<MoviesCardList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Inc Corp</p>
      </footer>
    </>
  );
}

export default App;
