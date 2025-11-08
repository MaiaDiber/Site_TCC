import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './TrocarSenha.scss'

export default function AtualizarSenha() {
    const [trocarPassword, setTrocarPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const location = useLocation()
    const navigate = useNavigate()
    const token = new URLSearchParams(location.search).get('token')

    useEffect(() => {
        if (!token) {
            setMessage('Link inválido ou expirado')
        }
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!token) {
            setMessage('Link inválido')
            return
        }
        
        if (password !== confirmPassword) {
            setMessage('Senhas não coincidem')
            return
        }
        
        // Aqui você fará a chamada para API
        console.log('Token:', token)
        console.log('Nova senha:', password)
        
        setMessage('Senha atualizada com sucesso!')
        // navigate('/login') // redirecionar depois
    }

    return (
        <section className='all-senha'>
            <div className="logo-senha">
                <img src="/assets/Images/a.png" height={130} alt="" />
            </div>

            <section className='container-senha'>
                <div className="titulo-linha">
                    <h1>Redefina sua senha</h1>
                    <div className="linha-senha"></div>
                </div>

                {message && <div className="message">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="senha-confirmação">
                        <label>
                            <p>Crie uma nova senha</p>
                            <input 
                                type="password" 
                                value={trocarPassword}
                                onChange={(e) => setTrocarPassword(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <p>Confirme a senha</p>
                            <input 
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <button type="submit">
                        <p>Enviar</p>
                    </button>
                </form>
            </section>
        </section>
    )
}