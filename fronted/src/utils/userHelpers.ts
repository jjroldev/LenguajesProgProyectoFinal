import { User } from "../interfaces/user";
import { Movie } from "../interfaces/movie";
export const getUsuarios = async () => {
    try {
        const response = await fetch("http://localhost:3000/users", {
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


const verificarUsuarioExiste = (users: User[], email: string) => {
    return users.some((user) => user.email === email);
};


export const guardarUsuario = async (user: User, usuarios: User[]) => {
    try {
        if (!verificarUsuarioExiste(usuarios, user.email)) {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                console.error("Error al enviar usuario");
                return false;
            } else {
                return true;
            }
        } else {
            console.log("El usuario ya existe.");
            return false;
        }
    } catch (error) {
        console.error("Error en guardarUsuario:", error);
        return false;
    }
};



export const deleteUser = async (email: string) => {
    try {
        const response = await fetch(`http://localhost:3000/users/destroy_by_email?email=${email}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            console.log("Usuario eliminado exitosamente:");
        } else {
            console.error("Error al eliminar usuario:");
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
    }
};



export const addMovieFavoriteOfUser = async (movie: Movie, email: string) => {
    try {
        const response = await fetch("http://localhost:3000/users/add_favorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                movie,
            }),
        });

        if (response.ok) {
            console.log("pelicula agregada a mi lista")
        } else {
            console.error("error al intentar agregar la pelicula a mi lista")
        }
    } catch (error) {
        console.error(error);
    }
};

export const removeMovieFavoriteOfUser = async (email: string, movie: Movie) => {
    try {
        const response = await fetch("http://localhost:3000/users/remove_favorite", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                movie: { movie_id: movie.movie_id },
            }),
        });

        if (response.ok) {
            console.log("pelicula removida con exito")
        } else {
            console.error("error al intentar remover la pelicula de mi lista")
        }
    } catch (error) {
        console.error(error);
    }
};


export const verificarCredenciales = (email: string, password: string, usuarios: User[]) => {
    return usuarios.some(user => user.email === email && user.password === password);
};