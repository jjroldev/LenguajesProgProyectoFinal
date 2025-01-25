import './NavBar.css';
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
export function NavBar({ logoBuscar, menu = false }: { logoBuscar: boolean, menu?: boolean }) {
    // const navigate = useNavigate();

    // const handleSearchClick = () => {
    //     navigate("/buscar");
    // };

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
            {logoBuscar && (<i
                className="fa-solid fa-magnifying-glass lupa"
            // {onClick={handleSearchClick} 
            >
            </i>)
            }
        </div>
    );
}
