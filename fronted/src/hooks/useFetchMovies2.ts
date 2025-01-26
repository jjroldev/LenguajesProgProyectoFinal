import { useState, useEffect } from "react";
import { Movie, MovieDetails } from "../interfaces/movie";

export const useFetchMovies = (url: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      const data = await response.json();

      setMovies(data.results);
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
