import { useEffect, useState } from 'react';
import api from '../../axios.js';
import { useNavigate } from 'react-router';
import './Cadastrao.scss';                           
import CabecalhoCadastro from '../../components/Cadastro/cabecalhoCadastro';

export default function Cadastro() {
    

   return (
    <>
    <section className='all'>
    <section className="Container">

        <CabecalhoCadastro />


            <div className="primeiroP">
                <p>Preencha os dados abaixo para completar seu atendimento na unidade de saúde</p>
            </div>

            <div className="informação-usuário">
               <div className="dados-usu">
               <p>Dados pessoais</p>
               </div>

                <div className="dados">
                    <label>  <p>Nome Completo*</p>
                        <input type="text" placeholder='Nome Completo' />
                    </label>

                    <div className="grupo1">
                        <label> <p>CPF*</p>
                            <input type="number" placeholder='000.000.000-00'/>
                            </label>
                            <label> <p>Data de Nascimeto*</p>
                                <input type="date"  />
                                </label>
                    </div>
                
                <label > <p>E-mail*</p>
                    <input type="text" placeholder='exemplo@gmail.com' />
                </label>

                <label> <p>Crie sua senha*</p>
                            <input type="text" placeholder='Digite sua senha' />
                            </label>
                </div>

                <div className="endereço">
                <div className="endereço-usu">
               <p>Endereço</p>
               </div>

                <label> <p>CEP*</p>
                    <input type="number" placeholder='00000-000' />
                </label>

                <div className="grupo2">
                        <label> <p>Rua/Avenida*</p>
                            <input type="text" placeholder='Rua Via Saúde/Avenida Via Saúde'/>
                            </label>
                            <label> <p>Número*</p>
                                <input type="number" placeholder='nº 1234' />
                                </label> 
                    </div>

                    <label> <p>Bairro*</p>
                        <input type="text" placeholder='Nome Bairro' />
                    </label>

                    
                            
                    
                </div>

                <div className="doisfinais">
                    <button type='button' id='batao'>Cadastra-se</button>
                    <p>* Campos obrigratórios</p>
                </div>
            </div>


    </section>
    </section>
    </>
   ) 
}