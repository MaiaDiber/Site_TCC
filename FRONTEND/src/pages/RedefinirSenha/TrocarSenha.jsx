// src/pages/RedefinirSenha.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../axios';
import './TrocarSenha.scss';

export default function RedefinirSenha() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!novaSenha || !confirmarSenha) {
      setErro('Preencha todos os campos');
      return;
    }

    if (novaSenha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem');
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

  if (!token) {
    return (
      <div className="invalid-token">
        <h2>Token inválido ou ausente</h2>
        <p>O link de redefinição de senha parece estar incorreto ou expirado.</p>
        <a href="/">Voltar para o login</a>
      </div>
    );
  }

  return (
    <section className="redefinir-container">

    <img src="/public/assets/images/a.png" height={130} alt="" />

      <div className="redefinir-card">
        <h2>Redefinir Senha</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nova Senha:
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              disabled={carregando}
            />
          </label>

          <label>
            Confirmar Nova Senha:
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              disabled={carregando}
            />
          </label>

          {erro && <p className="erro">{erro}</p>}
          {mensagem && <p className="sucesso">{mensagem}</p>}

          <button type="submit" disabled={carregando}>
            {carregando ? 'Redefinindo...' : 'Redefinir Senha'}
          </button>
        </form>
      </div>
    </section>
  );
}
