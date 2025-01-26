import { useState, useEffect } from "react";
import { Movie } from "../interfaces/movie";
import toast from "react-hot-toast";

export const useFetchMovies = (url: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      if (!response.ok) {
        setMovies([]);
        toast.error("No hay coincidencias en tu busqueda, te recomendamos estas películas")
        throw new Error('Error fetching data');
      }
      const data = await response.json();

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
