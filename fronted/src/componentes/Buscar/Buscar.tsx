import './Buscar.css';
import { BASE_URL_BACKEND } from '../../utils/URLS';
import { useState, useMemo } from 'react';
import CardMovie from '../CardMovie/CardMovie';
import { Lupa } from '../Lupa/Lupa';
import { Movie } from '../../interfaces/movie';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { Banner } from '../Banner/Banner';
import { getFetchURLs } from '../../utils/URLS';
export default function Buscar() {
  const [nameMovie, setNameMovie] = useState(() => {
    return sessionStorage.getItem(`nameMovie`) || '';
  });

  const fetchUrls = getFetchURLs()

  const fetchPopular = `${fetchUrls.popularMovies}`;
  const fetchSearch = `${BASE_URL_BACKEND}/movies/buscar/${nameMovie}`;
  const fetchURL = nameMovie ? fetchSearch : fetchPopular;

  const { movies } = useFetchMovies(fetchURL);
  const { movies: moviesPopulars } = useFetchMovies(fetchPopular);

  const validMovies = useMemo(() => movies.filter((movie) => movie.backdrop_path), [movies]);
  const validMoviesPopular = useMemo(
    () => moviesPopulars.filter((movie) => movie.backdrop_path),
    [moviesPopulars]
  );

  console.log(movies)

  const movieBanner = validMovies[0] || validMoviesPopular[0];

  const handleSearch = (value: string) => {
    setNameMovie(value);
    sessionStorage.setItem(`nameMovie`, value);
  };

  const renderMovies = (movies: Movie[]) =>
    movies.map((movie, index) => <CardMovie key={index} movie={movie} />);

  const loadingSpinner = (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="spinner"></div>
    </div>
  );

  const renderContent = () => {
    if (movies.length > 0) {
      return <div className="contenedorPeliculasBuscar">{renderMovies(validMovies)}</div>;
    } else if (nameMovie && validMovies.length === 0) {
      return (
        <div className="contenedorPeliculasBuscar">{renderMovies(validMoviesPopular)}</div>
      );
    } else if (moviesPopulars.length > 0) {
      return <div className="contenedorPeliculasBuscar">{renderMovies(validMoviesPopular)}</div>;
    } else {
      return loadingSpinner;
    }
  };

  return (
    <div className="contenedor">
      {movieBanner &&
        (
          <><Banner
            movie={movieBanner}
            logoBuscar={true}
            isShort={true}
          />
            <div className="contenedorBuscar">
              <Lupa
                placeholder={'Search Movies'}
                onSubmit={handleSearch}
              />
            </div>
          </>
        )}
      {renderContent()}
    </div>
  );
}
