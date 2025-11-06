import { useLocation, useNavigate } from 'react-router-dom'
import './RedefinicaoSenha.scss'

export default function EmailEnviado() {
    const location = useLocation()
    const navigate = useNavigate()
    const email = location.state?.email || ''
    
    
    const mascaraEmail = (email) => {
        if (!email) return ''
        const [usuario, dominio] = email.split('@')
        if (usuario.length <= 2) return email  
        const usuarioMascarado = usuario.charAt(0) + '*'.repeat(usuario.length - 2) + usuario.slice(-1)
        return `${usuarioMascarado}@${dominio}`
    }

    return (
      <section className='all-email' >
          <section className="email-confirmacao">
            <h2> E-mail Enviado!</h2>
            
            <div className="mensagem-importante">
                <h3>Instruções Enviadas</h3>
                <p>Enviamos um e-mail para:</p>
                <p className="email-mascarado">{mascaraEmail(email)}</p>
                
                <div className="detalhes">
                    <p> Validade do link: <strong>1 hora</strong></p>
                    <p> Link seguro para redefinição de senha</p>
                    <p> Verifique sua caixa de entrada e spam</p>
                </div>
                
                <button 
                    onClick={() => navigate('/Entrar')}
                    className="voltar-btn"
                >
                    Voltar ao Login
                </button>
            </div>
            
            <div className="info-seguranca">
                <small>
                    Por segurança, este link expira em 1 hora. 
                    Se não solicitou esta redefinição, ignore o e-mail.
                </small>
            </div>
        </section>
      </section>
    )
}