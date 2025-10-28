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
                <p>Preencha oooo os dados abaixo para agilizar seu atendimento na unidade de saúde</p>
            </div>

            <div className="informação-usuário">
               <div className="dados-usu">
               <p>Dados pessoais</p>
               </div>

                <div className="dados">
                    <label>  <p>Nome Completo*</p>
                        <input type="text" />
                    </label>

                    <div className="grupo1">
                        <label> <p>CPF*</p>
                            <input type="text" />
                            </label>
                            <label> <p>Data de Nascimeto*</p>
                                <input type="text" />
                                </label>
                    </div>
                
                <label > <p>Telefone*</p>
                    <input type="text" />
                </label>
                </div>

                <div className="endereço">
                <div className="endereço-usu">
               <p>Endereço</p>
               </div>

                <label> <p>CEP*</p>
                    <input type="text" />
                </label>

                <div className="grupo2">
                        <label> <p>Rua/Avenida*</p>
                            <input type="text" />
                            </label>
                            <label> <p>Número*</p>
                                <input type="text" />
                                </label>
                    </div>

                    <label> <p>Bairro*</p>
                        <input type="text" />
                    </label>

                    <div className="grupo3">
                        <label> <p>Cidade*</p>
                            <input type="text" />
                            </label>
                            <label> <p>Estado</p>
                                <input type="text" />
                                </label>
                    </div>
                </div>

                <div className="doisfinais">
                    <button type='button' >Cadarstra-se</button>
                    <p>* Campos obrigratórios</p>
                </div>
            </div>


    </section>
    </section>
    </>
   ) 
}