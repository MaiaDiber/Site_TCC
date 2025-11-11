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
            // Limpa todos os dados
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('usuario');
            localStorage.removeItem('EMAIL');

            // Redireciona para a página inicial
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
                <div className="Logo">
                    <img src="/assets/Images/logo_ViaSaúde.png" alt="Imagem" width="120px" />
                </div>

                <div className="botoes">
                    <div className="botao">
                        <Link to="/"><button className="b"></button></Link>
                    </div>
                    <div className="botao lupa">
                        <button className="b" onClick={alternarSearch}>
                            <img src="/assets/Images/lupa.png" alt="Lupa" width="55px" />
                        </button>
                    </div>
                    <div className="botao">
                        <button className="b" onClick={alternarMenu}>
                            <img src="/assets/Images/menu.png" alt="Imagem" width="55px" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Overlay e menu lateral */}
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
                        <li><Link to="/Perfil">Perfil</Link></li>
                         <li>
                            <button
                                onClick={() => {
                                if (window.confirm('Tem certeza que deseja sair?')) {
                                localStorage.removeItem('TOKEN');
                                localStorage.removeItem('usuario');
                                localStorage.removeItem('EMAIL');
                                window.location.href = '/'; // Redireciona para home
                            }
                            }}
                                className="btn-sair-menu"
                                 >
                                 Sair
                                </button>
                                </li>

                    </ul>
                </div>
            </div>

            {/* Barra de pesquisa (com blur sincronizado e slide suave) */}
            {searchOpen && (
                <>
                    <div
                        className={`search-background ${searchOpen ? 'show' : ''}`}
                        onClick={alternarSearch}
                    ></div>

                    <div className={`search-overlay ${searchOpen ? 'show' : ''}`}>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                autoFocus
                            />
                            <button className="close-search" onClick={alternarSearch}>X</button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
