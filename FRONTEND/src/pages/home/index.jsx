import Cabeçalho from '../../components/Index/cabecalho'
import Rodape from '../../components/Index/rodape'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './index.scss'

export default function Home() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [abaAtiva, setAbaAtiva] = useState('consultas');
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const buscarDados = async (tipo) => {
        setCarregando(true);
        try {
            const res = await fetch(`https://suaapi.com/${tipo}`);
            const data = await res.json();
            setDados(data);
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        buscarDados(abaAtiva);
    }, [abaAtiva]);


    const cards = [
        {
            className: 'card-vacinas',
            title: 'Vacinas Disponíveis',
            description: 'Acesse informações sobre vacinas disponíveis em sua região.'
        },
        {
            className: 'card-unidades',
            title: 'Unidades de Saúde',
            description: 'Localize UBSs próximas, consulte horários de atendimento e serviços oferecidos.'
        },
        {
            className: 'card-medicamentos',
            title: 'Medicamentos',
            description: 'Verifique disponibilidade de medicamentos essenciais e receba orientações sobre uso.'
        },
        {
            className: 'card-campanhas',
            title: 'Campanhas',
            description: 'Participe de campanhas de saúde pública e fique informado sobre ações preventivas.'
        }
    ];

    const nextCard = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === cards.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? cards.length - 1 : prevIndex - 1
        );
    };


     const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');


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

                <div className='faixa-container'>
                    <div className='Faixa'>
                        <h2>Serviços de saúde em um só lugar!</h2>
                        <p>Encontre UBSs, vacinas e medicamentos — rápido e fácil.</p>
                    </div>
                    <div className='FaixaaoLado'>
                        <h2>Horário de atendimento:</h2>
                        <p>Segunda a sexta — 07h às 19h</p>
                    </div>
                </div>

                <div className='SaibaMais'>
                    <h1>Sobre nós</h1>
                    <p>
                        Mais do que um site, somos uma ponte entre você e os serviços de saúde pública.<br />
                        Queremos que cada cidadão tenha acesso rápido e fácil a informações confiáveis,<br />
                        agendamentos simplificados e ferramentas que facilitam o cuidado com o seu bem-estar.
                    </p>
                    <h3>
                        Descubra como estamos transformando o acesso à saúde
                        <span style={{ float: 'right', marginRight: '520px' }}>
                            <Link to='/Sobre' className='Saiba' style={{ textDecoration: 'none' }}>Saiba mais</Link>
                        </span>
                    </h3>
                </div>

                {/* 🔹 Carrossel de Serviços */}
                <section className='Servicos'>
                    <div className="faixa-verde">
                        <div className="titulo-container">
                            <h2 className="titulo-servicos">Somos com você</h2>
                            <div className="carousel-btns">
                                <button className="carousel-btn prev" onClick={prevCard}>{'<'}</button>
                                <button className="carousel-btn next" onClick={nextCard}>{'>'}</button>
                            </div>
                        </div>

                        {/* Área de rolagem dos cards */}
                        <div className="carousel">
                            <div
                                className="cards"
                                style={{ transform: `translateX(-${currentIndex * 420}px)` }}
                            >
                                {cards.map((card, index) => (
                                    <div key={index} className="card-wrapper">
                                        <div className={`card ${card.className}`}></div>
                                        <h3>{card.title}</h3>
                                        <p>{card.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 🔹 Botões abaixo */}
                        <div className="Botoes">
                            <button
                                className={`btn consulta ${abaAtiva === 'consultas' ? 'ativo' : ''}`}
                                onClick={() => setAbaAtiva('consultas')}
                            >
                                Consultas Disponíveis
                            </button>

                            <button
                                className={`btn medico ${abaAtiva === 'medicos' ? 'ativo' : ''}`}
                                onClick={() => setAbaAtiva('medicos')}
                            >
                                Médicos Disponíveis
                            </button>
                        </div>

                        {/* 🔹 UBS Dinâmicas */}
                        <div className="UBS">
                            {carregando ? (
                                <p className="carregando">Carregando...</p>
                            ) : dados.length === 0 ? (
                                <p className="nenhum">Nenhum resultado encontrado.</p>
                            ) : (
                                dados.map((item) => (
                                    <div key={item.id} className="UBS-card">
                                        <div className="UBS-header">
                                            <h4>{item.titulo}</h4>
                                            <span className="status">{item.status}</span>
                                        </div>

                                        <div className="UBS-info">
                                            <p>
                                                <strong>{item.local}</strong>
                                                <br />
                                                {item.endereco}
                                            </p>
                                        </div>

                                        <div className="UBS-alerta">
                                            <p>
                                                ⚠️ Para agendar, compareça à unidade com documento de identidade e cartão SUS
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                <Rodape />
            </section>
        </>
    );
}
