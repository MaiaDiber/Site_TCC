
import { useState, useEffect, useRef } from 'react';
import api from '../../axios.js';
import { useNavigate } from 'react-router-dom';
import './Cadastrao.scss';
import CabecalhoCadastro from '../../components/Cadastro/cabecalhoCadastro';
import ComponenteAcessibilidade from './Acessibilidade.jsx';

export default function Cadastro() {

    const dropdownRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [erros, setErros] = useState({});
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const hoje = new Date().toISOString().split("T")[0];
    const dataMinima = "1900-01-01";

    const [form, setform] = useState({
        nome_completo: '',
        cpf: '',
        data_nascimento: '',
        email: '',
        senha: '',
        confirmar_senha: '', 
        cep: '',
        rua_aven: '',
        numero_casa: '',
        bairro: '',
        tipo: '',
        abrirDropdown: false,
        motivo: ''
    });

     useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setform(prevForm => ({
                    ...prevForm,
                    abrirDropdown: false
                }));
            }
        }

        if (form.abrirDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [form.abrirDropdown]);

    function atualizar(campo, valor) {
        if (campo === 'cpf') {
            valor = formatarCPF(valor);
        } else if (campo === 'cep') {
            valor = formatarCEP(valor);
        }
        
        setform({ ...form, [campo]: valor });
        
        if (erros[campo]) {
            setErros({ ...erros, [campo]: '' });
        }
    }

    function validarCampos() {
        const novosErros = {};

        if (!form.nome_completo.trim()) 
            novosErros.nome_completo = "Informe o nome completo";

        if (!form.cpf.trim()) 
            novosErros.cpf = "Informe o CPF";
        else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf))
            novosErros.cpf = "CPF inválido (use o formato 000.000.000-00)";

        if (!form.data_nascimento) 
            novosErros.data_nascimento = "Informe a data de nascimento";

        if (!form.email.trim()) 
            novosErros.email = "Informe o e-mail";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            novosErros.email = "E-mail inválido";

        if (!form.senha.trim()) 
            novosErros.senha = "Crie uma senha";
        else if (form.senha.length < 6)
            novosErros.senha = "Senha deve ter no mínimo 6 caracteres";

        
        if (!form.confirmar_senha.trim()) 
            novosErros.confirmar_senha = "Confirme sua senha";
        else if (form.senha !== form.confirmar_senha)
            novosErros.confirmar_senha = "As senhas não coincidem";

        if (!form.cep.trim()) 
            novosErros.cep = "Informe o CEP";

        if (!form.rua_aven.trim()) 
            novosErros.rua_aven = "Informe a rua ou avenida";

        if (!form.numero_casa.trim()) 
            novosErros.numero_casa = "Informe o número da casa";

        if (!form.bairro.trim()) 
            novosErros.bairro = "Informe o bairro";

        if (!form.tipo) 
            novosErros.tipo = "Selecione o cargo";

        if (form.tipo === "Solicitar Administrador" && !form.motivo.trim())
            novosErros.motivo = "Explique o motivo da solicitação";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

   
    function formatarCPF(cpf) {
       
        cpf = cpf.replace(/\D/g, '');
        
        
        if (cpf.length <= 3) {
            return cpf;
        } else if (cpf.length <= 6) {
            return cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2');
        } else if (cpf.length <= 9) {
            return cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
        }
    }

   
    function formatarCEP(cep) {
        
        cep = cep.replace(/\D/g, '');
        
        
        if (cep.length <= 5) {
            return cep;
        } else {
            return cep.replace(/(\d{5})(\d{0,3})/, '$1-$2');
        }
    }

    async function salvar() {
        try {
            
            if (!validarCampos()) {
                alert("Por favor, corrija os erros no formulário.");
                return;
            }

            setCarregando(true);

           
            const dadosEnvio = {
                nome_completo: form.nome_completo,
                cpf: form.cpf,
                data_nascimento: form.data_nascimento,
                email: form.email,
                senha: form.senha,
                cep: form.cep,
                rua_aven: form.rua_aven,
                numero_casa: form.numero_casa,
                bairro: form.bairro,
                tipo: form.tipo === "Solicitar Administrador" ? "paciente" : "paciente"
            };

            let endpoint = '';
            let mensagemSucesso = '';

            if (form.tipo === "Solicitar Administrador") {
                endpoint = '/solicitar-admin';
                dadosEnvio.motivo = form.motivo;
                mensagemSucesso = '✅ Solicitação de administrador enviada! Você já pode fazer login como usuário.';
            } else {
                endpoint = '/cadastrar';
                mensagemSucesso = '✅ Cadastro realizado com sucesso! Agora você pode fazer login.';
            }

            
            let response;
            try {
                response = await api.post(endpoint, dadosEnvio);
            } catch (erroEndpoint1) {
                console.log('Tentando endpoint alternativo...');
            
                response = await api.post('/api/cadastro' + endpoint, dadosEnvio);
            }

            alert(mensagemSucesso);

            
            setform({
                nome_completo: '',
                cpf: '',
                data_nascimento: '',
                email: '',
                senha: '',
                confirmar_senha: '', 
                cep: '',
                rua_aven: '',
                numero_casa: '',
                bairro: '',
                tipo: '',
                abrirDropdown: false,
                motivo: ''
            });

                navigate('/');
            

        } catch (erro) {
            console.error('Erro ao cadastrar:', erro);
            
            let mensagemErro = 'Erro ao realizar cadastro.';
            
            if (erro.response?.data?.erro) {
                mensagemErro = erro.response.data.erro;
            } else if (erro.response?.status === 400) {
                mensagemErro = 'Dados inválidos. Verifique os campos.';
            } else if (erro.response?.status === 409) {
                mensagemErro = 'Email ou CPF já cadastrado.';
            } else if (erro.response?.status === 404) {
                mensagemErro = 'Endpoint não encontrado. Verifique a configuração do servidor.';
            }
            
            alert('❌ ' + mensagemErro);
        } finally {
            setCarregando(false);
        }
    }

    const togglePasswordVisivel = () => {
        setShowPassword(!showPassword);
    }

   
    const toggleConfirmPasswordVisivel = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <section className='all'>

             <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000
            }}>
                <ComponenteAcessibilidade />
            </div>

            <section className='Container'>
                <CabecalhoCadastro />
                
                <div className='primeiroP'>
                    <p>Preencha os dados abaixo para completar seu cadastro na Via Saúde</p>
                </div>

                <div className='informação-usuário'>
                    
                    <div className='dados-usu'>
                        <p>Dados Pessoais</p>
                    </div>

                    <div className="dados">
                        <div className="inputs">
                            <label>
                                <p>Nome Completo*</p>
                                <input 
                                    type="text" 
                                    placeholder='Nome Completo'
                                    value={form.nome_completo} 
                                    onChange={(e) => atualizar('nome_completo', e.target.value)}
                                    className={erros.nome_completo ? 'erro' : ''}
                                    disabled={carregando}
                                />
                                {erros.nome_completo && (
                                    <span className="msg-erro">{erros.nome_completo}</span>
                                )}
                            </label>

                            <div className="grupo1">
                                <label>
                                    <p>CPF*</p>
                                    <input 
                                        type="text" 
                                        placeholder='000.000.000-00' 
                                        value={form.cpf} 
                                        onChange={(e) => atualizar('cpf', e.target.value)}
                                        className={erros.cpf ? 'erro' : ''}
                                        disabled={carregando}
                                    />
                                    {erros.cpf && (
                                        <span className="msg-erro">{erros.cpf}</span>
                                    )}
                                </label>

                                <label>
                                    <p>Data de Nascimento*</p>
                                    <input 
                                        type="date" 
                                        min={dataMinima}
                                        max={hoje}
                                        value={form.data_nascimento} 
                                        onChange={(e) => atualizar('data_nascimento', e.target.value)}
                                        className={erros.data_nascimento ? 'erro' : ''}
                                        disabled={carregando}
                                    />
                                    {erros.data_nascimento && (
                                        <span className="msg-erro">{erros.data_nascimento}</span>
                                    )}
                                </label>
                            </div>

                            <label>
                                <p>E-mail*</p>
                                <input 
                                    type="email" 
                                    placeholder='exemplo@gmail.com' 
                                    value={form.email} 
                                    onChange={(e) => atualizar('email', e.target.value)}
                                    className={erros.email ? 'erro' : ''}
                                    disabled={carregando}
                                />
                                {erros.email && (
                                    <span className="msg-erro">{erros.email}</span>
                                )}
                            </label>

                            <label>
                                <p>Crie sua senha* (mínimo 6 caracteres)</p>
                               <div className="password-input-container">
                                 <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Digite sua senha' 
                                    value={form.senha} 
                                    onChange={(e) => atualizar('senha', e.target.value)}
                                    className={erros.senha ? 'erro' : ''}
                                    disabled={carregando}
                                />
                                <button 
                                        onClick={togglePasswordVisivel} 
                                        type='button' 
                                        className="toggle-password-btn"
                                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                        disabled={carregando}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            {showPassword ? (
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                                                    <line x1="2" y1="2" x2="22" y2="22"/>
                                                </svg>
                                            ) : (
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"/>
                                                    <circle cx="12" cy="12" r="3"/>
                                                </svg>
                                            )}
                                        </svg>
                                    </button>
                                </div>
                                {erros.senha && (
                                    <span className="msg-erro">{erros.senha}</span>
                                )}
                                
                            </label>
                            
                            
                            <label>
                                <p>Confirme sua senha*</p>
                                <div className="password-input-container">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        placeholder='Digite sua senha novamente' 
                                        value={form.confirmar_senha} 
                                        onChange={(e) => atualizar('confirmar_senha', e.target.value)}
                                        className={erros.confirmar_senha ? 'erro' : ''}
                                        disabled={carregando}
                                    />
                                    <button 
                                        onClick={toggleConfirmPasswordVisivel} 
                                        type='button' 
                                        className="toggle-password-btn"
                                        aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                                        disabled={carregando}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            {showConfirmPassword ? (
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                                                    <line x1="2" y1="2" x2="22" y2="22"/>
                                                </svg>
                                            ) : (
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"/>
                                                    <circle cx="12" cy="12" r="3"/>
                                                </svg>
                                            )}
                                        </svg>
                                    </button>
                                </div>
                                {erros.confirmar_senha && (
                                    <span className="msg-erro">{erros.confirmar_senha}</span>
                                )}
                            </label>
                        </div>
                    </div>

                    
                    <div className="endereço">
                        <div className="endereço-usu">
                            <p>Endereço</p>
                        </div>

                        <label>
                            <p>CEP*</p>
                            <input 
                                type="text" 
                                placeholder='00000-000'
                                value={form.cep} 
                                onChange={(e) => atualizar('cep', e.target.value)}
                                className={erros.cep ? 'erro' : ''}
                                disabled={carregando}
                            />
                            {erros.cep && (
                                <span className="msg-erro">{erros.cep}</span>
                            )}
                        </label>

                        <div className="grupo2">
                            <label>
                                <p>Rua/Avenida*</p>
                                <input 
                                    type="text" 
                                    placeholder='Rua ViaSaúde/Avenida ViaSaúde'
                                    value={form.rua_aven} 
                                    onChange={(e) => atualizar('rua_aven', e.target.value)}
                                    className={erros.rua_aven ? 'erro' : ''}
                                    disabled={carregando}
                                />
                                {erros.rua_aven && (
                                    <span className="msg-erro">{erros.rua_aven}</span>
                                )}
                            </label>

                            <label>
                                <p>Número*</p>
                                <input 
                                    type="text" 
                                    placeholder='n° 1234' 
                                    value={form.numero_casa} 
                                    onChange={(e) => atualizar('numero_casa', e.target.value)}
                                    className={erros.numero_casa ? 'erro' : ''}
                                    disabled={carregando}
                                />
                                {erros.numero_casa && (
                                    <span className="msg-erro">{erros.numero_casa}</span>
                                )}
                            </label>
                        </div>

                        <label>
                            <p>Bairro*</p>
                            <input 
                                type="text" 
                                placeholder='Nome Bairro' 
                                value={form.bairro} 
                                onChange={(e) => atualizar('bairro', e.target.value)}
                                className={erros.bairro ? 'erro' : ''}
                                disabled={carregando}
                            />
                            {erros.bairro && (
                                <span className="msg-erro">{erros.bairro}</span>
                            )}
                        </label>

                        
                        <label>
                            <p>Cargo*</p>
                            <div className="dropdown" ref={dropdownRef} >
                                <button
                                    type="button"
                                    className={`dropdown-btn ${erros.tipo ? 'erro' : ''}`}
                                    onClick={() => atualizar("abrirDropdown", !form.abrirDropdown)}
                                    disabled={carregando}
                                >
                                    {form.tipo ? form.tipo : "Selecione o cargo"}
                                    <span className="setinha">▼</span>
                                </button>

                                {form.abrirDropdown && (
                                    <div className="dropdown-menu">
                                        <div
                                            className="dropdown-item"
                                            onClick={() =>
                                                setform({ 
                                                    ...form, 
                                                    tipo: "Usuário", 
                                                    abrirDropdown: false, 
                                                    motivo: "" 
                                                })
                                            }
                                        >
                                            Usuário
                                        </div>
                                        <div
                                            className="dropdown-item"
                                            onClick={() =>
                                                setform({ 
                                                    ...form, 
                                                    tipo: "Solicitar Administrador", 
                                                    abrirDropdown: false 
                                                })
                                            }
                                        >
                                            Solicitar Administrador
                                        </div>
                                    </div>
                                )}
                            </div>

                            {erros.tipo && (
                                <span className="msg-erro" style={{ marginTop: "5px", display: "block" }}>
                                    {erros.tipo}
                                </span>
                            )}
                        </label>

                        
                        {form.tipo === "Solicitar Administrador" && (
                            <div className="motivo-admin">
                                <p>Por que você quer ser administrador?*</p>
                                <textarea
                                    placeholder="Explique brevemente o motivo da solicitação..."
                                    value={form.motivo}
                                    onChange={(e) => atualizar("motivo", e.target.value)}
                                    rows={4}
                                    className={erros.motivo ? "erro" : ""}
                                    disabled={carregando}
                                ></textarea>
                                {erros.motivo && (
                                    <span className="msg-erro">{erros.motivo}</span>
                                )}
                            </div>
                        )}
                    </div>

                    
                    <div className="doisfinais">
                        <button 
                            className='cadastrar-img' 
                            type='button' 
                            onClick={salvar}
                            disabled={carregando}
                        >
                            <img 
                                src="/public/assets/images/ChatGPT_Image_7_de_nov._de_2025__00_53_06-removebg-preview.png" 
                                height={50} 
                                alt="" 
                            />
                            <h2>{carregando ? 'Cadastrando...' : 'Cadastrar-se'}</h2>
                        </button>
                        <p>* Campos obrigatórios</p>
                    </div>
                </div>
            </section>
        </section>
    );
}