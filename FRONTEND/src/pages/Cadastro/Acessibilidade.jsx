import { useState, useEffect } from 'react';
import './Acessibilidade.scss'; 

export default function ComponenteAcessibilidade() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [tamanhoFonte, setTamanhoFonte] = useState(1);
    const [altoContraste, setAltoContraste] = useState(false);

   
    useEffect(() => {
        document.body.style.fontSize = `${tamanhoFonte}rem`;
    }, [tamanhoFonte]);

    
    useEffect(() => {
        if (altoContraste) {
            document.body.classList.add('alto-contraste');
        } else {
            document.body.classList.remove('alto-contraste');
        }
    }, [altoContraste]);

    const aumentarFonte = () => {
        setTamanhoFonte(prev => Math.min(prev + 0.1, 1.5)); 
    };

    const diminuirFonte = () => {
        setTamanhoFonte(prev => Math.max(prev - 0.1, 0.8)); 
    };

    const toggleContraste = () => {
        setAltoContraste(prev => !prev);
    };

    const toggleMenu = () => {
        setMenuAberto(prev => !prev);
    };

    return (
        <div className="acessibilidade-container">
            <button 
                className={`botao-acessibilidade ${menuAberto ? 'rotacao-botao' : ''}`}
                onClick={toggleMenu}
                aria-expanded={menuAberto}
                aria-label="Menu de acessibilidade"
            >
                <img src="/public/assets/images/ChatGPT_Image_12_de_nov._de_2025__11_52_25-removebg-preview.png" height={50} alt="" />
            </button>

            {menuAberto && (
                <div className="opcoes-acessibilidade apresenta-lista">
                    <button 
                        id="aumentar-fonte"
                        onClick={aumentarFonte}
                        aria-label="Aumentar tamanho da fonte"
                    >
                        A+ Aumentar Fonte
                    </button>
                    
                    <button 
                        id="diminuir-fonte"
                        onClick={diminuirFonte}
                        aria-label="Diminuir tamanho da fonte"
                    >
                        A- Diminuir Fonte
                    </button>
                    
                    <button 
                        id="alterna-contraste"
                        onClick={toggleContraste}
                        aria-label={altoContraste ? "Desativar alto contraste" : "Ativar alto contraste"}
                    >
                        {altoContraste ? "☀️ Contraste Normal" : "🌙 Alto Contraste"}
                    </button>
                </div>
            )}
        </div>
    );
}