import { useState, useEffect } from "react";
import { Movie } from "../interfaces/movie";
import toast from "react-hot-toast";

const cache: Record<string, Movie[]> = {};

export const useFetchMovies = (url: string, isToast?: boolean) => {
  const cachedMovies = cache[url] || [];
  const [movies, setMovies] = useState<Movie[]>(cachedMovies);
  const [isLoading, setIsLoading] = useState<boolean>(cachedMovies.length === 0);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    if (cache[url]) return;

    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        if (isToast) toast.error("No hay coincidencias en tu búsqueda");
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      cache[url] = data;
      setMovies(data); 
    } catch (err: any) {
      console.error("Error fetching movies:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
  }, [url, movies]);

  return { movies, isLoading, error };
};
