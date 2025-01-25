import "./Banner.css";
import { NavBar } from "../NavBar/NavBar";
import { URL_IMAGE_lOGO,URL_IMAGE_BANNER } from "../../utils/URLS";
import { useCallback } from "react";
import React from "react";
import { useNavigate } from "react-router";
import { Suspense, lazy } from "react";
const CarouselBoostrap = lazy(() => import('../CarouselBoostrap/CarouselBoostrap'));
const VideoModal = lazy(() => import('../ModalVideo/ModalVideo'));
import {Movie } from "../../interfaces/movie"; 
import useFetchMovieDetails from "../../hooks/useFetchMovieWithDetail";
import useFetchProviders from "../../hooks/useFetchProviders";
import useFetchLogo from "../../hooks/useFetchLogo";
import { responsiveCredits } from "../../utils/ResponsiveCarousel";
import Carousel from "react-multi-carousel";
export function Banner({ movie, logoBuscar, isShort, isDetail}: {movie: Movie; logoBuscar: boolean, isShort: boolean, isDetail?: boolean }) {
    const [open, setOpen] = React.useState(false);
    const { movie: fetchedDetails, isLoading } = useFetchMovieDetails(movie.movie_id);
    const { logoPath } = useFetchLogo(movie?.movie_id);
    const { movieProviders } = useFetchProviders(movie.movie_id)
    const navigate = useNavigate();
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);
    const pasarMovie = useCallback(() => {
        navigate("/info", { state: { movie } });
    }, [navigate, movie]);

    if ((!movie || isLoading)) {
        return (
            <div className={`header ${isShort ? "header-short" : ""} bg-gray-800`}>
                <NavBar logoBuscar={logoBuscar} />
            </div>
        )
    }

    const renderGenres = (genres: any[] = []) => {
        return genres.map((genre: any) => (
            <li key={genre.id}>
                <span>{genre.name}</span>
            </li>
        ));
    };

    const renderProviders = (movieProviders: any) => {
        if (!movieProviders) return null
        return (
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsiveCredits}
                ssr={true}
                infinite={true}
                keyBoardControl={true}
                className="carouselProviders"
            >
                {movieProviders.map((provider: any) => (
                    <img
                        key={provider.provider_id}
                        className="provedorLogo"
                        src={URL_IMAGE_BANNER + provider.logo_path}
                        alt={provider.provider_name}
                    />
                ))}
            </Carousel>
        )
    }

    const renderOverviewOrTitle = () => {
        if (!isShort && movie.overview) {
            return <p className="overview">{movie.overview.slice(0, movie.overview.indexOf(".") + 1)}</p>;
        }
        if (isShort) {
            return <h2 className="titulo-banner">{movie.original_title}</h2>;
        }
        return null;
    };

    const renderLogoOrContent = () => {
        if (logoPath) {
            return (
                <>
                    <img
                        className={`${!isShort ? "logo-banner" : "logo-banner-reducido"}`}
                        src={`${URL_IMAGE_lOGO}${logoPath}`}
                        alt={movie.title}
                    />
                    {!isShort && (isDetail ? <Details /> : renderOverviewOrTitle())}
                </>
            );
        }
        return !isShort ? renderOverviewOrTitle() : null;
    };


    const Details = () => {
        return <>
            <div className="movieDetailsBanner flex flex-col">
                {fetchedDetails?.overview && (
                    <p className="overview">{fetchedDetails?.overview.slice(0, fetchedDetails?.overview.indexOf(".") + 1)}</p>
                )}

                <div className="bannerDetails flex flex-row">
                    <span>TMDB {fetchedDetails?.vote_average.toFixed(1)}</span>
                    <span>{fetchedDetails?.release_date.split("-")[0]}</span>
                    <span>
                        {fetchedDetails?.runtime
                            ? `${Math.floor(fetchedDetails?.runtime / 60)}h ${fetchedDetails?.runtime % 60}min`
                            : "Runtime no disponible"}
                    </span>
                </div>
                <div>
                    <ul className="generosBanner flex flex-row">
                        {renderGenres(fetchedDetails?.genres)}
                    </ul>
                </div>
            </div>
            <div className="provedores-container posters-continer-banner">
                <div className='postersInfo'>
                    <Suspense
                        fallback={
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '2rem',
                                    fontSize: '1.2rem',
                                }}
                            >
                                Cargando...
                            </div>
                        }
                    >
                        <CarouselBoostrap movie={fetchedDetails} isPoster={true}/>
                    </Suspense>
                </div>
                {renderProviders(movieProviders)}
            </div>
        </>
    }

    const renderButtons = () => (
        <div className="botones">
            <button onClick={handleOpen}>
                <i className="fa-solid fa-play"></i> Play
            </button>
            <Suspense fallback={<div />}>
                <VideoModal movie={fetchedDetails} open={open} onClose={handleClose} />
            </Suspense>
            <button onClick={pasarMovie} className="boton-info-banner">
                <i className="fa-solid fa-circle-info"></i> More Information
            </button>
        </div>
    );


    if (!movie) return null;

    return (
        <div className={`header ${isShort ? "header-short" : ""}`}>
            <img
                className="fondo"
                src={`${URL_IMAGE_BANNER}${movie.backdrop_path}`}
                alt={movie.title}
            />
            <NavBar menu={true} logoBuscar={logoBuscar} />
            <div className="cuerpoBanner">
                <div className={`${isShort ? "contenedorLogo1" : `contenedorLogo ${isDetail ? "contenedorDetailN" : ""}`} `}>
                    {renderLogoOrContent()}
                    {!isShort && renderButtons()}
                </div>
            </div>
        </div>
    );
}

