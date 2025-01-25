import { User } from "../../interfaces/user"
import "./Login.css"
import { useState,useEffect } from "react"
import { getUsuarios } from "../../utils/userHelpers"
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usuarios, setUsuarios] = useState<User[]>([])

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
                <form action="" className="formulario">
                    <div className="headerForm">
                        <h2>Login</h2>
                    </div>
                    <div className="contenedorInput">
                        <input onChange={(e) => { setEmail(e.target.value) }} id="email" type="email" placeholder="email@example.com" minLength={5} />
                    </div>
                    <div className="contenedorInput">
                        <input onChange={(e) => { setPassword(e.target.value) }} id="password" type="password" placeholder="batman2493" minLength={6} maxLength={20} />
                    </div>
                    <div>
                        <button className="button-enviar">Login</button>
                    </div>
                    <div className="suscripbirse">
                        <p>First time on Netflix? <span>Subscribe now</span></p>
                    </div>
                </form>
            </div>
        </>
    )
}