import Cabeçalho from '../../components/Index/cabecalho'
import Rodape from '../../components/Index/rodape'
import './index.scss'

export default function Home() {

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

                <div className='Faixa'>
                    <h2>Bem-vindo ao ViaSaúde, {usuario.nome}!</h2>
                    <p>Encontre UBSs, vacinas e medicamentos — tudo em um só lugar, rápido e fácil.</p>
                </div>

                {/* 🔹 Seção dos cartões principais */}
                <section className='Servicos'>
                    <div className="cards">
                        <div className="card">
                            <h3>Vacinas Disponíveis</h3>
                            <p>Todas as UBS oferecem vacinas</p>
                        </div>

                        <div className="card">
                            <h3>Unidades de Saúde</h3>
                            <p>Procure a UBS mais próxima</p>
                        </div>

                        <div className="card">
                            <h3>Horário de Atendimento</h3>
                            <p>Segunda a Sexta, 7h às 19h</p>
                        </div>
                    </div>
                </section>

                {/* 🔹 Barra de busca */}
                <div className="Busca">
                    <p>O que você está procurando?</p>
                    <div className="barra">
                        <input type="text" placeholder="Buscar por nome, especialidade ou unidade..." />
                    </div>
                </div>

                {/* 🔹 Botões de ação */}
                <div className="Botoes">
                    <button className="btn consulta">Consultas Disponíveis</button>
                    <button className="btn medico">Médicos Disponíveis</button>
                    <button className="btn remedio">Medicamentos Disponíveis</button>
                </div>

                {/* 🔹 Bloco de UBS */}
                <div className="UBS">
                    <div className="UBS-header">
                        <h4>Clínica Geral</h4>
                        <span className="status">Disponível</span>
                    </div>

                    <div className="UBS-info">
                        <p><strong>UBS Centro</strong><br />Rua Maria Bla Bla, 151</p>
                    </div>

                    <div className="UBS-horario">
                        <p>Segunda a Sexta</p>
                    </div>

                    <div className="UBS-alerta">
                        <p>⚠️ Para agendar, compareça à unidade com documento de identidade e cartão SUS</p>
                    </div>
                </div>

                <Rodape />
            </section>
        </>
    )
}
