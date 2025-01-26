import './Base.css'
import { NavBar } from '../NavBar/NavBar'
import Login from '../Login/Login'
import Register from '../Register/Register'
export function Base({isLogin}:{isLogin?:boolean}) {
    return (
        <>
            <NavBar logoBuscar={false} logoGrande={true} />

            <div className="loginContainer">
                {
                    isLogin ?(
                        <Login />
                    ):(
                        <Register />
                    )
                }
            </div>
        </>
    )
}