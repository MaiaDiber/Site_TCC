// Solicitacoes.jsx - PÁGINA DE SOLICITAÇÕES (ADMIN)
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios.js';
import './Solicitacoes.scss';

export default function Solicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [processando, setProcessando] = useState(null);
    const navigate = useNavigate();

    // Verificar se é admin
    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        
        if (usuario.tipo !== 'admin') {
            alert('Acesso negado! Apenas administradores podem acessar esta página.');
            navigate('/');
            return;
        }

        carregarSolicitacoes();
    }, []);

    async function carregarSolicitacoes() {
        try {
            setCarregando(true);
            const resposta = await api.get('/solicitacoes');
            setSolicitacoes(resposta.data);
        } catch (erro) {
            console.error('Erro ao carregar solicitações:', erro);
            
            if (erro.response?.status === 401) {
                alert('Sessão expirada. Faça login novamente.');
                navigate('/');
            } else if (erro.response?.status === 403) {
                alert('Acesso negado!');
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
            await api.put(`/solicitacoes/${id}/aprovar`);
            
            alert('✅ Solicitação aprovada com sucesso!');
            carregarSolicitacoes(); // Recarrega a lista
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
            await api.put(`/solicitacoes/${id}/recusar`);
            
            alert('❌ Solicitação recusada.');
            carregarSolicitacoes(); // Recarrega a lista
        } catch (erro) {
            console.error('Erro ao recusar:', erro);
            alert('Erro ao recusar solicitação: ' + (erro.response?.data?.erro || erro.message));
        } finally {
            setProcessando(null);
        }
    }

    if (carregando) {
        return (
            <div className="solicitacoes-container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Carregando solicitações...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="solicitacoes-container">
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