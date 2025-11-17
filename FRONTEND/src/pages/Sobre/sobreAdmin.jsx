import CabecalhoAdmin from '../../components/Index/AdminCabecalho'
import Rodape from '../../components/Index/rodape'
import ComponenteAcessibilidade from '../Cadastro/Acessibilidade'
import './index.scss'

export default function SobrenosAdmin() {

    return(
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

                <CabecalhoAdmin/>
               <div className='titulo'>
    <div className='so'><h2>Sobre</h2></div><div className='va'><h2>Via</h2></div><div className='sa'><h2> Saúde</h2></div>
            </div>
   
    <p class="descricao">
      Uma iniciativa para transformar o acesso à saúde pública no Brasil,
      tornando a informação mais clara e acessível para todos.
    </p>

    <div class="historia">
    <h3>Nossa História</h3>
<hr />

      <br></br>
      <p>
       A ideia para este projeto surgiu durante o desenvolvimento
       de um Trabalho de Conclusão de Curso (TCC), quando 
       nos deparamos com os desafios da saúde pública e a falta de acesso à informação,
       especialmente entre pessoas mais velhas ou
       com dificuldades de usar tecnologias.
      </p>
      <p>
        Com isso, criamos um site intuitivo, especialmente pensado para garantir
        que todos, independentemente de sua familiaridade com o mundo digital,
        tenham acesso fácil e claro a informações essenciais para a saúde.
      </p>
    </div>

                
                <Rodape/>
            </section>
        </>
    )
}

