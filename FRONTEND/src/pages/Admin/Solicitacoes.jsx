
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios.js';
import ComponenteAcessibilidade from '../Cadastro/Acessibilidade.jsx';
import './Solicitacoes.scss';

export default function Solicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [processando, setProcessando] = useState(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        carregarSolicitacoes();
    }, []);

   async function carregarSolicitacoes() {
    try {
        setCarregando(true);
        
        
        const token = localStorage.getItem('TOKEN');
        const resposta = await api.get('/solicitacoes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        setSolicitacoes(resposta.data);
    } catch (erro) {
        console.error('Erro ao carregar solicitações:', erro);
        
        if (erro.response?.status === 401) {
            alert('Sessão expirada. Faça login novamente.');
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('usuario');
            navigate('/Entrar');
        } else if (erro.response?.status === 403) {
            alert('Acesso negado! Você não é administrador.');
            navigate('/');
        } else {
            alert('Erro ao carregar solicitações: ' + (erro.response?.data?.erro || erro.message));
        }
    } finally {
        setCarregando(false);
    }
}

   

    async function aprovarSolicitacao(id) {
    if (!window.confirm('Tem certeza que deseja APROVAR esta solicitação?')) {
        return;
    }

    try {
        setProcessando(id);
        
        
        const token = localStorage.getItem('TOKEN');
        await api.put(`/solicitacoes/${id}/aprovar`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        alert('✅ Solicitação aprovada com sucesso!');
        carregarSolicitacoes(); 
    } catch (erro) {
        console.error('Erro ao aprovar:', erro);
        alert('Erro ao aprovar solicitação: ' + (erro.response?.data?.erro || erro.message));
    } finally {
        setProcessando(null);
    }
}

async function recusarSolicitacao(id) {
    if (!window.confirm('Tem certeza que deseja RECUSAR esta solicitação?')) {
        return;
    }

    try {
        setProcessando(id);
        
       
        const token = localStorage.getItem('TOKEN');
        await api.put(`/solicitacoes/${id}/recusar`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        alert('❌ Solicitação recusada.');
        carregarSolicitacoes();
    } catch (erro) {
        console.error('Erro ao recusar:', erro);
        alert('Erro ao recusar solicitação: ' + (erro.response?.data?.erro || erro.message));
    } finally {
        setProcessando(null);
    }
}

    return (
        <div className="solicitacoes-container">

                            <div style={{
                                position: 'fixed',
                                top: '20px',
                                right: '20px',
                                zIndex: 1000
                            }}>
                                <ComponenteAcessibilidade />
                            </div>

            <header className="cabecalho">
                <h1>📋 Solicitações de Administrador</h1>
                <button onClick={() => navigate('/admin')} className="btn-voltar">
                    ← Voltar
                </button>
            </header>

            <div className="conteudo">
                {solicitacoes.length === 0 ? (
                    <div className="vazio">
                        <p>✅ Nenhuma solicitação pendente no momento!</p>
                    </div>
                ) : (
                    <div className="lista-solicitacoes">
                        {solicitacoes.map((solicitacao) => (
                            <div key={solicitacao.id_solicitacao} className="card-solicitacao">
                                <div className="card-header">
                                    <h2>{solicitacao.nome_completo}</h2>
                                    <span className="badge-pendente">Pendente</span>
                                </div>

                                <div className="card-body">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <strong>CPF:</strong>
                                            <span>{solicitacao.cpf}</span>
                                        </div>

                                        <div className="info-item">
                                            <strong>E-mail:</strong>
                                            <span>{solicitacao.email}</span>
                                        </div>

                                        <div className="info-item">
                                            <strong>Data de Nascimento:</strong>
                                            <span>{solicitacao.data_nascimento}</span>
                                        </div>

                                        <div className="info-item">
                                            <strong>Data da Solicitação:</strong>
                                            <span>{solicitacao.data_solicitacao}</span>
                                        </div>
                                    </div>

                                    <div className="motivo-box">
                                        <strong>Motivo da Solicitação:</strong>
                                        <p>{solicitacao.motivo_solicitacao}</p>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button
                                        onClick={() => aprovarSolicitacao(solicitacao.id_solicitacao)}
                                        disabled={processando === solicitacao.id_solicitacao}
                                        className="btn-aprovar"
                                    >
                                        {processando === solicitacao.id_solicitacao ? 'Processando...' : '✓ Aprovar'}
                                    </button>

                                    <button
                                        onClick={() => recusarSolicitacao(solicitacao.id_solicitacao)}
                                        disabled={processando === solicitacao.id_solicitacao}
                                        className="btn-recusar"
                                    >
                                        {processando === solicitacao.id_solicitacao ? 'Processando...' : '✗ Recusar'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}