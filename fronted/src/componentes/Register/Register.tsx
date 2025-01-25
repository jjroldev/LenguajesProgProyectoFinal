import './Register.css'
export default function Register() {
    return (
        <>
            <div className="formContainer">
                <form action="" className="formulario">
                    <div className="header-form">
                        <h2>Register</h2>
                    </div>
                    <div className="contenedorInput">
                        <input id="name" type="text" placeholder="José Javier" minLength={5} />
                    </div>
                    <div className="contenedorInput">
                        <input id="lastName" type="text" placeholder="Roldán Browm" minLength={5} />
                    </div>
                    <div className="contenedorInput">
                        <input id="email" type="email" placeholder="email@example.com" minLength={5} />
                    </div>
                    <div className="contenedorInput">
                        <input id="password" type="text" placeholder="batman2493" minLength={6} maxLength={20} />
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