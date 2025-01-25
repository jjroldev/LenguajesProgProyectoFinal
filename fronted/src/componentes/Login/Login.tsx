import "./Login.css"

export default function Login() {
    return (
        <>
            <div className="formContainer">
                <form action="" className="formulario">
                    <div className="headerForm">
                        <h2>Login</h2>
                    </div>
                    <div className="contenedorInput">
                        <input id="email" type="email" placeholder="email@example.com" minLength={5} />
                    </div>
                    <div className="contenedorInput">
                        <input id="password" type="text" placeholder="batman2493" minLength={6} maxLength={20} />
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