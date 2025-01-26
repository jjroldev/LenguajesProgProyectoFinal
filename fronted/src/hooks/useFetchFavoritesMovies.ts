import { useState, useEffect } from "react";
import { Movie } from "../interfaces/movie";
import { useAuth } from "../context/AuthContext";
import { BASE_URL_BACKEND } from "../utils/URLS";
export const useFetchFavoritesMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {currentUser}=useAuth()

  const fetchFavoriteMovies = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(BASE_URL_BACKEND+`/users/favorites?email=${currentUser?.email}`);
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
    fetchFavoriteMovies ();
  }, []);

  return { movies, isLoading, error };
};
