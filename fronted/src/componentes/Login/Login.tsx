import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUsuarios, verificarCredenciales } from "../../utils/userHelpers";
import { Modal, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {User} from "../../interfaces/user";
import "./Login.css";
export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const {setCurrentUser} = useAuth()

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await getUsuarios();
      setUsuarios(data);
    };
    fetchUsuarios();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usuarioCredenciales:User|null =verificarCredenciales(email, password, usuarios)
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
            <p>First time on Netflix? <span onClick={()=>{navigate('/register')}}>Subscribe now</span></p>
          </div>
        </form>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
          <Typography variant="h6">Credenciales incorrectas</Typography>
          <Typography>El email o la contraseña son incorrectos.</Typography>
        </Box>
      </Modal>
    </>
  );
}
