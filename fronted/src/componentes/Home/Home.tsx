import { useState, useEffect } from "react";
import { Banner } from "../Banner/Banner";
import './Home.css';
import { Movie } from "../../interfaces/movie";
// const MovieSwiper = React.lazy(() => import("../MovieSwiper/MovieSwiper"));
import { getFetchURLs } from "../../utils/URLS";
import { getMovies } from "../../utils/moviesHelpers";
export default function Home() {
  const fetchURLS = getFetchURLs()
  const [movies,setMovies]=useState<Movie[]>([])

  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    updateMovies();
  }, []);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const selectedMovie = movies[randomIndex];
      setFeaturedMovie(selectedMovie);
    }
  }, [movies]);

  const updateMovies = async () => {
    const moviesData = await getMovies();
    setMovies(moviesData);
  };

  if (movies.length === 0) {
    return <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="spinner"></div>
    </div>
  }

  return (
    <div className="contenedorHome">

      {featuredMovie && (
        <>
          <Banner movie={featuredMovie} logoBuscar={true} isShort={false} />
          
        </>
      )}
    </div>
  );
}
