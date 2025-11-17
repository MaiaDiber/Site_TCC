import './Header.scss'
import { useNavigate } from 'react-router';

export default function Header() {

  const navigate = useNavigate()

  return (
    <header className="">
      <nav className="menu">
      <img src="/public/assets/images/logo_ViaSaúde.png" alt="Via Saúde" className="logo" />
      
         <div className="botoes-footer">
                    <button 
                        className="btn-voltar"
                        onClick={() => navigate(-1)}
                    >
                        ← Voltar
                    </button>
                </div>
      </nav>
    </header>
  );
}
