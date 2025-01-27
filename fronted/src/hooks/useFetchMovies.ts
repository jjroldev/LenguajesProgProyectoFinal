import { useState, useEffect } from "react";
import { Movie } from "../interfaces/movie";
import toast from "react-hot-toast";
import { useSearch } from "../context/SearchContext";
const moviesCache: Record<string, Movie[]> = {}; 

export const useFetchMovies = (url: string,isToast?:boolean) => {
  const [movies, setMovies] = useState<Movie[]>(moviesCache[url] || []);
  const [isLoading, setIsLoading] = useState(!moviesCache[url]);
  const [error, setError] = useState<string | null>(null);
  const {searchTerm}=useSearch()
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
        if(isToast && searchTerm!=""){
          toast.error("No hubo coincidencias con tu busqueda de "+searchTerm)
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