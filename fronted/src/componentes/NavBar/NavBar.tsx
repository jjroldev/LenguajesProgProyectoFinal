import './NavBar.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useEmail } from '../../context/ExistsEmailContext';
export function NavBar({ logoBuscar, menu = false, perfil = false, logoGrande = false }: { logoBuscar: boolean, menu?: boolean, perfil?: boolean, logoGrande?: boolean }) {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate("/buscar");
    };

    const location = useLocation();

    const { currentUser, logout } = useAuth()
    const { setEmailExists } = useEmail()

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
                    className={`${logoGrande ? "logoGrande" : ""}`}
                />
                {
                    menu && (
                        <>
                            <Link
                                className={`textInicio ${location.pathname === "/home" ? "bold" : ""}`}
                                to="/home"
                            >
                                Home
                            </Link>
                            <Link
                                className={`textInicio ${location.pathname === "/miLista" ? "bold" : ""}`}
                                to="/miLista"
                            >
                                Favorites
                            </Link>
                        </>
                    )
                }
            </div>
            <div className='perfilYLupaContenedor'>
                {logoBuscar && (<i
                    className="fa-solid fa-magnifying-glass lupa"
                    onClick={handleSearchClick}
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
                                    <NavDropdown.Item className='drop'><span onClick={() => { navigate("/miLista") }}>{currentUser?.name}</span></NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className='drop' onClick={() => {
                                        setEmailExists(false)
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
