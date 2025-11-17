import './MoviesButton.scss';

interface MoviesButtonProps {
  handleAddCards: () => void;
}

function MoviesButton({ handleAddCards }: MoviesButtonProps) {
  return (
    <div className="movies-button">
      <button type="button" className="movies-button__element" onClick={handleAddCards}>
        Ещё
      </button>
    </div>
  );
}

export default MoviesButton;
