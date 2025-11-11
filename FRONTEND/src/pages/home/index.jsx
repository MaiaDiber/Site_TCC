import { Link } from 'react-router';
import Cabeçalho from '../../components/Index/cabecalho';
import Rodape from '../../components/Index/rodape';
import './index.scss';

export default function Home() {
  return (
    <>
      <section className='Tudo'>
        <div className='img' style={{ backgroundImage: 'url(/assets/Images/Fundo.png)' }}>
          <Cabeçalho />
          <div className="banner">
            <div className="banner__overlay">
              <div className="banner__content">
                <h1>Inovação que se transforma em qualidade de vida.</h1>
                <p className="banner__subtitle">Via saúde junto com você</p>
              </div>
            </div>
          </div>
        </div>
        <div className='faixa-verde'>
            <h2>Bem-vindo ao portal de Saúde Pública</h2>
            <h3>Encontre informações sobre consultas, médicos e medicamentos disponíveis no SUS</h3>

            <div className='Caixa-branca'>
                <h3>Importante:</h3>
                <p>Os agendamentos devem ser feitos presencialmente na unidade de saúde mais próxima</p>
            </div>
        </div>
        <div className='Cartoes'>
            <div className='Card'>
                <h3>Vacinas disponíveis</h3>
                <p>Todas as UBS oferecem vacinas</p>
            </div>
            <div className='Card'>
                <h3>Unidades de saúde</h3>
                <p>Procure as UBS mais próximas</p>
            </div>
            <div className='Card'>
                <h3>Horário de Atendimento</h3>
                <p>Segunda a sexta, 07h às 19h</p>
            </div>
        </div>

        <div className='Cartoes2'>
            <div className='Card2'>
                <img src='/public/assets/Images/pp.png' alt='popo' width='50px' className='primeira'/>
                <h3>Consultas disponíveis</h3>
            </div>
            <div className='Card2'>
                <img src='/public/assets/Images/ppp.png' alt='ppp' width='60px'/>
                <h3>Médicos disponíveis</h3>
            </div>
            <div className='Card2'>
                <img src='/public/assets/Images/pppp.png' alt='' width='50px'/>
                <h3>Medicamentos </h3>
            </div>
        </div>

        <Rodape />
      </section>
    </>
  );
}
