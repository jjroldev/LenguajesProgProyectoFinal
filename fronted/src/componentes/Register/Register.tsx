import { useNavigate } from 'react-router-dom'
import { User } from '../../interfaces/user'
import './Register.css'
import { useEffect, useState } from 'react'
import { getUsuarios } from '../../utils/userHelpers'
import { guardarUsuario } from '../../utils/userHelpers'
export default function Register() {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usuarios,setUsuarios]=useState<User[]>([])

    const navigate=useNavigate()


    useEffect(() => {
        const fetchUsuarios = async () => {
            const data = await getUsuarios();
            setUsuarios(data);
        };

        fetchUsuarios();
    }, []);

    return (
        <>
            <div className="formContainer">
                <form action="" className="formulario" onSubmit={async (e) => {
                    e.preventDefault();
                    const user: User = { name: name, last_name: lastName, email: email, password: password }
                    await guardarUsuario(user,usuarios,navigate)
                }}>
                    <div className="header-form">
                        <h2>Register</h2>
                    </div>
                    <div className="contenedorInput">
                        <input onChange={(e) => { setName(e.target.value) }} id="name" type="text" placeholder="José Javier" minLength={5} />
                    </div>
                    <div className="contenedorInput">
                        <input onChange={(e) => { setLastName(e.target.value) }} id="lastName" type="text" placeholder="Roldán Browm" minLength={5} />
                    </div>
                    <div className="contenedorInput">
                        <input onChange={(e) => { setEmail(e.target.value) }} id="email" type="email" placeholder="email@example.com" minLength={5} />
                    </div>
                    <div className="contenedorInput">
                        <input onChange={(e) => { setPassword(e.target.value) }} id="password" type="password" placeholder="batman2493" minLength={6} maxLength={20} />
                    </div>
                    <div>
                        <button className="button-enviar">Loging</button>
                    </div>
                    <div className="suscripbirse">
                        <p>First time on Netflix? <span>Subscribe now</span></p>
                    </div>
                </form>
            </div>
        </>
    )
}