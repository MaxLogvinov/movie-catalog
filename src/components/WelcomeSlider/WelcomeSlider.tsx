import './WelcomeSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Thumbs, Autoplay, FreeMode } from 'swiper/modules';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import type { Movie } from '../../types/types';
import MoviePreview from '../MoviePreview/MoviePreview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMultipleMovieDetails } from '../../servises/thunks/fetchMultipleMovieDetailsThunk';
import { type AppDispatch, type RootState } from '../../servises/store';
import { useEffect } from 'react';

interface WelcomeSliderProps {
  movies: Movie[];
}

function WelcomeSlider({ movies }: WelcomeSliderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { moviesDetails } = useSelector((state: RootState) => state.movieSearch);

  useEffect(() => {
    const newMovies = movies.filter(movie => !moviesDetails[movie.imdbID]);
    if (newMovies.length > 0) {
      dispatch(fetchMultipleMovieDetails(newMovies));
    }
  }, [movies, dispatch, moviesDetails]);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);

  if (!movies || movies.length === 0) return null;

  const handleButtonMouseEnter = (movie: Movie) => {
    setHoveredMovie(movie);
  };

  const handleButtonMouseLeave = () => {
    setHoveredMovie(null);
  };

  const handleDetailsClick = (movie: Movie) => {
    window.open(`/movie/${movie.imdbID}`, '_blank', 'noopener,noreferrer');
    setHoveredMovie(null);
  };

  return (
    <div className="welcome-slider">
      <h2 className="welcome-slider__title">Top Movies Today</h2>

      <div className="welcome-slider__layout">
        <Swiper
          modules={[Navigation, Thumbs, Autoplay]}
          thumbs={{ swiper: thumbsSwiper }}
          navigation
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className="welcome-slider__main"
        >
          {movies.map(movie => (
            <SwiperSlide key={movie.imdbID}>
              <div className="welcome-slider__slide">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'}
                  alt={movie.Title}
                  className="welcome-slider__poster"
                />

                <div className="welcome-slider__info">
                  <h3 className="welcome-slider__movie-title">{movie.Title}</h3>
                  <p className="welcome-slider__year">{movie.Year}</p>
                  <button
                    className="welcome-slider__button"
                    onMouseEnter={() => handleButtonMouseEnter(movie)}
                    onMouseLeave={handleButtonMouseLeave}
                    onClick={() => handleDetailsClick(movie)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          modules={[Thumbs, FreeMode]}
          onSwiper={setThumbsSwiper}
          direction="vertical"
          slidesPerView={5}
          spaceBetween={10}
          freeMode
          watchSlidesProgress
          className="welcome-slider__thumbs"
        >
          {movies.map(movie => (
            <SwiperSlide key={movie.imdbID}>
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'}
                alt={movie.Title}
                className="welcome-slider__thumb"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {hoveredMovie && (
        <div className="welcome-slider__preview-container">
          <MoviePreview movie={hoveredMovie} position="top" />
        </div>
      )}
    </div>
  );
}

export default WelcomeSlider;
