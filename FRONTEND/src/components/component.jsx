// components/RotaProtegida.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RotaProtegida({ children, tipoPermitido }) {
    const navigate = useNavigate();
    const [autorizado, setAutorizado] = useState(false);

    useEffect(() => {
        const verificarAutorizacao = () => {
            try {
                const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
                const token = localStorage.getItem('TOKEN');

                // Verifica se está logado
                if (!token || !usuario.id) {
                    alert('Acesso negado! Faça login primeiro.');
                    navigate('/');
                    return;
                }

                // Verifica se tem permissão específica
                if (tipoPermitido && usuario.tipo !== tipoPermitido) {
                    alert(`Acesso restrito! Apenas ${tipoPermitido}s podem acessar esta página.`);
                    navigate('/');
                    return;
                }

                // Se passou em todas as verificações
                setAutorizado(true);

            } catch (erro) {
                console.error('Erro na verificação:', erro);
                alert('Erro de autenticação. Faça login novamente.');
                navigate('/Entrar');
            }
        };

        verificarAutorizacao();
    }, [navigate, tipoPermitido]);

    // Mostra loading enquanto verifica
    if (!autorizado) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <div className="spinner"></div>
                <p>Verificando acesso...</p>
            </div>
        );
    }

    return children;
}