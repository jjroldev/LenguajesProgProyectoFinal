import { useState, useEffect } from "react";
import { Banner } from "../Banner/Banner";
import './Home.css';
import { lazy } from "react";
import { Movie } from "../../interfaces/movie";
const MovieSwiper = lazy(() => import("../MovieSwiper/MovieSwiper"));
import { getFetchURLs } from "../../utils/URLS";
import { useFetchMovies } from "../../hooks/useFetchMovies";
import { useMemo } from "react";
import { useSearch } from "../../context/SearchContext";
export default function Home() {
    const fetchURLS = useMemo(() => getFetchURLs(), []);
    const { movies, isLoading } = useFetchMovies(fetchURLS.popularMovies)
    const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
    const{setSearchTerm}=useSearch()

    useEffect(() => {
        if (!isLoading) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            const selectedMovie = movies[randomIndex];
            setFeaturedMovie(selectedMovie);
        }
    }, [movies]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setSearchTerm("")
    }, []);


    if (isLoading) {
        return (
            <>
                <Banner movie={featuredMovie} logoBuscar={true} isShort={false} />
            </>
        )
    }

    return (
        <div className="contenedorHome">
            <Banner movie={featuredMovie} logoBuscar={true} isShort={false} />
            <div className="contenedorPeliculas">
                <MovieSwiper
                    URL={fetchURLS.popularMovies}
                    title="Popular Movies"
                />
                <MovieSwiper
                    URL={fetchURLS.topRatedMovies}
                    title="Best Voted"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.actionMovies}
                    title="Action"
                />
                <MovieSwiper
                    URL={fetchURLS.adventureMovies}
                    title="Adventure"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.animationMovies}
                    title="Animation"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.comedyMovies}
                    title="Comedy"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.crimeMovies}
                    title="Crime"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.documentaryMovies}
                    title="Documentary"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.dramaMovies}
                    title="Drama"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.familyMovies}
                    title="Family"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.fantasyMovies}
                    title="Fantasy"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.historyMovies}
                    title="History"
                />
                <MovieSwiper
                    URL={fetchURLS.horrorMovies}
                    title="Horror"
                />
                <MovieSwiper
                    URL={fetchURLS.musicMovies}
                    title="Music"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.mysteryMovies}
                    title="Mystery"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.romanceMovies}
                    title="Romance"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.scienceFictionMovies}
                    title="Science Fiction"
                    isLarge
                />
                <MovieSwiper
                    URL={fetchURLS.thrillerMovies}
                    title="Thriller"
                    isLarge
                />

            </div>
        </div>
    );
}
