import './NavBar.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmail } from '../../context/ExistsEmailContext';
import { SearchBar } from '../SearchBar/SearchBar';

interface NavBarProps {
    logoBuscar: boolean;
    menu?: boolean;
    perfil?: boolean;
    logoGrande?: boolean;
    condicionExpanded?: boolean,
}

export function NavBar({ logoBuscar, menu = false, perfil = false, logoGrande = false, condicionExpanded }: NavBarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const { currentUser, logout } = useAuth()
    const { setEmailExists } = useEmail()

    const [scrolled, setScrolled] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);

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
        <div className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navbarRef}>
            <div className='navOpciones'>
                <img
                    src="../../../public/JUSTFLIX.svg"
                    alt="Logo"
                    className={`${logoGrande ? "logoGrande" : ""}`}
                />
                {menu && (
                    <>
                        <Link className={`textInicio ${location.pathname === "/home" ? "bold" : ""}`} to="/home">
                            Home
                        </Link>
                        <Link className={`textInicio ${location.pathname === "/miLista" ? "bold" : ""}`} to="/miLista">
                            Favorites
                        </Link>
                    </>
                )}
            </div>

            <div className='perfilYLupaContenedor'>
                {logoBuscar && <SearchBar condicionExpanded={condicionExpanded} desdeHome={location.state?.fromBuscar || false} />}
                {perfil && (
                    <div className='contenedorPerfilImagen'>
                        <div className='containerImagePerfil'>
                            <img src="../../../public/avatar1.png" alt="" />
                        </div>
                        <NavDropdown title="" id="navbarScrollingDropdown">
                            <NavDropdown.Item className='drop'>
                                <div className='containerImagePerfil'>
                                    <img src="../../../public/avatar2.jpg" alt="" />
                                </div>
                                <span onClick={() => navigate("/miLista")}>{currentUser?.name}</span>

                            </NavDropdown.Item>
                            <NavDropdown.Item className='drop'>
                                <div className='containerImagePerfil'>
                                    <img src="../../../public/avatar3.png" alt="" />
                                </div>
                                <span onClick={() => navigate("/miLista")}>{currentUser?.name}</span>

                            </NavDropdown.Item>
                            <NavDropdown.Item className='drop'>
                                <div className='containerImagePerfil'>
                                    <img src="../../../public/avatar4.jpg" alt="" />
                                </div>
                                <span onClick={() => navigate("/miLista")}>{currentUser?.name}</span>

                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className='drop' onClick={() => {
                                setEmailExists(false);
                                logout();
                            }}>
                                <span className='logOut'>Sign out </span>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                )}
            </div>
        </div>
    );
}
