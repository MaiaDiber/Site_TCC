import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CabecalhoAdmin from '../../components/Index/AdminCabecalho'
import Rodape from '../../components/Index/rodape';
import InteractiveCardsSection from '../home/cartoes';
import ComponenteAcessibilidade from '../Cadastro/Acessibilidade';
import './Principal.scss';

export default function PaginaAdmin() {
  const navigate = useNavigate();

   const handleNavigate = (path) => {
    window.location.href = path;
  };
  const [currentSlide, setCurrentSlide] = useState(0);

  
  const slides = [
    '/assets/Images/Fundo.png',
    '/assets/Images/Dialogo-img.jpg', 
    '/assets/Images/Vacinacao-iag.jpg',
    '/assets/Images/UPAs-img.jpg'
  ];

  
  const slideContent = [
    {
      title: 'Inovação que se transforma em qualidade de vida.'
    },
    {
      title: 'Atendimento humanizado e de qualidade',
    },
    {
      title: 'Proteção que você pode confiar',
    },
    {
      title: 'Unidades próximas de você'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      <section className='Tudo'>

        <div style={{
                                position: 'fixed',
                                top: '20px',
                                right: '20px',
                                zIndex: 1000
                            }}>
                                <ComponenteAcessibilidade />
                            </div>
       

        <div className='carousel-container'>
          <CabecalhoAdmin />
          
          
          <div className="carousel">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide})` }}
              >
                <div className="banner__overlay">
                  <div className="banner__content">
                    <h1>{slideContent[index].title}</h1>
                    <p className="banner__subtitle">{slideContent[index].subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
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
            <div className='Card' onClick={() => navigate('/Vacinacoes')}>
              <img src="/public/assets/images/3232e3fa-040d-4e72-a079-9d7e421c92bc-removebg-preview.png" height={50} width={50} alt="" />
                <div className="text">
                  <h3>Vacinas disponíveis</h3>
                <p>Todas as UBS oferecem vacinas</p>
                </div>
            </div>
            <div className='Card' onClick={() => navigate('/upas')}>
              <img src="/public/assets/images/cea2b736-e634-4d70-8892-45bf6bc20405-removebg-preview.png" height={50} width={30} alt="" />
                <div className="text">
                  <h3>Unidades de saúde</h3>
                <p>Procure as UBS mais próximas</p>
                </div>
            </div>
            <div className='Card' onClick={() => navigate('/Horarios')} >
              <img src="/public/assets/images/download-removebg-preview.png" height={50} width={50} alt="" />
                <div className="text">
                  <h3>Horário de Atendimento</h3>
                <p>Segunda a sexta, 07h às 19h</p>
                </div>
            </div>
        </div>

      

        <InteractiveCardsSection />

        <Rodape />
      </section>
    </>
  );
}