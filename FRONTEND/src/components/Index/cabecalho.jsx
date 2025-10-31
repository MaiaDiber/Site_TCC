import './cabecalho.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Cabeçalho() {
    const [menuOpen, setMenuOpen] = useState(false);

    const alternarMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return(
        <>
            <div className={`cabeçalho ${menuOpen ? 'blurred' : ''}`}>
                <div className="Logo">
                    <img src="/assets/Images/logo_ViaSaúde.png" alt="Imagem"  width='125px'/>
                </div>
                <div className='botoes'>
                    <div className="botao">
                        <Link to="/"><button className='b'></button></Link>
                    </div>
                    <div className="botao">
                        <button className='b' onClick={alternarMenu}><img src="/assets/Images/menu.png" alt="Imagem"  width='60px'/></button>
                    </div>
                </div>
            </div>
            {menuOpen && <div className={`menu-overlay ${menuOpen ? 'show' : ''}`} onClick={alternarMenu}></div>}
            <div className={`menu-lateral ${menuOpen ? 'open' : ''}`}>
                <div className="menu-content">
                    <h2>Menu</h2>
                    <ul>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/sobre">Sobre</Link></li>
                        {}
                    </ul>
                </div>
            </div>

        </>
    )
}