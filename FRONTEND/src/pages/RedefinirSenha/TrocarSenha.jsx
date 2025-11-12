
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../axios';
import './TrocarSenha.scss';

export default function RedefinirSenha() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [erros, setErros] = useState({}); 

  function validarCampos() {
    const novosErros = {};

    if (!novaSenha.trim()) {
      novosErros.novaSenha = "Informe a nova senha";
    } else if (novaSenha.length < 6) {
      novosErros.novaSenha = "A senha deve ter pelo menos 6 caracteres";
    }

    if (!confirmarSenha.trim()) {
      novosErros.confirmarSenha = "Confirme a nova senha";
    } else if (novaSenha !== confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validarCampos()) {
      setErro('Por favor, corrija os erros no formulário.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');
      setMensagem('');

      await api.post('/reset-password', {
        token,
        novaSenha,
      });

      setMensagem('✅ Sua senha foi redefinida com sucesso!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      if (error.response?.status === 400) {
        setErro('Token inválido ou expirado');
      } else {
        setErro('Erro ao redefinir a senha. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  }

  
  function atualizarCampo(campo, valor) {
    if (campo === 'novaSenha') {
      setNovaSenha(valor);
    } else if (campo === 'confirmarSenha') {
      setConfirmarSenha(valor);
    }

    
    if (erros[campo]) {
      setErros({ ...erros, [campo]: '' });
    }
    
    
    if (erro) {
      setErro('');
    }
  }

  if (!token) {
    return (
      <div className="invalid-token">
        <h2>Token inválido ou ausente</h2>
        <p>O link de redefinição de senha parece estar incorreto ou expirado.</p>
        <a href="/">Voltar para o login</a>
      </div>
    );
  }

  const togglePasswordVisivel = () => {
    setShowPassword(!showPassword);
  }

 
  const toggleConfirmPasswordVisivel = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <section className="redefinir-container">
      <img src="/public/assets/images/a.png" height={130} alt="" />

      <div className="redefinir-card">
        <h2>Redefinir Senha</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nova Senha:
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={novaSenha}
                onChange={(e) => atualizarCampo('novaSenha', e.target.value)}
                className={erros.novaSenha ? 'erro' : ''}
                disabled={carregando}
                placeholder="Digite a nova senha"
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
            {erros.novaSenha && (
              <span className="msg-erro">{erros.novaSenha}</span>
            )}
          </label>

          <label>
            Confirmar Nova Senha:
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmarSenha}
                onChange={(e) => atualizarCampo('confirmarSenha', e.target.value)}
                className={erros.confirmarSenha ? 'erro' : ''}
                disabled={carregando}
                placeholder="Digite a senha novamente"
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
            {erros.confirmarSenha && (
              <span className="msg-erro">{erros.confirmarSenha}</span>
            )}
          </label>

          {erro && <p className="erro-geral">{erro}</p>}
          {mensagem && <p className="sucesso">{mensagem}</p>}

          <button type="submit" disabled={carregando}>
            {carregando ? 'Redefinindo...' : 'Redefinir Senha'}
          </button>
        </form>
      </div>
    </section>
  );
}