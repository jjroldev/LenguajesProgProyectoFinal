import React, { useCallback, useMemo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardMovie from "../CardMovie/CardMovie";
import { Movie } from "../../interfaces/movie";
import { useFetchMovies } from "../../hooks/useFetchMovies";
import "./MovieSwiper.css";

import { responsive } from "../../utils/ResponsiveCarousel";
const MovieSwiper = React.memo(
  ({ URL, title, isLarge }: { URL: string; title: string; isLarge?: boolean }) => {
    const { movies, isLoading } = useFetchMovies(URL);

    const renderMovies = useCallback(
      (movies: Movie[]) =>
        movies.map((movie) => {
          const imagePath = isLarge ? movie.backdrop_path : movie.poster_path;
          return imagePath ? (
            <CardMovie key={movie.movie_id} movie={movie} isLarge={isLarge} />
          ) : null;
        }),
      [isLarge]
    );

    const responsivew = useMemo(
      () => (responsive(isLarge)),
      [isLarge]
    );

    if (isLoading) {
      return null
    }

    return (
      <div className="carousel">
        {movies.length > 0 && (
          <>
            <h2 className="tituloCarousel">{title}</h2>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsivew}
              ssr={true}
              infinite={true}
              autoPlay={false}
              className="carousel-react"
            >
              {renderMovies(movies)}
            </Carousel>
          </>
        )}
      </div>
    );
  }
);

export default MovieSwiper;
