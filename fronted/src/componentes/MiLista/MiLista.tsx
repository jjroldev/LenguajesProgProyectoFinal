import { useState, useEffect } from 'react';
import CardMovie from '../CardMovie/CardMovie';
import { NavBar } from '../NavBar/NavBar';
import { useFetchFavoritesMovies } from '../../hooks/useFetchFavoritesMovies';
import { removeMovieFavoriteOfUser } from '../../utils/userHelpers';
import { Movie } from '../../interfaces/movie';
import "./MiLista.css"
import { useAuth } from '../../context/AuthContext';
export default function MiLista() {
  const { movies: initialMovies, isLoading } = useFetchFavoritesMovies();
  const [movies, setMovies] = useState(initialMovies);
  const { currentUser } = useAuth()
  useEffect(() => {
    setMovies(initialMovies);
  }, [initialMovies]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleRemoveFavorite = (movie: Movie) => {
    setMovies((prev) => prev.filter((m) => m.movie_id !== movie.movie_id));
    removeMovieFavoriteOfUser(currentUser?.email, movie, () => { });
  };

  if (isLoading) {
    return (
      <>
        <NavBar logoBuscar={true} menu={true} perfil={true} />
        <div className="favorites">
          <div className="contenedorFavoritas">
            <h2 className="tituloFavoritas">Mi Lista</h2>
            <div className={`favoritasContainerSpinner`}>
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavBar logoBuscar={true} menu={true} perfil={true} />
      <div className="favorites">
        <h2 className="tituloFavoritas">Mi Lista</h2>
        <div className='contenedorFavoritas'>
          <div className={`favoritasContainer ${movies.length === 0 ? 'empty' : ''}`}>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <CardMovie
                  key={movie.movie_id}
                  movie={movie}
                  isLarge={true}
                  doDelete={true}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              ))
            ) : (
              <div className="noFavorites">No hay películas favoritas</div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
