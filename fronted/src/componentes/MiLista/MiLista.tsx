import './MiLista.css'
import CardMovie from '../CardMovie/CardMovie'
import { NavBar } from '../NavBar/NavBar'
import { useFetchFavoritesMovies } from '../../hooks/useFetchFavoritesMovies'
export function MiLista() {

    const { movies } = useFetchFavoritesMovies()
    console.log(movies)
    return (
        <>
            <NavBar logoBuscar={true} menu={true} />

            <div className="favorites">
                <div className='contenedorFavoritas'>
                    <h2 className='tituloFavoritas'>Mi Lista</h2>
                    <div className={`favoritasContainer ${movies.length === 0 ? 'empty' : ''}`}>
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <CardMovie key={movie.movie_id} movie={movie} isLarge={true} doDelete={true}/>
                            ))
                        ) : (
                            <div className="noFavorites">No hay películas favoritas</div>
                        )}
                    </div>

                </div>
            </div>
        </>

    )
}