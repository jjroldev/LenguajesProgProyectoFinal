import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces/user';
import './Register.css';
import { useEffect, useState } from 'react';
import { getUsuarios, guardarUsuario } from '../../utils/userHelpers';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            const data = await getUsuarios();
            setUsuarios(data);
        };

        fetchUsuarios();
    }, []);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: User = { name, last_name: lastName, email, password };
        
        const success = await guardarUsuario(user, usuarios);
        if (success) {
            login(); 
            navigate("/home");
        } else {
            console.error("Error al registrar usuario");
        }
    };

    return (
        <div className="formContainer">
            <form className="formulario" onSubmit={handleRegister}>
                <div className="header-form">
                    <h2>Register</h2>
                </div>
                <div className="contenedorInput">
                    <input onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="José Javier" minLength={5} />
                </div>
                <div className="contenedorInput">
                    <input onChange={(e) => setLastName(e.target.value)} id="lastName" type="text" placeholder="Roldán Browm" minLength={5} />
                </div>
                <div className="contenedorInput">
                    <input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="email@example.com" minLength={5} />
                </div>
                <div className="contenedorInput">
                    <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="Contraseña" minLength={6} maxLength={20} />
                </div>
                <div>
                    <button className="button-enviar">Register</button>
                </div>
                <div className="suscribirse">
                    <p>Already have an account? <span onClick={() => navigate("/login")}>Login</span></p>
                </div>
            </form>
        </div>
    );
}
