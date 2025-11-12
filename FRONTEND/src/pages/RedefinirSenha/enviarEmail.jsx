
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../axios';
import './enviarEmail.scss';
import ComponenteAcessibilidade from '../Cadastro/Acessibilidade';

export default function EsqueciSenha() {
    const [email, setEmail] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    async function enviarEmailRecuperacao() {
        
        if (!email.trim()) {
            setErro('Informe o e-mail cadastrado');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErro('E-mail inválido');
            return;
        }

        try {
            setCarregando(true);
            setErro('');
            setMensagem('');

            const response = await api.post('/recuperar-senha', {
                email: email
            });

            setMensagem('✅ E-mail de recuperação enviado! Verifique sua caixa de entrada.');
            setEmail('');

        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            
            if (error.response?.status === 404) {
                setErro('E-mail não encontrado em nossa base de dados');
            } else if (error.response?.data?.erro) {
                setErro(error.response.data.erro);
            } else {
                setErro('Erro ao enviar e-mail de recuperação. Tente novamente.');
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <section className='all-esqueci-senha'>

                            <div style={{
                                position: 'fixed',
                                top: '20px',
                                right: '20px',
                                zIndex: 1000
                            }}>
                                <ComponenteAcessibilidade />
                            </div>

            <section className='container-esqueci-senha'>
                <img 
                    className='logo-site-esqueci-senha' 
                    src='/assets/Images/logo_ViaSaúde.png' 
                    height={70} 
                    alt='Logo Via Saúde' 
                />
                
                <div className='card-esqueci-senha'>
                    <div className='cabecalho-esqueci-senha'>
                        <h1>Recuperar Senha</h1>
                        <div className='linha-esqueci-senha'></div>
                    </div>

                    <div className='instrucoes'>
                        <p>
                            Digite seu e-mail cadastrado abaixo. Enviaremos um link 
                            para redefinir sua senha.
                        </p>
                    </div>

                    <div className='campo-email'>
                        <label>
                            <p>E-mail*</p>
                            <input 
                                type="email" 
                                placeholder='exemplo@gmail.com'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (erro) setErro('');
                                }}
                                className={erro ? 'erro' : ''}
                                disabled={carregando}
                            />
                            {erro && (
                                <span className="msg-erro">{erro}</span>
                            )}
                        </label>
                    </div>

                    {mensagem && (
                        <div className="mensagem-sucesso">
                            {mensagem}
                        </div>
                    )}

                    <button 
                        className="btn-enviar-email"
                        onClick={enviarEmailRecuperacao}
                        disabled={carregando}
                    >
                        {carregando ? 'Enviando...' : 'Enviar E-mail de Recuperação'}
                    </button>

                    <div className="voltar-login">
                        <p>Lembrou sua senha?</p>
                        <Link to={'/'}> 
                            Fazer Login
                        </Link>
                    </div>
                </div>
            </section>
        </section>
    );
}