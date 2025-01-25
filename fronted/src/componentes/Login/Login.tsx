import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUsuarios, verificarCredenciales } from "../../utils/userHelpers";
import { Modal, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/user";
import { useEmail } from "../../context/ExistsEmailContext";
import "./Login.css";
export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { setCurrentUser } = useAuth()

  const { emailExists, setEmailExists } = useEmail();
  console.log(emailExists)

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await getUsuarios();
      setUsuarios(data);
    };
    fetchUsuarios();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usuarioCredenciales: User | null = verificarCredenciales(email, password, usuarios)
    if (usuarioCredenciales) {
      setCurrentUser(usuarioCredenciales)
      login(usuarioCredenciales);
      navigate("/home");
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <div className="formContainer">
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="headerForm">
            <h2>Login</h2>
          </div>
          <div className={`${open ? "contentEmailExists " : "notVisible"}`}>
            <h2>The email or password is incorrect</h2>
            <p>Please log in to continue</p>
          </div>
          <div className={`${emailExists ? "contentEmailExists " : "notVisible"}`}>
            <h2>Email already exists</h2>
            <p>Please log in to continue</p>
          </div>
          <div className="contenedorInput">
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@example.com" minLength={5} />
          </div>
          <div className="contenedorInput">
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" minLength={6} maxLength={20} />
          </div>
          <div>
            <button className="button-enviar">Login</button>
          </div>
          <div className="suscripbirse">
            <p>First time on Netflix? <span onClick={() => { navigate('/register') }}>Subscribe now</span></p>
          </div>
        </form>
      </div>
    </>
  );
}
