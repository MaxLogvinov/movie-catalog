import './App.css';
import SearchForm from './components/SearchForm/SearchForm';

function App() {
  return (
    <>
      <header className="header">
        <h1 style={{ flexWrap: 'nowrap' }}>Movie Catalog</h1>
        <SearchForm />
      </header>
      <main className="main"></main>
      <footer>
        <h4 style={{ margin: '0' }}>Inc Corp</h4>
      </footer>
    </>
  );
}

export default App;
