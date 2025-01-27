import { useState, useEffect } from "react";
import { Movie } from "../interfaces/movie";
import toast from "react-hot-toast";
const moviesCache: Record<string, Movie[]> = {}; 

export const useFetchMovies = (url: string,isToast?:boolean) => {
  const [movies, setMovies] = useState<Movie[]>(moviesCache[url] || []);
  const [isLoading, setIsLoading] = useState(!moviesCache[url]);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    if (moviesCache[url]) {
      setMovies(moviesCache[url]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        if(isToast){
          toast.error("No hay coincidencias en tu busqueda")
        }
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      moviesCache[url] = data;
      setMovies(data);
    } catch (err: any) {
      console.error("Error fetching movies:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [url]);

  return { movies, isLoading, error };
};