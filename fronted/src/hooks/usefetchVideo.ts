import { useState, useEffect } from "react";
import axios from "axios";
import { Trailer } from "../interfaces/trailer";
import { BASE_URL,API_KEY } from "../utils/URLS";
const useFetchTrailer = (movieId: number | undefined) => {
  const [trailer, setTrailer] = useState<Trailer | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!movieId) return;

      try {
        const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            append_to_response: "videos",
          },
        });

        if (data.videos && data.videos.results) {
          const foundTrailer = 
            data.videos.results.find(
              (vid: any) => vid.name === "Official Trailer"
            ) || data.videos.results[8];

          if (foundTrailer) {
            setTrailer(foundTrailer);
          }
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return trailer;
};

export default useFetchTrailer;
