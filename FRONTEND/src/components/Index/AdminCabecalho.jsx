import './AdminCabecalho.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CabecalhoAdmin() {
    const [menuOpen, setMenuOpen] = useState(false);
    const[PosicaoVisivel, setPosicaoVisivel] = useState(false);

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


    const alternarMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="cabeçalho">
                <div className="Logo">
                    <img src="/assets/Images/logo_ViaSaúde.png" alt="Imagem" width="125px" />
                </div>
                <div className="botoes">
                    <div className="botao">
                        <Link to="/"><button className="b"></button></Link>
                    </div>
                    <div className="botao">
                        <button className="b" onClick={alternarMenu}>
                            <img src="/assets/Images/menu.png" alt="Imagem" width="60px" />
                        </button>
                    </div>
                </div>
            </div>
            {PosicaoVisivel && <div className={`menu-overlay ${menuOpen ? 'show' : 'hide'}`} onClick={alternarMenu}></div>}
            <div className={`menu-lateral ${menuOpen ? 'open' : ''}`}>
                <div className="menu-content">
                    <h2>Menu</h2>
                    <ul>
                        <li><Link to="/Admin">Início</Link></li>
                        <li><Link to="/Sobre">Sobre</Link></li>
                        <li><Link to="/Perfil">Perfil</Link></li>
                        <li> <button 
                        className="btn-consulta" 
                        onClick={() => window.location.href = '/SolicitaçõesAdmin'}
                    >
                        Ver Solicitações
                    </button></li>
                         <li>
                            <button 
                                onClick={() => {
                                if (window.confirm('Tem certeza que deseja sair?')) {
                                localStorage.removeItem('TOKEN');
                                localStorage.removeItem('usuario');
                                localStorage.removeItem('EMAIL');
                                window.location.href = '/'; 
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
        </>
    );
}
