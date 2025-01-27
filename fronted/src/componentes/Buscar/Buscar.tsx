import './Buscar.css';
import { BASE_URL_BACKEND } from '../../utils/URLS';
import { useMemo } from 'react';
import CardMovie from '../CardMovie/CardMovie';
import { Movie } from '../../interfaces/movie';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { NavBar } from '../NavBar/NavBar';
import { useEffect } from 'react';
import { useSearch } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
export default function Buscar() {

  const { searchTerm } = useSearch()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    if (searchTerm === "") {
      navigate("/home", { state: { fromBuscar: true } });
    }
  }, [searchTerm]);



  const fetchSearch = `${BASE_URL_BACKEND}/movies/buscar/${searchTerm}`;
  const fetchURL = fetchSearch;

  const { movies, isLoading } = useFetchMovies(fetchURL, true);

  const validMovies = useMemo(() => movies.filter((movie) => movie.backdrop_path), [movies]);

  const renderMovies = (movies: Movie[]) =>
    movies.map((movie, index) => <CardMovie key={index} movie={movie} />);

  const renderContent = () => {
    if (movies.length > 0) {
      return <div className="contenedorPeliculasBuscar">{renderMovies(validMovies)}</div>;
    } else if (searchTerm && validMovies.length == 0) {
      return (
        <>
          <div className='contenedorPeliculasNoE'>
            <p>La busqueda de {searchTerm} no arrrojó coincidencias.</p>
          </div>
        </>
      )
    };
  }

  if (isLoading) {
    <>
      <div className="contenedor">
        <NavBar perfil={true} menu={true} logoBuscar={true} condicionExpanded={true} />
      </div>
    </>
  }

  return (
    <div className="contenedor">
      <NavBar perfil={true} menu={true} logoBuscar={true} condicionExpanded={true} />
      <div className="contenedorBuscar">
        {renderContent()}
      </div>
    </div>
  );
}
