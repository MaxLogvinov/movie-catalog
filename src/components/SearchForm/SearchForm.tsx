import './SearchForm.scss';

function SearchForm() {
  function handleChange() {}

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit', e);
  }

  return (
    <section className="search-form">
      <form onSubmit={handleSubmit} noValidate>
        <div className="search-form__input-container">
          <input
            placeholder="Enter movie title..."
            type="text"
            required
            className="search-form__input"
            onChange={handleChange}
          ></input>
          <button type="submit" className="search-form__button">
            Search
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
