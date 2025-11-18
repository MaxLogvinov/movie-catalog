import './WelcomeSlider.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Thumbs, Autoplay, FreeMode } from 'swiper/modules';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import type { Movie } from '../../utils/types';

interface WelcomeSliderProps {
  movies: Movie[];
}

function WelcomeSlider({ movies }: WelcomeSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!movies || movies.length === 0) return null;

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
                  <button className="welcome-slider__button">Open IMDB</button>
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
    </div>
  );
}

export default WelcomeSlider;
