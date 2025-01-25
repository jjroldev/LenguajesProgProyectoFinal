import Modal from "@mui/material/Modal";
import YouTube from "react-youtube";
import { Movie } from "../../interfaces/movie";
import useFetchTrailer from "../../hooks/usefetchVideo";
interface VideoModalProps {
    open: boolean;
    onClose: () => void;
    movie: Movie | null;
}

const VideoModal: React.FC<VideoModalProps> = ({ open, onClose, movie }) => {
    const trailer = useFetchTrailer(movie?.movie_id)
    return (
        <Modal open={open} onClose={onClose}>
            {trailer ? (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        maxWidth: "70%",
                        aspectRatio: "16/9",
                        backgroundColor: "transparent",
                        overflow: "hidden",
                    }}
                >
                    <YouTube
                        videoId={trailer.key}
                        opts={{
                            width: "100%",
                            height: "100%",
                            playerVars: {
                                autoplay: 1,
                                controls: 1,
                                modestbranding: 1,
                                rel: 0,
                            },
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </div>
            ) : (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "transparent",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <p style={{ color: "white", textAlign: "center" }}>
                        No trailer available
                    </p>
                </div>
            )}
        </Modal>
    );
};

export default VideoModal;
