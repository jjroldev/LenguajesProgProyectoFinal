import './Buscar.css';
import { API_KEY, BASE_URL } from '../../utils/URLS';
import { useState, useMemo } from 'react';
import CardMovie from '../CardMovie/CardMovie';
import { Lupa } from '../Lupa/Lupa';
import { Movie } from '../../interfaces/movie';
// import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useFetchMovies } from '../../hooks/useFetchMovies2';
// import { useLanguage } from '../../context/LanguageContext';
import { Banner } from '../Banner/Banner';
export default function Buscar() {
//   const { language } = 'es_EC';
  const [nameMovie, setNameMovie] = useState(() => {
    return sessionStorage.getItem(`nameMovie`) || '';
  });

  const fetchPopular = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
  const fetchSearch = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${nameMovie}`;
  const fetchURL = nameMovie ? fetchSearch : fetchPopular;

  const { movies } = useFetchMovies(fetchURL);
  const { movies: moviesPopulars } = useFetchMovies(fetchPopular);

  console.log(movies);

  const validMovies = useMemo(() => movies.filter((movie) => movie.backdrop_path), [movies]);
  const validMoviesPopular = useMemo(
    () => moviesPopulars.filter((movie) => movie.backdrop_path),
    [moviesPopulars]
  );

  const movieBanner = validMovies[0] || validMoviesPopular[0];

  const handleSearch = (value: string) => {
    setNameMovie(value);
    sessionStorage.setItem(`nameMovie`, value);
  };

  const renderMovies = (movies: Movie[]) =>
    movies.map((movie, index) => <CardMovie key={index} movie={movie} />);

  const loadingSpinner = (
    <div className="w-full h-full min-h-screen bg-black flex items-center justify-center">
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
