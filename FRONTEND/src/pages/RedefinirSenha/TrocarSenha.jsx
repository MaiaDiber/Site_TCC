import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './TrocarSenha.scss'


export default function AtualizarSenha() {
    const [trocarPassword, setTrocarPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    
    const location = useLocation()
    const navigate = useNavigate()
    const token = new URLSearchParams(location.search).get('token')
    return (
        <section className='all-senha' >

            <div className="logo-senha">
                <img src="/assets/Images/a.png" height={130} alt="" />
            </div>

            <section className='container-senha' >
                <div className="titulo-linha">
                    <h1>Redefina sua senha</h1>
                    <div className="linha-senha"></div>
                </div>

                <div className="senha-confirmação">
                    <label> <p>Crie uma nova senha</p>
                        <input type="text" 
                        value={trocarPasswordPassword}
                        onChange={(e) => setTrocarPassword(e.target.value)}
                        />
                    </label>
                    <label> <p>Confirme a senha</p>
                        <input type="text"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        </label>
                </div>

                <button type='button' >
                    <p>Enviar</p>
                </button>
            </section>
        </section>
    )
}