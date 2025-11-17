import { Link } from 'react-router';
import './rodape.scss';

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape-inner">

        
        <div className="col marca">
          <img src="/public/assets/images/a.png" height={150} alt="" />
          <h3>Via Saúde</h3>
          <p className="marca-sub">
            Transformando o acesso à<br />saúde pública com tecnologia
          </p>
        </div>

       
        <div className="col links">
          <h4>Links rápidos</h4>
          <ul>
            <li><Link to={"/upas"}>UPAs</Link></li>
            <li><Link to={"/Sobre"}>Sobre</Link></li>
            <li><Link to={"/Vacinacoes"}>Vacinações</Link></li>
            <li><Link to={"/Horarios"}>Horários</Link></li>
            <li><Link to={"/"}>Sair da conta</Link></li>
            <li><Link to={"/Verificar"}>Verificacao</Link></li>
          </ul>
        </div>

        
        <div className="col redes">
          <div className="icons">
            <Link to={"https://www.instagram.com/viasaude.tcc/"}><i className="fa-brands fa-instagram">
              <img src="/public/assets/images/a24ccc83bec854a87cc133fd52eb9161-removebg-preview.png" height={60} alt="" />
              </i></Link>
            <Link to={"https://x.com/viasaudetcc"}><i className="fa-brands fa-facebook-f">
              <img src="/public/assets/images/COLOURBOX65108000-removebg-preview.png" height={70} alt="" />
              </i></Link>
          </div>
        </div>

      </div>

      <div className="rodape-bottom">
        <p>2025 © Instituto Nossa Senhora de Fátima</p>
      </div>
    </footer>
  );
}
