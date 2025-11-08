import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../axios.js';
import './Entrar.scss';

export default function Entrar() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisivel = () => setShowPassword(!showPassword);

  async function logar() {
    const resposta = await api.post('/login', { email, senha });
    const token = resposta.data.token;
    const usuario = resposta.data.usuario;

    // Salva token e dados do usuário
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Redireciona conforme tipo
    if (usuario.tipo === 'Adm') navigate('/Admin');
    else navigate('/');
  }

  return (
    <section className='all-entrar'>
      <section className='container-entrar'>
        <img className='logosite-entrar' src='/assets/Images/logo_ViaSaúde.png' height={70} alt='' />
        <div className='Entrar'>
          <div className='Login-linha'>
            <h1>Login</h1>
            <div className='linha-entrar'></div>
          </div>

          <div className='cpf-senha'>
            <label>
              <p>E-mail</p>
              <input
                type='email'
                placeholder='Insira seu e-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              <p>Senha</p>
              <div className='password-input-container'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder='Insira sua senha'
                />
                <button
                  onClick={togglePasswordVisivel}
                  type='button'
                  className='toggle-password-btn'
                >
                  👁
                </button>
              </div>
            </label>
          </div>

          <button type='button' className='btn-entrar' onClick={logar}>
            Entrar
          </button>

          <div className='naotemconta'>
            <p>Ainda não tem uma conta?</p>
            <Link to={'/Cadastro'}>Cadastre-se</Link>
          </div>
        </div>
      </section>
    </section>
  );
}
