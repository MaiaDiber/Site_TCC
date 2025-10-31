import './rodape.scss';

export default function Rodape() {
    return(
    <>
        <div className='rodape'>
            <div className='outro'>
                <div className='Logo'>
                    <img src="/assets/Images/a.png" alt="imagem" width='250px'/>
                </div>

                <div className='part'>
                        <h4>Contato</h4>
                        <p>(11) 12345-1234</p>
                        <p>TCC@frei.com.br</p>
                </div>
                <div className='part'>
                        <h4>Desenvolvido por</h4>
                        <p>Luigi Bernardes S. Banzatto<br/>Gustavo Maia Dibernardi
                        <br/>Sophia<br/>Pietro<br/>Lucas<br/>Márcio</p>

                </div>
                <div className='part'>
                        <h4>Turma</h4>
                        <p>Informática - C</p>
                </div>
            </div>
            <div className="bottom">
                    <p>2025 © Instituto Nossa Senhora de Fátima</p>
            </div>
        </div>
        
        
    </>
    )
}