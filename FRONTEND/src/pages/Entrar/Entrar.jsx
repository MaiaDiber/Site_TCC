import { useState } from 'react'
import api from '../../axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Entrar.scss'

export default function Entrar() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    // ✅ SEM useEffect - SEM redirecionamento automático
    // Agora você pode acessar /Entrar mesmo estando logado

    async function logar() {
        try {
            const body = {
                "email": email,
                "senha": password
            }

            const response = await api.post('/login', body)
            const token = response.data.token
            const usuario = response.data.usuario

            localStorage.setItem("TOKEN", token)
            localStorage.setItem("usuario", JSON.stringify(usuario))

            // ✅ Só redireciona se o login for bem-sucedido
            if (usuario.tipo === 'admin') {
                navigate('/Admin')
            } else {
                navigate('/')
            }

        } catch (error) {
            alert('Erro ao fazer login: ' + (error.response?.data?.erro || error.message))
        }
    }

    const togglePasswordVisivel = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <section className='all-entrar'>
                <section className='container-entrar'>
                    <img className='logosite-entrar' src='/assets/Images/logo_ViaSaúde.png' height={70} alt='' />
                    <div className='Entrar'>
                        <div className='Login-linha'>
                            <h1>Login</h1>
                            <div className='linha-entrar'></div>
                        </div>

                        <div className="cpf-senha">
                            <label> 
                                <p>E-mail</p>
                                <input type="email" placeholder='Insira seu e-mail' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            
                            <label> 
                                <p>Senha</p>
                                <div className="password-input-container">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Insira sua senha' 
                                    />
                                    
                                    <button 
                                        onClick={togglePasswordVisivel} 
                                        type='button' 
                                        className="toggle-password-btn"
                                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
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
                            </label>
                        </div>

                        <button onClick={logar} className="btn-entrar">
                            <p>Entrar</p>
                        </button>

                        <div className="naotemconta">
                            <p>Ainda não tem uma Conta?</p>
                            <Link to={'/Cadastro'}> 
                                Cadastre-se
                            </Link>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}