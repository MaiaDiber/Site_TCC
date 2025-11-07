import Cabeçalho from '../../components/Index/cabecalho'
import Rodape from '../../components/Index/rodape'
import './index.scss'

export default function Home() {
    return (
        <>
            <section className='Tudo'>
                <div className='img' style={{ backgroundImage: 'url(/assets/Images/Fundo.png)' }}>
                    <Cabeçalho/>
                    <div className="banner">
                        <div className="banner__overlay">
                            <div className="banner__content">
                                <h1>Inovação que se transforma em qualidade de vida.</h1>
                                <p className="banner__subtitle">Via saúde junto com você</p>
                            </div>
                        </div>
                    </div>
                </div>
            <Rodape/>
            </section>
        </>
    )
}
