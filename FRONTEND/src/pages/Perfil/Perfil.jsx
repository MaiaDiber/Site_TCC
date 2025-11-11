import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import './Perfil.scss';

export default function Perfil() {
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(true);
    const [editando, setEditando] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    const [dados, setDados] = useState({
        nome_completo: '',
        email: '',
        data_nascimento: '',
        cep: '',
        tipo: ''
    });

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        try {
            const response = await api.get('/perfil');
            setDados({
                nome_completo: response.data.nome_completo,
                email: response.data.email,
                data_nascimento: response.data.data_nascimento,
                cep: response.data.cep || '',
                tipo: response.data.tipo
            });
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            if (error.response?.status === 401) {
                alert('Sessão expirada. Faça login novamente.');
                navigate('/');
            }
        } finally {
            setCarregando(false);
        }
    }

    function atualizar(campo, valor) {
        setDados({ ...dados, [campo]: valor });
    }

    async function salvarAlteracoes() {
        setMensagem('');
        
        // Validações
        if (!dados.nome_completo || !dados.email || !dados.data_nascimento) {
            setTipoMensagem('erro');
            setMensagem('Nome, email e data de nascimento são obrigatórios');
            return;
        }

        setSalvando(true);

        try {
            await api.put('/perfil/atualizar', dados);
            
            setTipoMensagem('sucesso');
            setMensagem('Perfil atualizado com sucesso!');
            setEditando(false);

            setTimeout(() => setMensagem(''), 3000);

        } catch (error) {
            console.error('Erro ao salvar:', error);
            setTipoMensagem('erro');
            setMensagem(error.response?.data?.erro || 'Erro ao atualizar perfil');
        } finally {
            setSalvando(false);
        }
    }

    function cancelarEdicao() {
        setEditando(false);
        setMensagem('');
        carregarDados();
    }

    function formatarData(data) {
        if (!data) return '';
        return new Date(data).toLocaleDateString('pt-BR');
    }

    function formatarTipo(tipo) {
        return tipo === 'admin' ? 'Administrador' : 'Paciente';
    }

    if (carregando) {
        return (
            <section className="all-perfil">
                <div className="loading">Carregando...</div>
            </section>
        );
    }

    return (
        <section className="all-perfil">
            <section className="container-perfil">
                <div className="header-perfil">
                    <div className="avatar">
                        {dados.nome_completo.charAt(0).toUpperCase()}
                    </div>
                    <div className="info-basica">
                        <h1>{dados.nome_completo}</h1>
                        <span className={`badge ${dados.tipo}`}>
                            {formatarTipo(dados.tipo)}
                        </span>
                    </div>
                </div>

                {mensagem && (
                    <div className={`mensagem-box ${tipoMensagem}`}>
                        <p>{mensagem}</p>
                    </div>
                )}

                <div className="secao-perfil">
                    <div className="titulo-secao">
                        <h2>Minhas Informações</h2>
                        {!editando ? (
                            <button 
                                className="btn-editar"
                                onClick={() => setEditando(true)}
                            >
                                 Editar
                            </button>
                        ) : (
                            <div className="botoes-edicao">
                                <button 
                                    className="btn-salvar"
                                    onClick={salvarAlteracoes}
                                    disabled={salvando}
                                >
                                    {salvando ? ' Salvando...' : ' Salvar'}
                                </button>
                                <button 
                                    className="btn-cancelar"
                                    onClick={cancelarEdicao}
                                    disabled={salvando}
                                >
                                     Cancelar
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="campos-perfil">
                        <div className="campo">
                            <label>Nome Completo*</label>
                            {editando ? (
                                <input
                                    type="text"
                                    value={dados.nome_completo}
                                    onChange={(e) => atualizar('nome_completo', e.target.value)}
                                    placeholder="Digite seu nome completo"
                                />
                            ) : (
                                <p>{dados.nome_completo}</p>
                            )}
                        </div>

                        <div className="campo">
                            <label>E-mail*</label>
                            {editando ? (
                                <input
                                    type="email"
                                    value={dados.email}
                                    onChange={(e) => atualizar('email', e.target.value)}
                                    placeholder="seu@email.com"
                                />
                            ) : (
                                <p>{dados.email}</p>
                            )}
                        </div>

                        <div className="campo">
                            <label>Data de Nascimento*</label>
                            {editando ? (
                                <input
                                    type="date"
                                    value={dados.data_nascimento}
                                    onChange={(e) => atualizar('data_nascimento', e.target.value)}
                                />
                            ) : (
                                <p>{formatarData(dados.data_nascimento)}</p>
                            )}
                        </div>

                        <div className="campo">
                            <label>CEP</label>
                            {editando ? (
                                <input
                                    type="text"
                                    value={dados.cep}
                                    onChange={(e) => atualizar('cep', e.target.value)}
                                    placeholder="00000-000"
                                    maxLength="9"
                                />
                            ) : (
                                <p>{dados.cep || 'Não informado'}</p>
                            )}
                        </div>
                    </div>

                    <div className="obs-campos">
                        <p>* Campos obrigatórios</p>
                    </div>
                </div>

                <div className="botoes-footer">
                    <button 
                        className="btn-voltar"
                        onClick={() => navigate(-1)}
                    >
                        ← Voltar
                    </button>
                </div>
            </section>
        </section>
    );
}