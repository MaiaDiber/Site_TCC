import './rodape.scss';

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape-inner">

        {/* Coluna 1 - Marca */}
        <div className="col marca">
          <h3>Via Saúde</h3>
          <p className="marca-sub">
            Transformando o acesso à<br />saúde pública com tecnologia
          </p>
        </div>

        {/* Coluna 2 - Links rápidos */}
        <div className="col links">
          <h4>Links rápidos</h4>
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Equipe</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>

        {/* Coluna 3 - Redes sociais */}
        <div className="col redes">
          <div className="icons">
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
          </div>
        </div>

      </div>

      <div className="rodape-bottom">
        <p>2025 © Instituto Nossa Senhora de Fátima</p>
      </div>
    </footer>
  );
}
