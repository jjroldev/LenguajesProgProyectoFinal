import './NavBar.css';
import NavDropdown from 'react-bootstrap/NavDropdown';

// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
export function NavBar({ logoBuscar, menu = false, perfil = false }: { logoBuscar: boolean, menu?: boolean, perfil?: boolean }) {
    // const navigate = useNavigate();

    // const handleSearchClick = () => {
    //     navigate("/buscar");
    // };

    const {currentUser,logout}=useAuth()

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`navbar ${scrolled ? "scrolled" : ""}`}>

            <div className='navOpciones'>
                <img
                    src="../../../public/JUSTFLIX.svg"
                    alt="Logo"
                />
                {
                    menu && (
                        <>
                            <a href="" className='textInicio'>Home</a>
                            <a href="" className='textInicio'>Favorites</a>
                        </>
                    )
                }
                {/* <Link className='textInicio' to="/">Home</Link>
                <Link className="textInicio" to="/favoritos">Favorites</Link> */}
            </div>
            <div className='perfilYLupaContenedor'>
                {logoBuscar && (<i
                    className="fa-solid fa-magnifying-glass lupa"
                // {onClick={handleSearchClick} 
                >
                </i>)
                }
                {
                    perfil && (
                        <>
                            <div className='contenedorPerfilImagen'>
                                <div className='containerImagePerfil'>
                                    <img src="../../../public/avatar1.png" alt="" />
                                </div>
                                <NavDropdown title="" id="navbarScrollingDropdown">
                                    <NavDropdown.Item className='drop'><span>{currentUser?.name}</span></NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className='drop' onClick={()=>{
                                        logout()
                                    }}>
                                        <span className='logOut'>Log out </span>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}
