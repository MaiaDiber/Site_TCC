import './cabecalho.scss';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Cabeçalho() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [PosicaoVisivel, setPosicaoVisivel] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const navigate = useNavigate()

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    function fazerLogout() {
        if (window.confirm('Tem certeza que deseja sair?')) {
            
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('usuario');
            localStorage.removeItem('EMAIL');

            navigate('/');
        }
    }

    useEffect(() => {
        if (menuOpen) {
            setPosicaoVisivel(true);
        } else {
            const timer = setTimeout(() => setPosicaoVisivel(false), 800);
            return () => clearTimeout(timer);
        }
    }, [menuOpen]);

    const alternarMenu = () => setMenuOpen(!menuOpen);
    const alternarSearch = () => setSearchOpen(!searchOpen);

    return (
        <>
            <header className="cabeçalho">

                <div className="Perfil">
                    <img src="/public/assets/images/ChatGPT_Image_12_de_nov._de_2025__21_45_38-removebg-preview.png" height={80} alt="" />

                    <div className="double">
                        <button onClick={() => navigate('/Perfil')} type='button' className="sobre-perfil ir-perfil">
                            <p>Perfil</p>
                        </button>
                        <button  onClick={() => {
                                if (window.confirm('Tem certeza que deseja sair?')) {
                                localStorage.removeItem('TOKEN');
                                localStorage.removeItem('usuario');
                                localStorage.removeItem('EMAIL');
                                window.location.href = '/'; 
                            }
                            }} type='button' className="sobre-perfil sair-perfil">
                            <img src="/public/assets/images/ChatGPT_Image_12_de_nov._de_2025__22_21_56-removebg-preview.png" height={50}  alt="" />
                            <p>Sair</p>
                        </button>
                    </div>
                </div>

                <div className="Logo">
                    <img src="/assets/Images/logo_ViaSaúde.png" alt="Imagem" height={80} />
                </div>

                <div className="botoes">
                    <div className="botao">
                        <Link to="/"><button className="b"></button></Link>
                    </div>
                    <div className="botao">
                        <button className="b" onClick={alternarMenu}>
                            <img src="/assets/Images/menu.png" alt="Imagem" height={80} />
                        </button>
                    </div>
                </div>
            </header>

            {PosicaoVisivel && (
                <div
                    className={`menu-overlay ${menuOpen ? 'show' : 'hide'}`}
                    onClick={alternarMenu}
                ></div>
            )}

            <div className={`menu-lateral ${menuOpen ? 'open' : ''}`}>
                <div className="menu-content">
                    <h2>Menu</h2>
                    <ul>
                        <li><Link to="/Home">Início</Link></li>
                        <li><Link to="/Sobre">Sobre</Link></li>
                       

                    </ul>
                </div>
            </div>
        </>
    );
}
