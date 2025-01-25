

export const getMovies = async () => {
    try {
        const response = await fetch("http://localhost:3000/movies", {
            method: "GET",
        });
        const data = await response.json()
        if (!response.ok) {
            console.error("error al obtener los usuarios")
        }
        return data
    } catch (error) {
        console.log(error)
    }
}
