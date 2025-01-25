import './App.css'
import { User } from './interfaces/user';
import { Movie } from './interfaces/movie'
import { PageLogin } from './componentes/PageLogin/PageLogin';
import { PageRegister } from './componentes/PageRegister/PageRegister';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
function App() {

  // const movie: Movie = {
  //   backdrop_path: "/h3fwlwHotd3JfV13HdW0mxDcxPD.jpg",
  //   movie_id: 957119,
  //   title: "Sidelined: The QB and Me",
  //   original_title: "Sidelined: The QB and Me",
  //   overview: "Dallas, a burdened but headstrong dancer, is determined to get into the best dance school in the country—her late mother’s alma mater. However, that dream is suddenly derailed when the cheeky yet secretly grieving football star, Drayton, crashes into her life with a unique story of his own. Will the two of them be able to grow into their dreams together, or will their dreams be sidelined?",
  //   poster_path: "/1oV2rq7PEuKILrBd9vBL9bChRYf.jpg",
  //   adult: false,
  //   original_language: "en",
  //   genre_ids: [35, 10749],
  //   popularity: 519.926,
  //   release_date: "2024-11-29",
  //   video: false,
  //   vote_average: 6.6,
  //   vote_count: 120
  // }
  const handleAddFavorite = async (movie: Movie, email: string) => {
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
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorite = async (email: string, movie: Movie) => {
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
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };


  // Método para agregar un usuario
  const handleAddUser = async (user: User) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuario agregado exitosamente:", data);
      } else {
        console.error("Error al agregar usuario:", data);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // Método para eliminar un usuario
  const handleDeleteUser = async (email: string) => {
    try {
      const response = await fetch(`http://localhost:3000/users/destroy_by_email?email=${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Usuario eliminado exitosamente:", data);
      } else {
        console.error("Error al eliminar usuario:", data);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };




  return (
    <>
      {/* <button onClick={(e) => {
        e.preventDefault()
        handleDeleteUser("alice@example.com")
      }}>Borrar alice</button>

      <button onClick={(e) => {
        e.preventDefault()
        handleAddUser({ name: "Justyn", last_name: "as", email: "ssddrsd", password: "dssdjksdjksd" })
      }}>Agregar Justyn</button>

      <button onClick={(e) => {
        e.preventDefault()
        handleAddUser({ name: "Justyn", last_name: "as", email: "alice@example.com", password: "dssdjksdjksd" })
      }}>Agregar alice</button>

      <button onClick={(e) => {
        e.preventDefault()
        handleAddFavorite(movie, "alice@example.com")
      }}>Agregar Movie a alice</button>

      <button onClick={(e) => {
        e.preventDefault()
        handleRemoveFavorite("alice@example.com", movie)
      }}>Eliminar Movie a Alice</button>
    </> */}
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<PageLogin />} />
          <Route path="/register" element={<PageRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
