import { useState, useEffect } from "react";
import {MovieDetails } from "../interfaces/movie";
import { BASE_URL,API_KEY } from "../utils/URLS";
const useFetchMovieDetails = (
  movieId: number | undefined,
) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) {
        setMovie(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,images`
        );

        if (!response.ok) {
          throw new Error(`Error fetching details for movie ID: ${movieId}`);
        }

        const data = await response.json();
        setMovie(data);
      } catch (err: any) {
        console.error("Error fetching movie details:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movie, isLoading, error };
};

export default useFetchMovieDetails;
