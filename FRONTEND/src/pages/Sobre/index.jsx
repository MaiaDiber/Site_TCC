import Cabeçalho from '../../components/Index/cabecalho'
import Rodape from '../../components/Index/rodape'
import './index.scss'

export default function Sobrenos() {

    return(
        <>
            <section className='Tudo'>
                <Cabeçalho/>
               <div className='titulo'>
    <div className='so'><h2>Sobre</h2></div><div className='va'><h2>Via</h2></div><div className='sa'><h2> Saúde</h2></div>
            </div>
   
    <p class="descricao">
      Uma iniciativa para transformar o acesso à saúde pública no Brasil,
      tornando a informação mais clara e acessível para todos.
    </p>

    <div class="historia">
      <h3>Nossa História</h3>
      <h3>___________________________</h3>
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

