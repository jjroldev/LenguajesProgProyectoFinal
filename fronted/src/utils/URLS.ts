export const URL_IMAGE_POSTER = "https://image.tmdb.org/t/p/w500";
export const URL_IMAGE_BACKDROP = "https://image.tmdb.org/t/p/w780";
export const URL_IMAGE_BANNER = "https://image.tmdb.org/t/p/original";
export const URL_IMAGE_PROFILE = "https://image.tmdb.org/t/p/h632";
export const URL_IMAGE_lOGO = "https://image.tmdb.org/t/p/w500";
export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = import.meta.env.VITE_API_KEY as string;
export const BASE_URL_BACKEND = "http://127.0.0.1:3000"

export const getFetchURLs = () => ({
  popularMovies: `${BASE_URL_BACKEND}/movies/popular`,
  topRatedMovies: `${BASE_URL_BACKEND}/movies/top-rated`,
  actionMovies: `${BASE_URL_BACKEND}/movies/genre/28`,
  adventureMovies: `${BASE_URL_BACKEND}/movies/genre/12`,
  animationMovies: `${BASE_URL_BACKEND}/movies/genre/16`,
  comedyMovies: `${BASE_URL_BACKEND}/movies/genre/35`,
  crimeMovies: `${BASE_URL_BACKEND}/movies/genre/80`,
  documentaryMovies: `${BASE_URL_BACKEND}/movies/genre/99`,
  dramaMovies: `${BASE_URL_BACKEND}/movies/genre/18`,
  familyMovies: `${BASE_URL_BACKEND}/movies/genre/10751`,
  fantasyMovies: `${BASE_URL_BACKEND}/movies/genre/14`,
  historyMovies: `${BASE_URL_BACKEND}/movies/genre/36`,
  horrorMovies: `${BASE_URL_BACKEND}/movies/genre/27`,
  musicMovies: `${BASE_URL_BACKEND}/movies/genre/10402`,
  mysteryMovies: `${BASE_URL_BACKEND}/movies/genre/9648`,
  romanceMovies: `${BASE_URL_BACKEND}/movies/genre/10749`,
  scienceFictionMovies: `${BASE_URL_BACKEND}/movies/genre/878`,
  thrillerMovies: `${BASE_URL_BACKEND}/movies/genre/53`,
});

