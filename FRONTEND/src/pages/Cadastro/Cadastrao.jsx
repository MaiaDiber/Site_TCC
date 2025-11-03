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
                <p>Preencha os dados abaixo para agilizar seu atendimento na unidade de saúde</p>
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
                            <input type="number" placeholder='CPF'/>
                            </label>
                            <label> <p>Data de Nascimeto*</p>
                                <input type="date" placeholder='DD/MM/AAAA' />
                                </label>
                    </div>
                
                <label > <p>Telefone*</p>
                    <input type="number" placeholder='(00) 00000-0000' />
                </label>

                <label> <p>Crie sua senha*</p>
                            <input type="password" placeholder='sua senha' />
                            </label>
                </div>

                <div className="endereço">
                <div className="endereço-usu">
               <p>Endereço</p>
               </div>

                <label> <p>CEP*</p>
                    <input type="text" placeholder='00000-000' />
                </label>

                <div className="grupo2">
                        <label> <p>Rua/Avenida*</p>
                            <input type="text" placeholder='rua etc etc etc...'/>
                            </label>
                            <label> <p>Número*</p>
                                <input type="number" placeholder='123..' />
                                </label>
                    </div>

                    <label> <p>Bairro*</p>
                        <input type="text" placeholder='Nome Bairro' />
                    </label>

                    
                        <label> <p>Distrito*</p>
                            <input type="text" placeholder='Nome Distrito' />
                            </label>

                            
                            
                    
                </div>

                <div className="doisfinais">
                    <button type='button' >Cadastrar-se</button>
                    <p>* Campos obrigratórios</p>
                </div>
            </div>


    </section>
    </section>
    </>
   ) 
}